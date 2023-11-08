const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/*", (req, res) => {
  res.send("404");
});

app.listen(port, console.log(`Server is running on http://localhost:${port}`));
