const bizSdk = require("facebook-nodejs-business-sdk");
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const accessToken =
  "EAAJFpu1RqmMBO2xurLvZBZARgOqOx5OQpPJZBUZC1pheILLUZCdToFGYm015Hx43QZBfIvv0VTQu3oaYVqt7JA1IZBZBU77qZAeXuq9sTD2gAJ3bKCwaPlD1PeZAp4DlgpDMU3tr7ypQHR0AWIbZCvGh0y1Tlda9AkEb8yk1iReM9j0I1Ve2r0dZApfc7CnytqzWBZCmz";
const accountId = "act_1054980051803328";
const api = bizSdk.FacebookAdsApi.init(accessToken);

function getLastMonthRange() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const firstDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth(),
    1
  );
  const lastDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth() + 1,
    0
  );

  return {
    since: firstDayOfLastMonth.toISOString().split("T")[0], // Data formatada (YYYY-MM-DD)
    until: lastDayOfLastMonth.toISOString().split("T")[0], // Data formatada (YYYY-MM-DD)
  };
}

async function getCampaignInsights() {
  try {
    const account = new AdAccount(accountId);
    const fields = [
      "id",
      "name",
      "status",
      "objective",
      "created_time",
      "updated_time",
    ];
    const params = { limit: 50 };

    const campaigns = await account.getCampaigns(fields, params);

    // Obter o intervalo do mês passado
    const { since, until } = getLastMonthRange();
    console.log(`Buscando insights de ${since} a ${until}`);

    // Itera sobre as campanhas e obtém os insights
    for (const campaign of campaigns) {
      console.log(`Campaign ID: ${campaign.id} - ${campaign.name}`);

      // Obter insights da campanha
      const insights = await campaign.getInsights(
        ["campaign_id", "impressions", "clicks", "spend", "ctr"], // Campos dos insights
        { time_range: { since, until } } // Intervalo de tempo do mês passado
      );

      // console.log(insights);
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
          ? (parseFloat(insight.ctr) * 100).toFixed(2) + "%"
          : "N/A"; // Formatando CTR como percentual

        // Exibindo as informações
        console.log(`Impressões: ${impressions}`);
        console.log(`Cliques: ${clicks}`);
        console.log(`Gasto: R$ ${spend}`);
        console.log(`CTR: ${ctr}`);
        console.log("---");
      } else {
        console.log(
          "Erro: Dados de insights não encontrados ou formato inválido."
        );
        console.log(insights); // Imprime a resposta completa da API para análise
      }
    }
  } catch (error) {
    console.error("Erro ao buscar insights:", error);
  }
}

getCampaignInsights();
