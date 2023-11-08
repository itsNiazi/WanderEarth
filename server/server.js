const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const openApiKey = process.env.OPEN_API_KEY;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/completion", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: "What is the capital of Sweden?",
      max_tokens: 10,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/completions",
      options
    );
    const jsonResponse = await response.json();
    res.send(jsonResponse);
  } catch (error) {
    console.error(error);
  }
});

app.get("/*", (req, res) => {
  res.send("404");
});

app.listen(port, console.log(`Server is running on http://localhost:${port}`));
