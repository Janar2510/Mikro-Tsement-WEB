/**
 * Lightweight input validators (no Zod dep).
 * Throws ValidationError on failure; caller maps to HTTP 400.
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function requireString(
  v: unknown,
  field: string,
  opts: { min?: number; max?: number } = {}
): string {
  if (typeof v !== "string") throw new ValidationError(`${field} must be a string`);
  const s = v.trim();
  const min = opts.min ?? 1;
  const max = opts.max ?? 10_000;
  if (s.length < min) throw new ValidationError(`${field} too short`);
  if (s.length > max) throw new ValidationError(`${field} too long`);
  return s;
}

export function optionalString(
  v: unknown,
  field: string,
  opts: { max?: number } = {}
): string | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  return requireString(v, field, { min: 0, max: opts.max });
}

export function requireEmail(v: unknown, field = "email"): string {
  const s = requireString(v, field, { max: 254 });
  if (!EMAIL_RE.test(s)) throw new ValidationError(`${field} is not a valid email`);
  return s;
}

export interface ChatMessage {
  role: "user" | "assistant" | "model";
  content: string;
}

export function validateChatMessages(v: unknown, opts: {
  maxTurns?: number;
  maxContentLength?: number;
} = {}): ChatMessage[] {
  const maxTurns = opts.maxTurns ?? 30;
  const maxContent = opts.maxContentLength ?? 4_000;

  if (!Array.isArray(v)) throw new ValidationError("messages must be an array");
  if (v.length === 0) throw new ValidationError("messages cannot be empty");
  if (v.length > maxTurns) throw new ValidationError(`too many turns (max ${maxTurns})`);

  const out: ChatMessage[] = [];
  for (let i = 0; i < v.length; i++) {
    const m = v[i];
    if (!m || typeof m !== "object") throw new ValidationError(`messages[${i}] invalid`);
    const role = (m as Record<string, unknown>).role;
    const content = (m as Record<string, unknown>).content;
    if (role !== "user" && role !== "assistant" && role !== "model") {
      throw new ValidationError(`messages[${i}].role invalid`);
    }
    if (typeof content !== "string") {
      throw new ValidationError(`messages[${i}].content must be a string`);
    }
    if (content.length === 0 || content.length > maxContent) {
      throw new ValidationError(`messages[${i}].content length out of range`);
    }
    out.push({ role: role as ChatMessage["role"], content });
  }
  return out;
}
