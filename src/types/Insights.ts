export enum EPerformanceOptions {
  impressions = "impressions",
  clicks = "clicks",
  CTR = "CTR",
  CPC = "CPC",
  CPA = "CPA",
  ROAS = "ROAS",
  frequency = "frequency",
}

export enum EInsightTypes {
  performance = "performance",
  engajament = "engajament",
}

export interface IInsight {
  insightType: EInsightTypes;
}
