import pptr from "puppeteer";

const URI_CONFINS = "http://192.168.0.117/confinsfmf/am_login.aspx";
// const USER = "83195SPV";
// const PASSWORD = "manado01";
const USER = "83195SPV";
const PASSWORD = "manado22";
const URI_NOPOL_SEARCH =
  "http://192.168.0.117/confinsfmf/Collection/Inquiry/SmartSearchAsset.aspx?Category=Asset";
const URI_SMART_SEARCH =
  "http://192.168.0.117/confinsfmf/Collection/Inquiry/SmartSearchAgr.aspx";
const URI_PERSONALINFO =
  "http://192.168.0.117/confinsfmf/AccAcq/Credit/ViewPersonalCustomer.aspx?Style=Collection&CustomerId=";
const URI_ASSETS =
  "http://192.168.0.117/confinsfmf/AccAcq/Credit/viewAsset.aspx?";
const URI_MAIL_HISTORY =
  "http://192.168.0.117/confinsfmf/AccAcq/Credit/viewMailHistory.aspx?";
const URI_AGREEMENT_CARD =
  "http://192.168.0.117/confinsfmf/AccAcq/Credit/viewAmortization.aspx?";
const URI_GOLIVE =
  "http://192.168.0.117/confinsfmf/AccAcq/Credit/ViewStatementOfAccount.aspx?Style=Collection&ApplicationId=";
const URI_ASSETS_DETAIL =
  "http://192.168.0.117/confinsfmf/AccAcq/Credit/viewAsset.aspx?ApplicationID=611A202207209014&BranchID=611&CustomerName=POULIN%20PANGEMANAN&Style=Collection&AgreementNo=06111022010163&CustomerID=61100102341&CurrencyID=IDR&AssetSeqNo=1";
const bot = {
  browser: null,
  page: null,
  init: async () => {
    bot.browser = await pptr.launch({ headless: true });
    bot.page = await bot.browser.newPage();
    bot.page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    );
  },
  close: async () => {
    bot.browser.close();
  },
  loginConfins: async () => {
    try {
      await bot.page.goto(URI_CONFINS, { waitUntil: "networkidle2" });
      await bot.page.waitForSelector("#txtUsrNm");
      await bot.page.type("#txtUsrNm", USER);
      await bot.page.waitForSelector("#txtPwd");
      await bot.page.type("#txtPwd", PASSWORD);
      await bot.page.waitForSelector("#btnLogin1");
      await bot.page.click("#btnLogin1");
    } catch (error) {
      console.log("Gagal Login : ", error);
    }
  },
  searcNoPol: async (nopol) => {
    try {
      await bot.page.goto(URI_NOPOL_SEARCH);
      await bot.page.waitForSelector("#oSearchBy_cmbSearchList");
      await bot.page.select("#oSearchBy_cmbSearchList", "LicensePlate");
      await bot.page.waitForSelector("#oSearchBy_txtSearch");
      await bot.page.type("#oSearchBy_txtSearch", nopol);
      await bot.page.keyboard.press("Enter");
      await bot.page.waitForSelector("#pnlDatagrid");
      await bot.page.screenshot({ path: "nopol.png" });
    } catch (error) {
      console.log("Gagal Cari No Plat : ", error);
    }
  },
  searchAgreement: async (agreement) => {
    await bot.page.goto(URI_SMART_SEARCH);
    try {
      await bot.page.waitForSelector("#oSearchBy_cmbSearchList");
      await bot.page.select("#oSearchBy_cmbSearchList", "Agreementno");
      await bot.page.waitForSelector("#oSearchBy_txtSearch");
      await bot.page.type("#oSearchBy_txtSearch", agreement);
      await bot.page.keyboard.press("Enter");
      await bot.page.waitForSelector("#DtgAgree_hyAgreementNo_0");
      let dataAgreement = await bot.page.$eval(
        "#DtgAgree_hyAgreementNo_0",
        (value) => value.textContent
      );
      await bot.page.waitForSelector("#DtgAgree_hyCustomerName_0");
      let dataName = await bot.page.$eval(
        "#DtgAgree_hyCustomerName_0",
        (value) => value.textContent
      );
      let dataId = await bot.page.$eval("#DtgAgree_hyCustomerName_0", (value) =>
        value.getAttribute("href")
      );
      await bot.page.waitForSelector("#DtgAgree_hyApplicationId_0");
      let applicationId = await bot.page.$eval(
        "#DtgAgree_hyApplicationId_0",
        (value) => value.textContent
      );
      const data = {
        noAgreement: dataAgreement,
        costumerName: dataName,
        costumerId: dataId.split("'")[3],
        applicationId,
      };
      return data;
    } catch (error) {
      console.log("Gagal Cari Agreement : ", error);
    }
  },
  getPersonalInfo: async (costumerId) => {
    try {
      await bot.page.goto(`${URI_PERSONALINFO}${costumerId}`);
      await bot.page.waitForSelector("#lblName");
      let fullName = await bot.page.$eval("#lblName", (val) => val.textContent);
      await bot.page.waitForSelector("#lblBirthPlaceDate");
      let birthDay = await bot.page.$eval(
        "#lblBirthPlaceDate",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblEmail");
      let email = await bot.page.$eval("#lblEmail", (val) => val.textContent);
      let dataInfo = {
        fullName,
        birthDay,
        email,
      };
      return dataInfo;
    } catch (error) {
      console.log("Gagal get data Personal : ", error);
    }
  },
  getAssetInfo: async (data) => {
    try {
      await bot.page.goto(
        `${URI_ASSETS}ApplicationID=${
          data.applicationId
        }&BranchID=611&CustomerName=${data.costumerName.replace(
          / /g,
          "%20"
        )}&Style=Collection&AgreementNo=${data.noAgreement}&CustomerID=${
          data.costumerId
        }&CurrencyID=IDR&AssetSeqNo=1`
      );
      await bot.page.waitForSelector("#lblRegName1");
      let assetName = await bot.page.$eval(
        "#lblRegName1",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblAssetDesc");
      let assetDescription = await bot.page.$eval(
        "#lblAssetDesc",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblRegAddress1");
      let assetAddress = await bot.page.$eval(
        "#lblRegAddress1",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblSerial1");
      let assetRangka = await bot.page.$eval(
        "#lblSerial1",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblSerial2");
      let assetMesin = await bot.page.$eval(
        "#lblSerial2",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblYear");
      let assetYear = await bot.page.$eval(
        "#lblYear",
        (val) => val.textContent
      );
      await bot.page.waitForSelector(
        "#DTGAttributeAsset > tbody > tr:nth-child(1) > td.tdGanjil"
      );
      let assetCc = await bot.page.$eval(
        "#DTGAttributeAsset > tbody > tr:nth-child(1) > td.tdGanjil",
        (val) => val.textContent
      );
      await bot.page.waitForSelector(
        "#DTGAttributeAsset > tbody > tr:nth-child(2) > td.tdGanjil"
      );
      let assetColor = await bot.page.$eval(
        "#DTGAttributeAsset > tbody > tr:nth-child(2) > td.tdGanjil",
        (val) => val.textContent
      );
      await bot.page.waitForSelector(
        "#DTGAttributeAsset > tbody > tr:nth-child(3) > td.tdGanjil"
      );
      let assetPlat = await bot.page.$eval(
        "#DTGAttributeAsset > tbody > tr:nth-child(3) > td.tdGanjil",
        (val) => val.textContent
      );
      await bot.page.waitForSelector(
        "#dtgAssetDoc > tbody > tr:nth-child(2) > td:nth-child(3)"
      );
      let assetBpkb = await bot.page.$eval(
        "#dtgAssetDoc > tbody > tr:nth-child(2) > td:nth-child(3)",
        (val) => val.textContent
      );
      await bot.page.waitForSelector(
        "#dtgAssetDoc > tbody > tr:nth-child(3) > td:nth-child(3)"
      );
      let assetFaktur = await bot.page.$eval(
        "#dtgAssetDoc > tbody > tr:nth-child(3) > td:nth-child(3)",
        (val) => val.textContent
      );
      const dataAsset = {
        assetName,
        assetDescription,
        assetAddress,
        assetRangka,
        assetMesin,
        assetYear,
        assetCc,
        assetColor,
        assetPlat,
        assetBpkb,
        assetFaktur,
      };
      return dataAsset;
    } catch (error) {
      console.log("Gagal Get Asset Info : ", error);
    }
  },
  getMailHistory: async (data) => {
    try {
      await bot.page.goto(
        `${URI_MAIL_HISTORY}ApplicationID=${data.applicationId}&&AgreementNo=${
          data.noAgreement
        }&CustomerName=${data.costumerName.replace(
          / /g,
          "%20"
        )}&Style=Collection&CustomerID=${data.costumerId}`
      );
    } catch (error) {
      console.log("Gagal Get Email : ", error);
    }
  },
  getAgreementCard: async (data) => {
    try {
      await bot.page.goto(
        `${URI_AGREEMENT_CARD}ApplicationID=${
          data.applicationId
        }&CustomerName=${data.costumerName.replace(/ /g, "%20")}&AgreementNo=${
          data.noAgreement
        }&Style=Collection&CustomerID=${data.costumerId}&CurrencyID=IDR`
      );

      await bot.page.waitForSelector("#lblOSPrincipal");
      let agreementOsPrincipal = await bot.page.$eval(
        "#lblOSPrincipal",
        (val) => val.textContent
      );
      await bot.page.waitForSelector("#lblLCInstallment");
      let agreementDenda = await bot.page.$eval(
        "#lblLCInstallment",
        (val) => val.textContent
      );

      await bot.page.goto(`${URI_GOLIVE}${data.applicationId}`);
      await bot.page.waitForSelector(
        "#Form1 > table.tablegrid > tbody > tr:nth-child(18) > td:nth-child(2)"
      );
      let agreementGolive = await bot.page.$eval(
        "#Form1 > table.tablegrid > tbody > tr:nth-child(18) > td:nth-child(2)",
        (val) => val.textContent
      );
      let dataAgreement = {
        agreementOsPrincipal,
        agreementDenda,
        agreementGolive,
      };
      return dataAgreement;
    } catch (error) {
      console.log("Gagal Get Agreement Card : ", error);
    }
  },
  getImageAgreementCard: async (data) => {
    try {
      await bot.page.goto(
        `${URI_AGREEMENT_CARD}ApplicationID=${
          data.applicationId
        }&CustomerName=${data.costumerName.replace(/ /g, "%20")}&AgreementNo=${
          data.noAgreement
        }&Style=Collection&CustomerID=${data.costumerId}&CurrencyID=IDR`
      );

      await bot.page.screenshot({ path: "agreement.png" });
    } catch (error) {
      console.log("Gagal Get Image Catd Agreement : ", error);
    }
  },
  getContactInfoCard: async (data) => {
    try {
      await bot.page.goto(`${URI_PERSONALINFO}${data.costumerId}`);
      await bot.page.screenshot({ path: "contact.png" });
    } catch (error) {
      console.log("Gagal Get Contact : ", error);
    }
  },
  getMarketingInfo: async (data) => {
    try {
      await bot.page.goto(`${URI_GOLIVE}${data.applicationId}`);
      await bot.page.waitForSelector(
        "#Form1 > table.tablegrid > tbody > tr:nth-child(16) > td:nth-child(4)"
      );
      let namaMarketing = await bot.page.$eval(
        "#Form1 > table.tablegrid > tbody > tr:nth-child(16) > td:nth-child(4)",
        (val) => val.textContent
      );
      let namaSurveyor = await bot.page.$eval(
        "#Form1 > table.tablegrid > tbody > tr:nth-child(18) > td:nth-child(4)",
        (val) => val.textContent
      );
      let dataMarketing = {
        marketing: namaMarketing,
        surveyor: namaSurveyor,
      };
      console.log(dataMarketing);
      return dataMarketing;
    } catch (error) {
      console.log("Gagal get Marketing info : ", error);
    }
  },
};

export default bot;
