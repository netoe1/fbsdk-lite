import * as bizSdk from "facebook-nodejs-business-sdk";

//#region DEC_INTERFACES_W_CLASS

interface ICampaignReturnData {
  businessId: string;
  adAccountId: string;
  objective: string;
  insights: {
    type: EInsightTypes;
    data: Record<string, any>;
  };
}

export interface IQueryCampaign {
  businessId: string;
  adAccountId: string;

  range: {
    since: string;
    until: string;
  };

  // Methods
  getAllCampaigns(): Promise<ICampaignReturnData[]>;
  getCampaignsByType(_type: ECampaignType): Promise<ICampaignReturnData[]>;
  getCampaignsByAllInsights(): Promise<ICampaignReturnData[]>;
  getCampaignsByInsightType(
    _insightType: EInsightTypes
  ): Promise<ICampaignReturnData[]>;

  connectUserToAPI(params: {
    businessId: string;
    adAccount: string;
    appToken: string;
  }): boolean;

  switchUser(_newId: string, _newAdAccount: string): Promise<IUserData>;
}

export interface IUserData {
  businessId: string;
  adAccount: string;
}

class QueryCampaign implements IQueryCampaign {
  public businessId: string;
  public adAccountId: string;

  public range: {
    since: string;
    until: string;
  };

  constructor(
    businessId: string,
    adAccountId: string,
    range: { since: string; until: string }
  ) {
    this.businessId = businessId;
    this.adAccountId = adAccountId;
    this.range = range;
  }

  public connectUserToAPI({
    businessId,
    adAccount,
    appToken,
  }: {
    businessId: string;
    adAccount: string;
    appToken: string;
  }): boolean {
    if (!businessId || !adAccount || !appToken) {
      throw new Error("[fbsdk-err]: Invalid parameters for connectUserToAPI()");
    }
    // Verify if credentials are right.
    const api = bizSdk.FacebookAdsApi.init(appToken);
    bizSdk.User = 
    return true;
  }

  public async switchUser(
    _newId: string,
    _newAdAccount: string
  ): Promise<IUserData> {
    this.businessId = _newId;
    this.adAccountId = _newAdAccount;

    return { businessId: this.businessId, adAccount: this.adAccountId };
  }

  public async getAllCampaigns(): Promise<ICampaignReturnData[]> {
    // Implementação futura
    return [];
  }

  public async getCampaignsByType(
    _type: ECampaignType
  ): Promise<ICampaignReturnData[]> {
    // Implementação futura
    return [];
  }

  public async getCampaignsByAllInsights(): Promise<ICampaignReturnData[]> {
    // Implementação futura
    return [];
  }

  public async getCampaignsByInsightType(
    _insightType: EInsightTypes
  ): Promise<ICampaignReturnData[]> {
    // Implementação futura
    return [];
  }
}

//#endregion DEC_INTERFACES_W_CLASS

//#region DEC_ENUMS
export enum ECampaignType {
  traffic = "traffic",
  engagement = "engagement",
  range = "range",
  sales = "sales",
  leads = "leads",
  app = "app",
}

// First, Insights, these are the Main.
export enum EInsightTypes {
  performance = "performance",
}

// These are a type of Insight
export enum EPerformanceMetrics {
  impressions = "impressions",
  clicks = "clicks",
  CTR = "CTR",
  CPC = "CPC",
  CPA = "CPA",
  ROAS = "ROAS",
  frequency = "frequency",
}

//#endregion DEC_ENUMS

// Setting Types for Campaign
