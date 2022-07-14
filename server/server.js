const express = require("express");
const app = express();
const { google } = require("googleapis");

// app.get("/attendance", (req, res) => {
//   res.send("Successfully Done!");
// });

app.post("/attendance", async (req, res) => {
  //change to app.post
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //create client instance for auth
  const client = await auth.getClient();

  //instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "12lYYEnZ_153eNamvaC-1Q4QGvKhfPksDkOu4PlpijKA";
  //get metadata about spreadsheets
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //read rows from spreadsheets
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Trial1",
  });

  //write rows to spreadsheets
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: "Trial1!C8:C13",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[0], [0], [0], [0], [0], [0]], //each [] inside values [] represent multiple rows
    },
  });

  res.send("Done");
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
