import writeXlsxFile from "write-excel-file/node";

const filePath = "./src/excel/data/somasi.xlsx";

const columns = [{ width: 20 }, { width: 2 }, { width: 60 }];

const header = [
  {
    value: "PERSONAL CUSTOMER DETAIL INFORMATION",
    span: 3,
    align: "center",
    fontWeight: "bold",
  },
];

const exportExcel = async (obj) => {
  const rowNameCostumer = [
    {
      type: String,
      value: "Nama Customer",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.fullName,
    },
  ];

  const rowGoLive = [
    {
      type: String,
      value: "GO LIVE",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.agreementGolive,
    },
  ];

  const rowAgreementNumber = [
    {
      type: String,
      value: "Agreement Number",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.agreementNumber,
    },
  ];

  const rowBirthPlaceDate = [
    {
      type: String,
      value: "Birth Place/Date",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.birthDay,
    },
  ];

  const rowMaillingAddress = [
    {
      type: String,
      value: "Mailling Address",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.email,
    },
  ];

  const rowOsPrincipal = [
    {
      type: String,
      value: "OS Principal",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.agreementOsPrincipal,
    },
  ];

  const rowOsDenda = [
    {
      type: String,
      value: "OS Denda",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.agreementDenda,
    },
  ];

  const headerAssetView = [
    {
      value: "ASSET VIEW",
      span: 3,
      align: "center",
      fontWeight: "bold",
    },
  ];

  const rowName = [
    {
      type: String,
      value: "Name",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetName,
    },
  ];

  const rowAddress = [
    {
      type: String,
      value: "Address",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetAddress,
    },
  ];

  const rowNoRangka = [
    {
      type: String,
      value: "No. Rangka",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetRangka,
    },
  ];

  const rowNoMesin = [
    {
      type: String,
      value: "No. Mesin",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetMesin,
    },
  ];

  const rowYear = [
    {
      type: String,
      value: "Year",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetYear,
    },
  ];

  const rowCc = [
    {
      type: String,
      value: "CC",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetCc,
    },
  ];

  const rowColor = [
    {
      type: String,
      value: "Color",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetColor,
    },
  ];

  const rowLicensePlate = [
    {
      type: String,
      value: "License Plate",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetPlat,
    },
  ];

  const rowBpkb = [
    {
      type: String,
      value: "BPKB",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetBpkb,
    },
  ];

  const rowFaktur = [
    {
      type: String,
      value: "FAKTUR",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: obj.assetFaktur,
    },
  ];

  const headerSuratPeringatan = [
    {
      value: "SURAT PERINGATAN",
      span: 3,
      align: "center",
      fontWeight: "bold",
    },
  ];

  const rowSpOne = [
    {
      type: String,
      value: "NO SP 1 & Tanggal SP",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: "",
    },
  ];

  const rowSpTwo = [
    {
      type: String,
      value: "NO SP 2 & Tanggal SP",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: "",
    },
  ];

  const rowSpThree = [
    {
      type: String,
      value: "NO SP 3 & Tanggal SP",
    },
    {
      type: String,
      value: ":",
    },
    {
      type: String,
      value: "",
    },
  ];

  const data = [
    header,
    rowNameCostumer,
    rowGoLive,
    rowAgreementNumber,
    rowBirthPlaceDate,
    rowMaillingAddress,
    rowOsPrincipal,
    rowOsDenda,
    headerAssetView,
    rowName,
    rowAddress,
    rowNoRangka,
    rowNoMesin,
    rowYear,
    rowCc,
    rowColor,
    rowLicensePlate,
    rowBpkb,
    rowFaktur,
    headerSuratPeringatan,
    rowSpOne,
    rowSpTwo,
    rowSpThree,
  ];

  await writeXlsxFile(data, {
    columns,
    filePath,
    fontFamily: "Arial",
    fontSize: 8,
  });
};

export default exportExcel;
