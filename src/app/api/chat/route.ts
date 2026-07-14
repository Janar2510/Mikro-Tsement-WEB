import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/ai-knowledge";
import { getClientKey, rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { validateChatMessages, ValidationError } from "@/lib/validation";

const CHAT_MODEL = "gemini-2.5-flash";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const rl = rateLimit(getClientKey(req, "chat"), 20, 5 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: rateLimitHeaders(rl) }
    );
  }

  try {
    const body = await req.json();
    const messages = validateChatMessages(body?.messages, {
      maxTurns: 30,
      maxContentLength: 4_000,
    });

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      console.error("API Key is missing from environment variables.");
      return NextResponse.json(
        { error: "AI service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    });

    // Format messages for OpenAI compatibility
    const formattedMessages: any[] = [
      { role: "system", content: buildSystemPrompt() },
      ...messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })),
    ];

    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: formattedMessages,
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
        ...rateLimitHeaders(rl),
      },
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("[/api/chat]", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal server error" }, { status: 500 });
  }
}
