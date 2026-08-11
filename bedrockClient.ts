// bedrockClient.ts — shared AWS Bedrock client for Sans Mercantile website backends.
//
// Replaces @google/genai. Uses the Bedrock Converse API (a single unified
// request/response shape across model providers) rather than per-provider
// InvokeModel body-building — confirmed working identically for all four
// models below via live smoke test 2026-08-10.
//
// Model selection: every model in this chain has an on-demand quota of
// 100+ requests/minute (checked via `aws service-quotas list-service-quotas
// --service-code bedrock`, 2026-08-10) -- comfortably above the "100+ per
// 5 minutes" floor. Kimi K2.5 is primary (strong general-purpose quality,
// already the established high-quota fallback across the Constellation's
// MPETI tooling); the rest are fallbacks in case Kimi itself is throttled
// or unavailable.
//
// Credentials: standard AWS SDK v3 credential chain (env vars
// AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY/AWS_SESSION_TOKEN, ~/.aws/credentials,
// or an IAM role when deployed). No API key needed in .env.

import {
  BedrockRuntimeClient,
  ConverseCommand,
  type Message,
} from "@aws-sdk/client-bedrock-runtime";

const REGION = process.env.AWS_REGION || "us-east-1";

const client = new BedrockRuntimeClient({ region: REGION });

export const MODEL_CHAIN = [
  "moonshotai.kimi-k2.5",
  "deepseek.v3.2",
  "qwen.qwen3-32b-v1:0",
  "amazon.nova-lite-v1:0",
] as const;

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
}

export interface GenerateOptions {
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  /** Prior turns for a multi-turn chat. Omit for single-shot prompts. */
  history?: ChatTurn[];
}

export interface GenerateResult {
  text: string;
  model: string;
}

function isRetryableError(err: any): boolean {
  const name = String(err?.name || err?.__type || "");
  const msg = String(err?.message || "");
  return (
    name.includes("ThrottlingException") ||
    name.includes("ServiceUnavailableException") ||
    name.includes("ModelTimeoutException") ||
    name.includes("ModelNotReadyException") ||
    msg.includes("Too many requests") ||
    msg.includes("Rate exceeded")
  );
}

/**
 * Single-shot or multi-turn text generation, walking MODEL_CHAIN on
 * throttle/service-unavailable errors. A non-retryable error (bad request,
 * validation) throws immediately rather than wasting the whole chain on a
 * failure that won't be fixed by switching models.
 */
export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<GenerateResult> {
  const { systemPrompt, maxTokens = 1024, temperature = 0.7, history = [] } = options;

  const messages: Message[] = history.map((turn) => ({
    role: turn.role === "user" ? "user" : "assistant",
    content: [{ text: turn.text }],
  }));
  messages.push({ role: "user", content: [{ text: prompt }] });

  let lastError: any = null;

  for (let i = 0; i < MODEL_CHAIN.length; i++) {
    const modelId = MODEL_CHAIN[i];
    try {
      const command = new ConverseCommand({
        modelId,
        messages,
        system: systemPrompt ? [{ text: systemPrompt }] : undefined,
        inferenceConfig: { maxTokens, temperature },
      });
      const response = await client.send(command);
      const text = response.output?.message?.content?.[0]?.text ?? "";
      return { text, model: modelId };
    } catch (err: any) {
      lastError = err;
      const isLast = i === MODEL_CHAIN.length - 1;
      if (!isRetryableError(err) || isLast) {
        throw err;
      }
      console.warn(
        `[bedrockClient] ${modelId} failed (${err?.name || err?.message}); trying next candidate`
      );
    }
  }
  throw lastError;
}
