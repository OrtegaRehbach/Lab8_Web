import "./App.scss";
import React, { useEffect, useState } from "react";
import Card from "./components/card/card";

const cardCover = "/assets/images/cover.jpg"
const cardImages = [
    {"src": "/assets/images/diamond.png", matched: false},
    {"src": "/assets/images/iron_ingot.png", matched: false},
    {"src": "/assets/images/gold.png", matched: false},
    {"src": "/assets/images/emerald.png", matched: false},
    {"src": "/assets/images/coal.png", matched: false},
    {"src": "/assets/images/netherite_ingot.png", matched: false},
    {"src": "/assets/images/redstone_dust.png", matched: false},
    {"src": "/assets/images/amethyst_shard.png", matched: false}
]

export function App() {

    const [cards, setCards] = useState([])
    const [moves, setMoves] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // Shuflle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setMoves(0)
    }

    // Handle choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
    }

    // Compare the two selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        return (card.src === choiceOne.src) ? {...card, matched: true} : card
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // Reset choices and increse moves
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setMoves(prevMoves => prevMoves + 1)
        setDisabled(false)
    }

    // Check if player has won
    useEffect(() => {
        setTimeout(() => checkForWin(), 1200)
    }, [cards])

    const checkForWin = () => {
        const check = cards.every(card => card.matched === true)
        if (check && cards.length > 0) {
            alert("Felicidades! Has completado el juego en '" + moves + "' movimientos!")
        }
    }

    // Start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    return (
        <div className="App">
            <h1>Juego de Memoria</h1>
            <div className="card-grid">
                {cards.map(card => (
                    <Card 
                        key={card.id} 
                        card={card}
                        cover={cardCover}
                        handleChoice ={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}   
                    />
                ))}
            </div>
            <p>Movimientos: {moves}</p>
            <button className="reset-button" onClick={shuffleCards}>Restart</button>
        </div>
    );
}