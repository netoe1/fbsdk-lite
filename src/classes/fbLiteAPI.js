const bizSdk = require("facebook-nodejs-business-sdk");

class fbLiteAPI {
  #accessToken;
  #adAccountId;
  #businessId;

  constructor(_accessToken, _adAccountId, _businessId) {
    if (!_accessToken) {
      throw new Error("[fb-err]: Invalid token.");
    }

    if (!_adAccountId) {
      throw new Error("[fb-err]: Invalid ad account.");
    }

    if (!_businessId) {
      throw new Error("[fb-err]: Invalid business id");
    }

    this.#accessToken = _accessToken;
    this.#adAccountId = _adAccountId;
    this.#businessId = _businessId;
  }

  // Função para conectar ao API
  async connectUserToApi() {
    if (!this.#accessToken || !this.#adAccountId || !this.#businessId) {
      throw new Error("[fbsdk-err]: Invalid parameters.");
    }

    bizSdk.FacebookAdsApi.init(this.#accessToken);
    const bm = new bizSdk.Business(this.#businessId); // Aqui, usamos o businessId
    const ac = new bizSdk.AdAccount(this.#adAccountId); // Aqui, usamos o adAccountId
    console.log("Conectado ao Business Manager e conta de anúncios");
  }

  // Função para obter insights das campanhas
  async getCampaignInsights(since, until, limit) {
    try {
      const account = new bizSdk.AdAccount(this.#adAccountId);
      const fields = [
        "id",
        "name",
        "status",
        "objective",
        "created_time",
        "updated_time",
      ];
      const params = { limit: limit };

      const campaigns = await account.getCampaigns(fields, params);

      if (campaigns.length === 0) {
        console.log("Nenhuma campanha encontrada.");
        return;
      }
      console.log(`----------PERÍODO---------`);
      console.log(`Buscando insights de ${since} a ${until}`);

      // Itera sobre as campanhas e obtém os insights
      for (const campaign of campaigns) {
        console.log(`Campaign ID: ${campaign.id} - ${campaign.name}`);

        // Obter insights da campanha
        const insights = await campaign.getInsights(
          ["campaign_id", "impressions", "clicks", "spend", "ctr"], // Campos dos insights
          { time_range: { since, until } } // Intervalo de tempo
        );

        // Verifica se o objeto de insights existe e contém dados
        if (insights && insights.length > 0) {
          const insight = insights[0]._data; // Acessa os dados da primeira campanha
          // Convertendo valores para os tipos corretos
          const impressions = insight.impressions
            ? parseInt(insight.impressions, 10)
            : "N/A";
          const clicks = insight.clicks ? parseInt(insight.clicks, 10) : "N/A";
          const spend = insight.spend
            ? parseFloat(insight.spend).toFixed(2)
            : "N/A"; // Formatando o gasto com 2 casas decimais
          const ctr = insight.ctr
            ? (parseFloat(insight.ctr) * 100).toFixed(2) + "%" // Formatando CTR como percentual
            : "N/A";

          // Exibindo as informações
          console.log(`----------DADOS---------`);
          console.log(`Impressões: ${impressions}`);
          console.log(`Cliques: ${clicks}`);
          console.log(`Gasto: R$ ${spend}`);
          console.log(`CTR: ${ctr}`);
          console.log(`----------FIM---------`);
        } else {
          console.log(
            "Erro: Dados de insights não encontrados ou formato inválido."
          );
          //console.log(insights); // Imprime a resposta completa da API para análise
        }
      }
    } catch (error) {
      console.error("Erro ao buscar insights:", error);
    }
  }
}

// Instanciação da classe FBsdkAPI com os parâmetros corretos
const fb = new fbLiteAPI(
  "EAAJFpu1RqmMBOZBUISTzDgcvO70m8qqIWILlXFoaCllM9JAcYZCEVuiOkCxSHMd2wIAd9PT62ZCwCSbbL3x4T56YhmmbXOJZCVN9o4iqInMiZAHYsA7f6mZBWlUFCmdJNRvVqGQK0zg3gOw654hhQSS1Yu0qzTBtxHI9s1DqcEUt84EjhePaBIoZCD6BsDM3jwL",
  "act_478779427593587",
  "1054980051803328"
);

// Conectar ao Facebook Ads API
fb.connectUserToApi();

// Obter os insights das campanhas
fb.getCampaignInsights("2025-01-01", "2025-02-01", 10);
