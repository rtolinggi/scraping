import {Client} from "whatsapp-web.js";
import Confins from "./scraping/confins.js";
import qrcode from "qrcode-terminal";

function main() {

    const client = new Client();
    client.on("qr", qr => {
        qrcode.generate(qr, {small:true});
    })

    client.on("ready", () => {
        console.log("Whatsapp is ready!");
    })

    client.on("message", message => {
        const request = message.body.split(" ");
        if(request[0] === "#agreement") {
            Confins(request[1]).then((val) => {
                const result = JSON.stringify(val)
                client.sendMessage(message.from, result);
            })
        }
    })

    client.initialize();
}

main();