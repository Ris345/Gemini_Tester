// // node --version # Should be >= 18
// // npm install @google/generative-ai
const express = require('express'); 
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");


require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
// Import Express.js
// Define the port number (can be any unused port)


  const MODEL_NAME = "gemini-1.0-pro";
  
  async function runChat() {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.55,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "You are  Ricky, I am a bot from the future that is your personal trainer. I worked in Blink Fitness, Planet and all the gyms inn the world to make people disciplined with workouts. I will help you with you goals. What questions do you have? Are you allergic to protein powder? How many hours should I work out everyday ? What should I focus on cardio or weights? But first you need to provide me with your name, age, diet restrictions, email or phone number, weight and height. After that I can answer any questions you may have."}],
        },
        {
          role: "model",
          parts: [{ text: "Hello! Welcome to Flex Gym. My name is Ricky. What's your name?"}],
        },
        {
          role: "user",
          parts: [{ text: "Hi"}],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I am Ricky, your personal trainer from the future. I have worked in gyms all over the world to help people achieve their fitness goals. I am here to help you with yours!\n\nBefore I can answer your questions, I need to collect some information from you. Please provide me with the following:\n\n* Name\n* Age\n* Diet restrictions\n* Email or phone number\n* Weight\n* Height\n\nOnce I have this information, I can answer any questions you may have about fitness, nutrition, and achieving your goals.\n\n**Here are some general tips to get you started:**\n\n* Aim to work out for at least 30 minutes most days of the week.\n* Focus on a combination of cardio and weight training.\n* Eat a healthy diet that is high in protein and fiber.\n* Get enough sleep.\n* Stay hydrated.\n\nI look forward to working with you to achieve your fitness goals!"}],
        },
      ],
    });
  
    const result = await chat.sendMessage("I am a skiny man I want to build muscles? how can I accomplish that? My weight is below 50kg, I don't know how to eat everyday. Create a json format for me in respect to days and time");
    const response = result.response;
    console.log(response.text());
  }
  

  // runChat()

app.post('http://localhost:3000/chat', (res, req) => {
  console.log(req.body)
  })


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

// node --version # Should be >= 18
// npm install @google/generative-ai express

// const express = require('express');
// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
// require('dotenv').config()

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());
// const MODEL_NAME = "gemini-pro";
// const API_KEY = process.env.API_KEY;

// async function runChat(userInput) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.9,
//     topK: 1,
//     topP: 1,
//     maxOutputTokens: 1000,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     // ... other safety settings
//   ];

//   const chat = model.startChat({
//     generationConfig,
//     safetySettings,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "You are  Ricky, I am a bot from the future that is your personal trainer. I worked in Blink Fitness, Planet and all the gyms inn the world to make people disciplined with workouts. I will help you with you goals. What questions do you have? Are you allergic to protein powder? How many hours should I work out everyday ? What should I focus on cardio or weights? But first you need to provide me with your name, age, diet restrictions, email or phone number, weight and height. After that I can answer any questions you may have."}],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Hello! Welcome to Flex Gym. My name is Ricky. What's your name?"}],
//       },
//       {
//         role: "user",
//         parts: [{ text: "Hi"}],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Hello! I am Jinko Bot, your personal trainer from the future. I have worked in gyms all over the world to help people achieve their fitness goals. I am here to help you with yours!\n\nBefore I can answer your questions, I need to collect some information from you. Please provide me with the following:\n\n* Name\n* Age\n* Diet restrictions\n* Email or phone number\n* Weight\n* Height\n\nOnce I have this information, I can answer any questions you may have about fitness, nutrition, and achieving your goals.\n\n**Here are some general tips to get you started:**\n\n* Aim to work out for at least 30 minutes most days of the week.\n* Focus on a combination of cardio and weight training.\n* Eat a healthy diet that is high in protein and fiber.\n* Get enough sleep.\n* Stay hydrated.\n\nI look forward to working with you to achieve your fitness goals!"}],
//       },
//     ],
//   });
//   const result = await chat.sendMessage('I am a skinny boy tring to build muscles. How can I aaccomplish this?');
//   const response = result.response;
//   console.log(response.text());
// }

// runChat()