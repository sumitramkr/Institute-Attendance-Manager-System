require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { google } = require("googleapis");

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
const templateSheetId = process.env.TEMPELATE_SHEET_ID;
//get metadata about spreadsheets
const metaData = googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
});

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let sheetNameDate = date + "-" + month + "-" + year;
let sheetId = date + month + year;
let checker = 0;

async function createSheet() {
  checker = 1;
  //creating duplicate sheet from template
  const response = (
    await googleSheets.spreadsheets.batchUpdate({
      auth,
      spreadsheetId,
      resource: {
        requests: [
          {
            duplicateSheet: {
              sourceSheetId: templateSheetId,
              newSheetId: sheetId,
              newSheetName: sheetNameDate,
            },
          },
        ],
      },
    })
  ).data;
}

checker === 1 && createSheet();

app.get("/attendance", async (req, res) => {
  //read rows from spreadsheets
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: sheetNameDate,
  });

  res.send(getRows);
});

app.post("/attendance", async (req, res) => {
  const caughtValue = req.body.attedanceList;
  let states = [[]];
  let newList = [[]];
  caughtValue.map((items, index) => {
    newList = [...caughtValue];
    states[index] = [newList[index][2]];
  });
  console.log(newList);

  //write rows to spreadsheets
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: sheetNameDate,
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
