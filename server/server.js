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
const googleSheets = google.sheets({ version: "v4", auth: client });

const spreadsheetId = "12lYYEnZ_153eNamvaC-1Q4QGvKhfPksDkOu4PlpijKA";
//get metadata about spreadsheets
const metaData = googleSheets.spreadsheets.get({
  auth,
  spreadsheetId,
});

app.get("/attendance", async (req, res) => {
  //read rows from spreadsheets
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Trial1",
  });

  res.send(getRows);
});

app.post("/attendance", async (req, res) => {
  const caughtValue = req.body.attedanceList;
  let states = [[]];
  caughtValue.map((items, index) => {
    const newList = [...caughtValue];
    states[index] = [newList[index][2]];
  });
  // console.log(states);

  //write rows to spreadsheets
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: "Trial1!C:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: states, //each [] inside values [] represent multiple rows
    },
  });

  res.send("Done");
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
