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

async function main() {
  const request = {
    auth,
    spreadsheetId,
    includeGridData: false,
  };

  let responseSheet = (await googleSheets.spreadsheets.get(request)).data;
  return responseSheet;
}

app.post("/createColumn", async (req, res) => {
  let sectionName = req.body.secName;
  let currentSectionId = 0;
  let responseSheet = await main();
  let findSheets = [...responseSheet.sheets];
  let currentSectionName = "";

  findSheets.map((item) => {
    if (item.properties.title === sectionName) {
      currentSectionId = item.properties.sheetId;
    }
  });

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
              startIndex: 2,
              endIndex: 3,
            },
          },
        },
      ],
    },
  });

  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: sectionName + "!C1:C1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[columnName]],
    },
  });

  let attedanceBool = req.body.goAttendance;
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
  let param = req.params.topic;
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
