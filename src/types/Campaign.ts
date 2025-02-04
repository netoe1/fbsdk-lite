export enum ECampaignType {
  traffic = "traffic",
  engajament = "engajament",
  range = "range",
  sales = "sales",
  leads = "leads",
  app = "app",
}

export interface ICampaign {
  id: string;
  name: string;
  objective: ECampaignType;
  status: string;
  range: {
    since: string;
    until: string;
  };
}
