import pckg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import confins from "./src/scraping/confins.js";

const { Client, LocalAuth } = pckg;

await confins.init();
await confins.loginConfins();
const data = await confins.searchAgreement("06111011001054");
await confins.getImageAgreementCard(data);
console.log(data);

// // const client = new Client({
// //   authStrategy: new LocalAuth(),
// // });

// // client.on("qr", (qr) => {
// //   console.log("QR RECEIVED", qr);
// //   qrcode.generate(qr);
// // });

// // client.on("ready", () => {
// //   console.log("Client is ready!");
// // });

// // client.on("message", (msg) => {
// //   if (msg.body === "ping") {
// //     msg.reply("pong");
// //   }
// // });

// // client.initialize();
