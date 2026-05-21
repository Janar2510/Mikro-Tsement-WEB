import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/ai-knowledge";
import { getClientKey, rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { validateChatMessages, ValidationError } from "@/lib/validation";

// Best free NVIDIA model for chat — change to any model from build.nvidia.com
const CHAT_MODEL = "meta/llama-3.1-70b-instruct";

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

    // OpenAI-format messages with system prompt
    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: buildSystemPrompt() },
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const apiKey = process.env.NVIDIA_API_KEY ?? process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API Key is missing from environment variables.");
      return NextResponse.json(
        { error: "AI service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const stream = await client.chat.completions.create({
      model: CHAT_MODEL,
      messages: openaiMessages,
      stream: true,
      max_tokens: 1024,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
