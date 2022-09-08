import { Client } from "whatsapp-web.js";
import confins from "./scraping/confins.js";
import qrcode from "qrcode-terminal";
import exportExcel from "./excel/somasi.js";

async function main() {
  // Inital Bot Scraping
  await confins.init();
  await confins.loginConfins();

  const client = new Client();
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("Whatsapp is ready!");
  });

  client.on("message", async (message) => {
    const request = message.body.split(" ");
    if (request[0] === "#agreement") {
      const data = await confins.searchAgreement(request[1]);
      const dataAgreement = await confins.getAgreementCard(data);
      const dataPersonal = await confins.getPersonalInfo(data.costumerId);
      const dataAsset = await confins.getAssetInfo(data);
      const dataSomasi = {
        agreementNumber: data.noAgreement,
        ...dataAgreement,
        ...dataPersonal,
        ...dataAsset,
      };
      await exportExcel(dataSomasi);
      const result = JSON.stringify(dataSomasi);
      client.sendMessage(message.from, result);
    }
  });

  client.initialize();
}

main();
