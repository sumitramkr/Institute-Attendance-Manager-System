const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: "user" });
});

app.listen(5000, () => {
  console.log("Server on port 5000");
});
