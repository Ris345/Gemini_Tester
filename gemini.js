const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "MODEL_NAME" });

console.log(model)

// ...

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt =
    "Write about how to land a job as a self taught software egineer.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(response);
  console.log(text);
}

run();