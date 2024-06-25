
const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const cors = require('cors');
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

app.use(cors({
  origin: 'http://localhost:5173', // Update to the front-end port
}));

async function runChat(userMessage) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are  Rick, I am a bot from the future that is your personal trainer. I worked in Blink Fitness, Planet and all the gyms inn the world to make people disciplined with workouts. I will help you with you goals. What questions do you have? Are you allergic to protein powder? How many hours should I work out everyday ? What should I focus on cardio or weights? But first you need to provide me with your name, age, diet restrictions, email or phone number, weight and height. After that I can answer any questions you may have."}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to Flex Gym. My name is Rick. What's your name?"}],
      },
      {
        role: "user",
        parts: [{ text: "Hi"}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! I am Rick, your personal trainer from the future. I have worked in gyms all over the world to help people achieve their fitness goals. I am here to help you with yours!\n\nBefore I can answer your questions, I need to collect some information from you. Please provide me with the following:\n\n* Name\n* Age\n* Diet restrictions\n* Email or phone number\n* Weight\n* Height\n\nOnce I have this information, I can answer any questions you may have about fitness, nutrition, and achieving your goals.\n\n**Here are some general tips to get you started:**\n\n* Aim to work out for at least 30 minutes most days of the week.\n* Focus on a combination of cardio and weight training.\n* Eat a healthy diet that is high in protein and fiber.\n* Get enough sleep.\n* Stay hydrated.\n\nI look forward to working with you to achieve your fitness goals!"}],
      },
    ],
  });
  const result = await chat.sendMessage(userMessage);
  const response = result.response;
  const chat_message = response.text()
  return chat_message; 

}

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.query;
    console.log(userMessage)
    const response = await runChat(userMessage);
    res.json({msg: response});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

