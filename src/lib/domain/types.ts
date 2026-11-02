/**
 * Reputrail domain model.
 *
 * Deliberately separated from the UI and from any AI provider so that the
 * internal workspace today, and an agent later, use the same records.
 *
 * Verification discipline: every externally observed fact carries a
 * `Verification` state. Nothing in this model is allowed to look certain
 * when it was inferred or never checked.
 */

export type Verification = "observed" | "inferred" | "unverified";

export const PROSPECT_STAGES = [
  "Researching",
  "Qualified",
  "Audit prepared",
  "Contacted",
  "Meeting booked",
  "Pilot proposed",
  "Won",
  "Lost",
] as const;
export type ProspectStage = (typeof PROSPECT_STAGES)[number];

export const TRADES = [
  "HVAC",
  "Plumber",
  "Electrician",
  "Painter",
  "Roofer",
  "Renovator/Builder",
  "Landscaper",
  "Pest control",
  "Pool",
  "Garage doors",
  "Flooring",
  "Cleaning",
  "Property maintenance",
  "Other",
] as const;
export type Trade = (typeof TRADES)[number];

export type ResponseQuality =
  | "personalised"
  | "generic"
  | "defensive"
  | "helpful"
  | "absent"
  | "unknown";

export type ResearchStatus = "unverified" | "partial" | "verified";

export interface ActionLog {
  at: string; // ISO
  actor: "founder" | "system" | "ai" | "client";
  action: string;
  details?: string;
}

export interface Prospect {
  id: string;
  name: string;
  trade: Trade;
  suburb: string;
  serviceArea: string;
  website: string;
  contactMethod: string;
  sizeClues: string;
  /** Public rating and count as observed, with provenance. */
  googleRating: number | null;
  reviewCount: number | null;
  ratingSource: string;
  ratingSourceUrl: string;
  observedOn: string; // ISO date or ""
  oneStar: number | null;
  twoStar: number | null;
  threeStar: number | null;
  negativeLast12m: number | null;
  /** Number of individual review texts actually read. Honest zero is fine. */
  reviewsInspected: number;
  ownerResponsesLast20: number | null;
  ownerResponsePct: number | null;
  negativeResponsePct: number | null;
  responseQuality: ResponseQuality;
  responseTimeEstimate: string;
  recurringComplaints: string;
  positiveThemes: string;
  competitorComparison: string;
  cxWeaknesses: string;
  fitScore: number; // 0–100
  openingAngle: string;
  researchStatus: ResearchStatus;
  verificationNotes: string;
  sources: string;
  stage: ProspectStage;
  lastContacted: string | null; // ISO date
  nextAction: string;
  nextActionDue: string | null;
  notes: string;
  history: ActionLog[];
  createdAt: string;
  updatedAt: string;
}

export type Plan = "Pilot" | "Essential" | "Managed" | "Premium";

export interface Client {
  id: string;
  prospectId?: string;
  name: string;
  trade: Trade;
  ownerFirstName: string;
  plan: Plan;
  startedOn: string;
  /** How the owner talks to customers; feeds every draft. */
  voiceGuide: string;
  /** Standing approval for 5-star thank-yous only, recorded in the agreement. */
  standingApprovalFiveStar: boolean;
  competitors: string[];
  escalationContact: string;
  /** Hours the owner said they spent per month on reviews before Reputrail. */
  baselineOwnerHoursPerMonth: number | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type Platform = "Google" | "hipages" | "Facebook" | "ProductReview" | "Other";

export type Sentiment = "positive" | "neutral" | "negative";

export const FEEDBACK_CATEGORIES = [
  "Communication",
  "Workmanship",
  "Timeliness",
  "Pricing",
  "Professionalism",
  "Cleanliness",
  "Customer service",
  "Expectations management",
  "Follow-up",
  "Other",
] as const;
export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export type Urgency = "low" | "medium" | "high";
export type RiskLevel = "low" | "medium" | "high" | "sensitive";

export type RecommendedAction =
  | "thank"
  | "reply"
  | "reply_and_call"
  | "escalate_to_owner"
  | "check_records"
  | "prepare_policy_flag"
  | "no_action";

export interface Classification {
  sentiment: Sentiment;
  categories: FeedbackCategory[];
  issue: string;
  urgency: Urgency;
  risk: RiskLevel;
  /** True when the complaint touches safety, injury, defects, legal threats, money owed or discrimination. */
  sensitive: boolean;
  recommendedAction: RecommendedAction;
  rationale: string;
  source: "rules" | "ai" | "human";
  model?: string;
  classifiedAt: string;
  correctedBy?: "founder";
}

export type DraftStatus =
  | "draft"
  | "awaiting_approval"
  | "approved"
  | "amended"
  | "rejected"
  | "published";

export interface Draft {
  id: string;
  text: string;
  tone: string;
  source: "ai" | "human";
  model?: string;
  createdAt: string;
  status: DraftStatus;
  approvedBy?: string;
  approvedAt?: string;
  approvalChannel?: "sms" | "email" | "call" | "in_person" | "standing";
  amendedText?: string;
  publishedAt?: string;
  publishedText?: string;
  rejectionReason?: string;
}

export type ReviewStatus =
  | "new"
  | "classified"
  | "draft_ready"
  | "awaiting_approval"
  | "approved"
  | "published"
  | "escalated"
  | "resolved"
  | "no_action";

export interface ReviewRecord {
  id: string;
  clientId: string;
  platform: Platform;
  stars: number; // 1–5
  authorFirstName: string;
  text: string;
  reviewDate: string; // ISO date
  observedDate: string;
  sourceUrl?: string;
  classification: Classification | null;
  drafts: Draft[];
  status: ReviewStatus;
  /** Customer-recovery outcome, when the owner called. */
  recovery?: {
    contactedOn: string | null;
    outcome: "pending" | "resolved" | "declined" | "not_needed";
    agreed: string;
    followUpDue: string | null;
  };
  history: ActionLog[];
  createdAt: string;
  updatedAt: string;
}

export type TaskType =
  | "review"
  | "escalation"
  | "follow_up"
  | "approval"
  | "review_request"
  | "report"
  | "prospect"
  | "other";

export type TaskStatus = "open" | "in_progress" | "waiting" | "done";

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  clientId?: string;
  prospectId?: string;
  reviewId?: string;
  status: TaskStatus;
  dueDate: string | null;
  action: string;
  notes: string;
  history: ActionLog[];
  createdAt: string;
  completedAt: string | null;
}

/** Inputs the founder supplies for an audit; everything else is derived. */
export interface AuditInputs {
  businessName: string;
  trade: Trade;
  suburb: string;
  website: string;
  googleRating: number | null;
  reviewCount: number | null;
  reviewsInspected: number;
  lastReviewDaysAgo: number | null;
  ownerResponsePct: number | null;
  negativeResponsePct: number | null;
  negativeCount12m: number | null;
  recentObservations: string;
  negativeObservations: string;
  ownerResponseObservations: string;
  competitors: { name: string; rating: number | null; reviews: number | null; responsePct: number | null }[];
  competitorObservations: string;
  preparedBy: string;
  preparedOn: string;
}

export interface AuditAnalysis {
  snapshot: { label: string; value: string; note: string; verification: Verification }[];
  positiveThemes: string[];
  improvementOpportunities: string[];
  responseCoverage: string;
  negativeHandling: string;
  competitorComparison: string;
  recommendedActions: string[];
  pilotScope: string;
  /** Which lines came from supplied observations vs analysis. */
  provenance: { observed: string[]; analysis: string[] };
  narrativeSource: "rules" | "ai";
  model?: string;
}

export interface Audit {
  id: string;
  prospectId?: string;
  inputs: AuditInputs;
  analysis: AuditAnalysis;
  createdAt: string;
}

export interface ReportInputs {
  clientId: string;
  periodStart: string;
  periodEnd: string;
  reputation: {
    newReviews: number | null;
    averageRating: number | null;
    totalReviews: number | null;
    reviewsReplied: number | null;
    negativeReviews: number | null;
    negativeReplied: number | null;
    medianResponseHours: number | null;
    requestsSent: number | null;
  };
  recovery: {
    issuesIdentified: number | null;
    issuesEscalated: number | null;
    customersContacted: number | null;
    issuesResolved: number | null;
    recurringThemes: string;
    followUpsOutstanding: number | null;
  };
  business: {
    profileCalls: number | null;
    websiteClicks: number | null;
    qualifiedEnquiries: number | null;
    quoteRequests: number | null;
    jobsWon: number | null;
    attributableRevenue: number | null;
    grossProfit: number | null;
    /** Who supplied the business figures and how. */
    businessDataSource: string;
  };
  time: {
    baselineOwnerHours: number | null;
    hoursTransferred: number | null;
  };
  observations: string;
  recommendedActions: string;
  preparedBy: string;
}

export interface MonthlyReport {
  id: string;
  clientId: string;
  inputs: ReportInputs;
  previous: ReportInputs | null;
  createdAt: string;
}

export interface WorkspaceData {
  schemaVersion: number;
  prospects: Prospect[];
  clients: Client[];
  reviews: ReviewRecord[];
  tasks: Task[];
  audits: Audit[];
  reports: MonthlyReport[];
  settings: {
    founderName: string;
    seededAt: string | null;
    lastExportAt: string | null;
  };
}
