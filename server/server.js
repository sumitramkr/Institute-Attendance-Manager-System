require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

//create client instance for auth
const client = auth.getClient();

//instance of google sheets api
// const sheets = google.sheets('v4');
const googleSheets = google.sheets({ version: "v4", auth: client });

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetId = process.env.TEMPELATE_SHEET_ID;
//get metadata about spreadsheets
const metaData = googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
});

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let columnName = date + "-" + month + "-" + year;

// async function createSheet() {
//   checker = 1;
//   //creating duplicate sheet from template
//   const response = (
//     await googleSheets.spreadsheets.batchUpdate({
//       auth,
//       spreadsheetId,
//       resource: {
//         requests: [
//           {
//             duplicateSheet: {
//               sourceSheetId: templateSheetId,
//               newSheetId: sheetId,
//               newSheetName: columnName,
//             },
//           },
//         ],
//       },
//     })
//   ).data;
// }

// createSheet();

async function main() {
  const request = {
    auth,
    spreadsheetId,
    includeGridData: false,
  };

  let responseSheet = (await googleSheets.spreadsheets.get(request)).data;
  return responseSheet;
}

// app.get("/createColumn", async (req, res) => {
//   // let sName = "";
//   res.send(response.sheets[0].properties.sheetId);
// });

app.post("/createColumn", async (req, res) => {
  let sectionName = req.body.secName;
  // console.log(sectionName + " " + req.body.goAttendance);
  let currentSectionId = 0;
  let responseSheet = await main();
  let findSheets = [...responseSheet.sheets];
  let currentSectionName = "";

  findSheets.map((item) => {
    if (item.properties.title === sectionName) {
      currentSectionId = item.properties.sheetId;
    }
  });

  // let responseSheetId = await googleSheets.spreadsheets.get({
  //   auth: client,
  //   spreadsheetId,
  //   ranges: sectionName,
  //   includeGridData: false,
  // });

  // console.log(responseSheetId.data.sheets[0].properties.sheetId);
  // await googleSheets.spreadsheets.batchUpdate({
  //   auth,
  //   spreadsheetId,
  //   resource: {
  //     requests: [
  //       {
  //         copyPaste: {
  //           source: {
  //             sheetId: sheetId,
  //             startRowIndex: 0,
  //             startColumnIndex: 2,
  //             endColumnIndex: 3,
  //           },
  //           destination: {
  //             sheetId: sheetId,
  //             startRowIndex: 0,
  //             startColumnIndex: 3,
  //             endColumnIndex: 3,
  //           },
  //           pasteType: "PASTE_NORMAL",
  //           pasteOrientation: "NORMAL",
  //         },
  //       },
  //     ],
  //   },
  // });

  await googleSheets.spreadsheets.batchUpdate({
    auth,
    spreadsheetId,
    resource: {
      requests: [
        {
          insertDimension: {
            range: {
              sheetId: currentSectionId,
              dimension: "COLUMNS",
              startIndex: 3,
              endIndex: 4,
            },
          },
        },
      ],
    },
  });

  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: sectionName + "!D1:D1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[columnName]],
    },
  });

  // await googleSheets.spreadsheets.values.update({
  //   auth,
  //   spreadsheetId,
  //   range: sectionName + "!D2:D306",
  //   valueInputOption: "USER_ENTERED",
  //   resource: {
  //     values: [[0]],
  //   },
  // });

  let attedanceBool = req.body.goAttendance;
  // console.log(attedanceBool);
  if (attedanceBool) {
    findSheets.map((item) => {
      if (item.properties.title === sectionName) {
        currentSectionName = item.properties.title;
      }
    });
    let newURL = "/attendance/" + currentSectionName;
    res.redirect(newURL);
  }
});

app.get("/attendance/:topic", async (req, res) => {
  // console.log(postValue);
  let param = req.params.topic;
  // console.log(param);
  // let findSheets = postValue.findSheets;
  // console.log(req.query);
  // let secName = postValue.secName;

  // let currentSectionName = "";

  // findSheets.map((item) => {
  //   if (item.properties.title === sectionName) {
  //     currentSectionName = item.properties.title;
  //   }
  // });
  //read rows from spreadsheets
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: param,
  });

  res.send(getRows);
});

app.post("/attendance:topic", async (req, res) => {
  let param = req.params.topic;
  const caughtValue = req.body.attedanceList;
  let states = [[]];
  let newList = [[]];
  caughtValue.map((items, index) => {
    newList = [...caughtValue];
    states[index] = [newList[index][2]];
  });

  //write rows to spreadsheets
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: param,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: newList,
    },
  });

  res.send("Done");
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
