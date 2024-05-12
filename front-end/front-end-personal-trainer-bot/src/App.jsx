import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className=" h-screen  w-6/12 border border-black">
        <h1>Jinko Bot</h1>
    </div>
    <div className="h-20 border w-6/12  border-black">
        <button>Ask</button>
        </div>
  </div>
  )
}

export default App
