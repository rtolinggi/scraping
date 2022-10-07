import pckg from "whatsapp-web.js";
import confins from "./scraping/confins.js";
import qrcode from "qrcode-terminal";
import exportExcel from "./excel/somasi.js";

const { Client, LocalAuth, MessageMedia } = pckg;

async function main() {
  // Inital Bot Scraping
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr);
  });

  client.on("ready", async () => {
    console.log("Whatsapp is ready!");
    try {
      await confins.init();
      await confins.loginConfins();
    } catch (error) {
      console.log("Gagal Memulai Bot");
    }
  });

  client.on("message", async () => {
    client.getChats().then(async (chats) => {
      const groupTesting = chats.find(
        (chat) => chat.name === "Tim 1-2 Cl. MANADO 2"
      );
      const arrayMsg = await groupTesting.fetchMessages({ limit: 5 });
      const lastMsg = arrayMsg.map((chat) => chat.body).pop();
      const agreement = lastMsg.split(" ");
      if (agreement[0] === "#agreement") {
        try {
          await confins.loginConfins();
          const dataAgreement = await confins.searchAgreement(agreement[1]);
          await confins.getImageAgreementCard(dataAgreement);
          const media = MessageMedia.fromFilePath("./agreement.png");
          groupTesting.sendMessage("data agreement", { media });
        } catch (error) {
          groupTesting.sendMessage("Gagal Ambil Data, Silahkan Coba Kembali");
        }
      }
      if (agreement[0] === "#contact") {
        try {
          await confins.loginConfins();
          const dataAgreement = await confins.searchAgreement(agreement[1]);
          await confins.getContactInfoCard(dataAgreement);
          const media = MessageMedia.fromFilePath("./contact.png");
          groupTesting.sendMessage("data contact", { media });
        } catch (error) {
          groupTesting.sendMessage("Gagal Ambil Data, silahkan coba kembali");
        }
      }
      if (agreement[0] === "#marketing") {
        try {
          await confins.loginConfins();
          const dataAgreement = await confins.searchAgreement(agreement[1]);
          const data = await confins.getMarketingInfo(dataAgreement);
          groupTesting.sendMessage(
            `nama marketing : ${data.marketing
              .split(" ")
              .join("")} \n nama Surveyor : ${data.surveyor
              .split(" ")
              .join("")}`
          );
        } catch (error) {
          groupTesting.sendMessage("Gagal Ambil Data, Silahkan Coba Kembali");
        }
      }
      if (agreement[0] === "#nopol") {
        try {
          await confins.loginConfins();
          await confins.searcNoPol(
            `${agreement[1]} ${agreement[2]} ${agreement[3]}`
          );
          const media = MessageMedia.fromFilePath("./nopol.png");
          groupTesting.sendMessage("data NoPol", { media });
        } catch (error) {
          groupTesting.sendMessage("Gagal Ambil Data, Silahkan Coba Kembali");
        }
      }
      if (agreement[0] === "#asset") {
        try {
          await confins.loginConfins();
          const dataAgreement = await confins.searchAgreement(agreement[1]);
          const dataAsset = await confins.getAssetInfo(dataAgreement);
          console.log(dataAsset);
          groupTesting.sendMessage(
            ` Nama BPKB   : ${dataAsset.assetName} \n
            Unit        : ${dataAsset.assetDescription} \n
            Alamat BPKB : ${dataAsset.assetAddress} \n
            No Polisi   : ${dataAsset.assetPlat} \n
            No Rangka   : ${dataAsset.assetRangka} \n
            No Mesin    : ${dataAsset.assetMesin} \n
            No BPKB     : ${dataAsset.assetBpkb} \n
            Tahun       : ${dataAsset.assetYear} \n
            Warna       : ${dataAsset.assetColor} \n
            No Faktur   : ${dataAsset.assetFaktur} \n
            Agreement   : ${dataAgreement.noAgreement} \n
            Nama Kontrak : ${dataAgreement.costumerName}
            `
          );
        } catch (error) {
          groupTesting.sendMessage("Gagal Ambil Data Silahkan Coba Kembali");
        }
      }
    });
  });

  client.initialize();
}

main();
