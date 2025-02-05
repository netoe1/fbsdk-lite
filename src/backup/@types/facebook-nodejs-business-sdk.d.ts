declare module 'facebook-nodejs-business-sdk' {
    export class FacebookAdsApi {
        static init(accessToken: string): FacebookAdsApi;
    }

    export class AdAccount {
        constructor(accountId: string);
        getCampaigns(fields: string[]): Promise<any>;
    }

    export class Campaign {
        constructor(campaignId: string);
        read(fields: string[]): Promise<any>;
    }
}