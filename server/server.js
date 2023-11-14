const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const openApiKey = process.env.OPEN_API_KEY;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/completion", async (req, res) => {
  const prompt = req.body.prompt;
  const messages = [
    {
      role: "system",
      content:
        "You are a travel suggestion assistant You are to only provide travel suggestions! Provide responses in JSON format with 'suggestion' and 'location'.",
    },
    { role: "user", content: prompt },
  ];
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const jsonResponse = await response.json();
    const suggestionResponse = JSON.parse(
      jsonResponse.choices[0].message.content
    );
    console.log(suggestionResponse.location);

    res.send(suggestionResponse);
  } catch (error) {
    console.error(error);
  }
});

app.get("/*", (req, res) => {
  res.send("404");
});

app.listen(port, console.log(`Server is running on http://localhost:${port}`));
