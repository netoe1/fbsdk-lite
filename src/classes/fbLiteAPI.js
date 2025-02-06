const prefix = require("../modules/prefix");
const adsSDK = require("facebook-nodejs-business-sdk");
const AdAccount = adsSDK.AdAccount;
const Business = adsSDK.Business;
const FacebookAdsApi = adsSDK.FacebookAdsApi;

class FBLiteAPI {
  #accessToken;
  #adAccountId;
  #businessId;
  #inited;
  #businessManagerData;
  #adAccountData;
  #api;

  constructor() {
    this.#inited = true;
    this.#adAccountId = undefined;
    this.#businessId = undefined;
    this.#accessToken = undefined;
    this.#businessManagerData = undefined;
    this.#adAccountData = undefined;
    this.api = undefined;
  }

  async authDataAPI({ accessToken, adAccountId, businessId }) {
    if (!this.#inited) {
      throw new Error(
        `${prefix.getPrefixByState("err")} Please, create the object.`
      );
    }

    if (!accessToken || !adAccountId || !businessId) {
      throw new Error(
        `${prefix.getPrefixByState("err")} Invalid parameters in authDataAPI().`
      );
    }

    this.#accessToken = accessToken;
    this.#adAccountId = "act_" + adAccountId;
    this.#businessId = businessId;

    this.#api = FacebookAdsApi.init(this.#accessToken);
    this.#adAccountData = new AdAccount(this.#adAccountId);
    this.#businessManagerData = new Business(this.#businessId);

    if (!accessToken || !adAccountId || !businessId) {
      throw new Error(
        `${prefix.getPrefixByState(
          "err"
        )} Error while setting data to Marketing API.`
      );
    }

    console.log(`${prefix.getPrefixByState("success")} Successfull load.`);
  }

  async getCampaignWithInsights({ since, until, limit }) {
    try {
      const fields = [
        "id",
        "name",
        "status",
        "objective",
        "created_time",
        "updated_time",
      ];
      const params = { limit: limit };
      const campaigns = await this.#adAccountData.getCampaigns(fields, params);
      if (campaigns.length === 0) {
        console.log("Nenhuma campanha encontrada.");
        return;
      }

      console.log(`----------PERÍODO---------`);
      console.log(`Buscando insights de ${since} à ${until}!`);

      for (const campaign of campaigns) {
        console.log(
          `Campaign ID: ${campaign.id} - ${campaign.name} - ${campaign.objective}`
        );

        const insights = await campaign.getInsights(
          ["campaign_id", "impressions", "clicks", "spend", "ctr"],
          { time_range: { since, until } }
        );

        if (insights && insights.length > 0) {
          const insight = insights[0]._data;
          const impressions = insight.impressions
            ? parseInt(insight.impressions, 10)
            : "N/A";
          const clicks = insight.clicks ? parseInt(insight.clicks, 10) : "N/A";
          const spend = insight.spend
            ? parseFloat(insight.spend).toFixed(2)
            : "N/A";
          const ctr = insight.ctr
            ? parseFloat(insight.ctr).toFixed(2) + "%"
            : "N/A";

          console.log(`----------INSIGHTS---------`);
          console.log(`Impressions: ${impressions}`);
          console.log(`Clicks: ${clicks}`);
          console.log(`Cost: $ ${spend}`);
          console.log(`CTR: ${ctr}`);
          console.log(`----------FIM---------`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async #resetObjectBuffer() {
    this.#accessToken = undefined;
    this.#adAccountId = undefined;
    this.#businessId = undefined;
    this.#adAccountData = undefined;
    this.BM = undefined;
    this.api = undefined;
  }
}

const fbapi = new FBLiteAPI();
fbapi.authDataAPI({
  accessToken:
    "EAAJFpu1RqmMBOZCApg08Yu1oJHLYh4ulXrCJjFh43cYtgkEyaCPuVVQ1IN1rwOYH35JBnF8vl7T8xFrWvixTZBoKUTxkoacVuEboM11mdO2ZAV4EG36l8oAxaVZBr6RX3D8c6xQGRvJExCyty1qo936PToPgbEFMZBdLeocABuEXZCbUJDQfQ40Ic12lwpnNyy",
  adAccountId: "1081166167137515",
  businessId: "1594987141102876",
});
fbapi.getCampaignWithInsights("2024-09-01", "2025-01-01", 50);

module.exports = { FBLiteAPI };
