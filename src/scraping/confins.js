import puppeteer from "puppeteer";



/*
http://192.168.0.117/confinsfmf/AccAcq/Credit/viewAmortization.aspx?ApplicationID=611A202205205818&CustomerName=RUSDI%20DUKALANG&AgreementNo=06111022007270&Style=Collection&CustomerID=61100105517&CurrencyID=IDR
*/

const Confins = async (agreement) => {
    const URI_CONFINS = "http://192.168.0.117/confinsfmf/am_login.aspx";
    const USER = "83195SPV";
    const  PASSWORD = "manado01";
    const SMART_SEARCH = "http://192.168.0.117/confinsfmf/Collection/Inquiry/SmartSearchAgr.aspx";

    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(URI_CONFINS);
    await page.type("#txtUsrNm",USER,{delay:100});
    await page.type("#txtPwd",PASSWORD,{delay:100});
    await page.click("#btnLogin1");
    await page.goto(SMART_SEARCH);

    try { 
        await page.waitForSelector("#oSearchBy_cmbSearchList");
        await page.select("#oSearchBy_cmbSearchList","Agreementno");
        await page.type("#oSearchBy_txtSearch",agreement,{delay:100});
        await page.keyboard.press("Enter");
        await page.waitForSelector("#DtgAgree_hyAgreementNo_0");
        let dataAgreement = await page.$eval("#DtgAgree_hyAgreementNo_0", value => value.textContent);
        let dataName = await page.$eval("#DtgAgree_hyCustomerName_0", value => value.textContent);
        const data = {
            noAgreement: dataAgreement,
            costumerName: dataName
        }
        return data;
    } catch (error) {
        console.log(error)
        return JSON.stringify(error)
    }
}

export default Confins;