import React, { useState } from "react";
function App() {
  const [display, setDisplay] = useState("");
  const getPrompt = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const prompt = formData.get("prompt");

    const promptResponse = await fetch("http://localhost:3000/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const jsonPromptResponse = await promptResponse.json();
    console.log(jsonPromptResponse);
    const contentObject = JSON.parse(
      jsonPromptResponse.choices[0].message.content
    );
    setDisplay(contentObject.suggestion);
  };

  return (
    <>
      <div className="min-h-screen bg-cyan-950 text-gray-50">
        <h1 className=" no-underline text-3xl font-bold  text-amber-300 py-2">
          WanderEarth
        </h1>
        <form
          className="py-4 text-center"
          method="POST"
          action="http://localhost:3000/completion"
          onSubmit={getPrompt}
        >
          <input
            className="bg-teal-700 rounded p-1 mx-4"
            id="prompt"
            name="prompt"
          ></input>
          <button type="submit">Send</button>
        </form>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-3xl">{display}</p>
        </div>
      </div>
    </>
  );
}

export default App;
