import { useState } from 'react'
import greatBall from '/Great_Ball.jpg'
import './App.css'



function App() {
  
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState([])

  async function BaseSetCards() {
      try {
        const response = await fetch("http://localhost:5000/api/cards/all", {
          method: "GET"
        })

        if (!response.ok){
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();
        setCards(result)
        console.log(result);
        return result;
      } catch (error){
        console.log("Error when getting all cards " + error)
      }
  }

  return (
    <>
      <div>
          <img src={greatBall} className="logo" alt="Vite logo" />
      </div>
      <h1>Oak's TCG Lounge</h1>
      <div className="card">
        <button onClick={BaseSetCards}>
          Get Base Set Cards
        </button>
      </div>
      <ol>
      {cards.map((card) =>{
        return (   
          <>      
          <img height={"275px"} src={"http://localhost:5000"+card.image} style={{padding:"10px"}}></img>
          </>
        )
      })}
      </ol>
    </>
  )
}

export default App
