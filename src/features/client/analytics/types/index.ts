export interface AnalyticsOverview {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  failedCalls: number;
  averageCallDurationSeconds: number | null;
  ticketsCreated: number;
  customerSatisfactionPercentage: number | null;
  resolutionRatePercentage: number | null;
  handoffRatePercentage: number | null;
  intentDetectionRatePercentage: number | null;
  averageIntentConfidence: number | null;
  sttErrors: number;
  llmErrors: number;
  ttsErrors: number;
}

export interface AnalyticsTrendPoint {
  [key: string]: string | number;
}

export interface AnalyticsCallsTrend {
  points: AnalyticsTrendPoint[];
}

export interface SentimentDistribution {
  period: string;
  positive: number;
  neutral: number;
  negative: number;
  mixed: number;
  unknown: number;
}

export interface AnalyticsSentiment {
  distribution: SentimentDistribution;
  trend: AnalyticsTrendPoint[];
}

export interface TopIntentItem {
  intent: string;
  count: number;
  percentage?: number;
}

export interface AnalyticsIntents {
  topIntents: TopIntentItem[];
}

export interface TopKeywordItem {
  keyword: string;
  count: number;
}

export interface AnalyticsKeywords {
  topKeywords: TopKeywordItem[];
}

export interface AnalyticsLatency {
  points: AnalyticsTrendPoint[];
}

export interface AnalyticsData {
  overview: AnalyticsOverview;
  callsTrend: AnalyticsCallsTrend;
  sentiment: AnalyticsSentiment;
  intents: AnalyticsIntents;
  keywords: AnalyticsKeywords;
  latency: AnalyticsLatency;
}
