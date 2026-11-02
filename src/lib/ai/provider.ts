import type { Classification, FeedbackCategory, Sentiment } from "@/lib/domain/types";

/**
 * The AI boundary. Everything the workspace (and a future agent) asks of a
 * model goes through this interface, so the provider can be swapped and the
 * rest of the system never depends on a vendor SDK.
 *
 * No provider may publish, send, or change anything. They return structured
 * suggestions; humans decide.
 */

export interface ReviewContext {
  businessName: string;
  trade: string;
  stars: number;
  text: string;
  authorFirstName?: string;
}

export interface DraftContext extends ReviewContext {
  ownerFirstName: string;
  voiceGuide: string;
  approvedExamples: string[];
  classification: Classification | null;
}

export interface DraftSuggestion {
  text: string;
  tone: string;
}

export interface InsightInput {
  businessName: string;
  trade: string;
  reviews: { stars: number; text: string; date: string; categories?: FeedbackCategory[]; sentiment?: Sentiment }[];
}

export interface Insight {
  theme: string;
  kind: "recurring_complaint" | "service_failure" | "positive_driver" | "improvement" | "emerging_risk" | "trend";
  evidence: string[]; // quotes or references to the underlying reviews
  recommendation: string;
  confidence: "low" | "medium" | "high";
}

export interface AiStatus {
  available: boolean;
  provider: "anthropic" | "rules";
  models: { classify: string; draft: string; insight: string };
  reason?: string;
}

export interface AiProvider {
  name: "anthropic" | "rules";
  status(): AiStatus;
  classify(review: ReviewContext): Promise<Classification>;
  draft(ctx: DraftContext): Promise<DraftSuggestion[]>;
  insights(input: InsightInput): Promise<Insight[]>;
}

export interface UsageRecord {
  at: string;
  task: "classify" | "draft" | "insight";
  model: string;
  inputTokens: number;
  outputTokens: number;
  /** USD, computed from the published per-million prices at the time of the call. */
  estimatedCostUsd: number;
}
