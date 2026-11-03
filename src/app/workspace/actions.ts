"use server";

import { getAiProvider } from "@/lib/ai";
import type { AiStatus, DraftContext, DraftSuggestion, Insight, InsightInput, ReviewContext } from "@/lib/ai/provider";
import type { Classification } from "@/lib/domain/types";
import { lookupPlace, placesConfigured } from "@/lib/places/lookup";
import type { PlacesLookup } from "@/lib/places/types";

/**
 * Server actions: the only path from the workspace UI to a model.
 * The API key stays on the server. Nothing here publishes or sends anything.
 */

export async function gateStatusAction(): Promise<{ gated: boolean }> {
  return { gated: Boolean(process.env.WORKSPACE_PASSCODE) };
}

export async function aiStatusAction(): Promise<AiStatus> {
  return getAiProvider().status();
}

export async function classifyReviewAction(review: ReviewContext): Promise<Classification> {
  if (!review.text?.trim()) throw new Error("Review text is required");
  return getAiProvider().classify({ ...review, text: review.text.slice(0, 4000) });
}

export async function draftResponsesAction(ctx: DraftContext): Promise<DraftSuggestion[]> {
  if (!ctx.text?.trim()) throw new Error("Review text is required");
  return getAiProvider().draft({
    ...ctx,
    text: ctx.text.slice(0, 4000),
    voiceGuide: ctx.voiceGuide.slice(0, 3000),
    approvedExamples: ctx.approvedExamples.slice(0, 5),
  });
}

export async function insightsAction(input: InsightInput): Promise<Insight[]> {
  if (!input.reviews.length) return [];
  return getAiProvider().insights({ ...input, reviews: input.reviews.slice(0, 80) });
}

/** Google Places lookup for one business. The key stays on the server. */
export async function placesStatusAction(): Promise<{ configured: boolean }> {
  return { configured: placesConfigured() };
}

export async function placesLookupAction(name: string, suburb: string): Promise<PlacesLookup> {
  return lookupPlace(name.slice(0, 160), suburb.slice(0, 80));
}
