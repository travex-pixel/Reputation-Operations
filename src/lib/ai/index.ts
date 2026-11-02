import "server-only";
import type { AiProvider } from "./provider";
import { RulesProvider } from "./rules";
import { AnthropicProvider } from "./anthropic";

let cached: AiProvider | null = null;

/**
 * Resolve the provider from the environment. With ANTHROPIC_API_KEY set,
 * Claude is used; otherwise the deterministic rules provider runs and says so.
 */
export function getAiProvider(): AiProvider {
  if (cached) return cached;
  const key = process.env.ANTHROPIC_API_KEY;
  cached = key ? new AnthropicProvider(key) : new RulesProvider();
  return cached;
}
