import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { getClientKey, rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Rate limit: 5 SAM-2 segmentations per IP per 1 minute (cost-sensitive).
  const rl = rateLimit(getClientKey(req, "segment-wall"), 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429, headers: rateLimitHeaders(rl) }
    );
  }

  try {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is not configured on the server." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const xStr = formData.get("x") as string | null;
    const yStr = formData.get("y") as string | null;
    const widthStr = formData.get("width") as string | null;
    const heightStr = formData.get("height") as string | null;

    if (!image || !xStr || !yStr) {
      return NextResponse.json(
        { error: "Missing image, x, or y in the request body." },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Must be an image." },
        { status: 400 }
      );
    }

    if (image.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image file size exceeds 8MB limit." },
        { status: 400 }
      );
    }

    const nx = parseFloat(xStr);
    const ny = parseFloat(yStr);

    let px = nx;
    let py = ny;

    // Convert to absolute coordinates if width and height are provided
    if (widthStr && heightStr) {
      const w = parseInt(widthStr, 10);
      const h = parseInt(heightStr, 10);
      px = Math.round(nx * w);
      py = Math.round(ny * h);
    }

    const replicate = new Replicate({
      auth: token,
    });

    console.log(`SAM-2: Processing image of type ${image.type}, size ${image.size} bytes`);

    // Replicate expects the image to be converted to a buffer/stream
    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${image.type};base64,${base64Image}`;

    // Try to run SAM-2.
    // Some versions of SAM-2 on Replicate expect point_coords as a string like "[x, y]" 
    // or a JSON-encoded list of lists.
    const output = await replicate.run(
      "meta/sam-2:fe97b453a6455861e3bac769b441ca1f1086110da7466dbb65cf1eecfd60dc83",
      {
        input: {
          image: dataUri,
          point_coords: `[[${px}, ${py}]]`, // Standard SAM format is often list of lists
          point_labels: "[1]",             // Positive label for the point
        },
      }
    );

    // Output is typically an array of URLs or a single URL to the mask image
    // Sometimes it's a URL directly.
    let maskUrl: string;
    if (typeof output === "object" && output !== null) {
      const res = output as any;
      // The SAM-2 model returns { combined_mask: FileOutput, individual_masks: FileOutput[] }
      const maskObj = res.combined_mask || (Array.isArray(res) ? res[0] : res.mask);
      
      if (!maskObj) {
        throw new Error("Could not find mask in Replicate output. Keys: " + Object.keys(res).join(", "));
      }
      
      // Replicate SDK returns FileOutput which has a .url() method or can be coerced to a string
      maskUrl = typeof maskObj.url === "function" ? maskObj.url().href || maskObj.url() : String(maskObj);
    } else if (typeof output === "string") {
      maskUrl = output;
    } else {
      console.log("SAM-2 Unexpected Output:", output);
      throw new Error("Unexpected output format from Replicate: " + typeof output);
    }

    // Fetch the mask PNG from Replicate's storage
    const maskResponse = await fetch(maskUrl);
    if (!maskResponse.ok) {
      throw new Error("Failed to download the generated mask.");
    }

    const maskBuffer = await maskResponse.arrayBuffer();

    return new NextResponse(maskBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=300, immutable",
        ...rateLimitHeaders(rl),
      },
    });
  } catch (error: unknown) {
    console.error("SAM-2 Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
    return NextResponse.json(
      { error: "Upstream AI failure: " + errorMessage },
      { status: 502 }
    );
  }
}
