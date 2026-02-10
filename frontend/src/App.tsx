import { useState } from 'react'
import greatBall from '/Great_Ball.jpg'
import './App.css'



function App() {
  
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
          <img src={greatBall} className="logo" alt="Vite logo" onClick={() => {setCards([])}} />
      </div>
      <h1>Oak's TCG Lounge</h1>
      <div className="card">
        <img className='pack' src={"./public/images/BaseCardPack.jpg"} onClick={BaseSetCards} />
      </div>
      <ol >
      {cards.map((card) =>{
        return (   
          <li key={card.id} style={{display:"inline-block"}}>      
          <img height={"275px"} src={"http://localhost:5000"+card.image} style={{padding:"10px"}}></img>
          </li>
        )
      })}
      </ol>
    </>
  )
}

export default App
