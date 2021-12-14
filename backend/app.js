const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("test");
});
