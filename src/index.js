import React from "react"
import ReactDOM from "react-dom/client"
import './styles.css'
import Die from './Die.js'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {
    const [dice, setDice] = React.useState(AllNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const AllValues = dice.every(die => die.value === firstValue)
        if(allHeld && AllValues) {
            setTenzies(true)
            console.log("Won")
        }

    }, [dice])

    function AllNewDice() {
            const newDice = []
            for (let i = 0; i < 10; i++) {
                newDice.push(generateNewDie())
            }

            return newDice
    }
    
    function generateNewDie() {
        return { 
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }


    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die: 
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(AllNewDice)
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map( die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
                </button>
        </main>
    )
}





const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<App />)