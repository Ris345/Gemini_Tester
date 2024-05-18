import { useState } from 'react'
import './App.css'

function App() {
  const [userData, setuserData] = useState('')
  const [incomingData, setIncomingData] = useState(null)
  async function callBot() {
    const userInput = null
    console.log(userData)

    try {

      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userData }),
      });

      const data = await response.json();
      console.log(data)
      const botMessage = data.response;
      console.log(botMessage)
      // Add chat message to the chat history

      // Scroll to the bottom of the chat history
    } catch (error) {
      console.error('Error:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  }

  return (
    <div>
      <div className=" h-screen  w-6/12 border border-black">
        <h1>Jinko Bot</h1>
        <p>{userData}</p>
    </div>
    <div className="h-20 border w-6/12  border-black">
        <button onClick={callBot}>Ask</button>
        <input type="text" placeholder='text input here' onChange={e => setuserData(e.target.value)}/> 
        </div>
  </div>
  )
}


export default App
