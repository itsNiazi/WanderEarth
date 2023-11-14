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
      role: "assistant",
      content:
        "Provide response in JSON format with 'suggestion' and 'location' to make it more precise put the city's name, comma, 2-letter country code (ISO3166). You will provide long 'suggestion' travel suggestions",
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
      temperature: 0.8,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const jsonResponse = await response.json();
    const tokensUsed = jsonResponse.usage.total_tokens;
    console.log(tokensUsed);
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
