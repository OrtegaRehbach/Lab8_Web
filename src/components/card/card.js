import "./card.scss"
import React from "react";

function Card({ card, cover, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) handleChoice(card)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front"></img>
                <img className="back" 
                    src={cover} 
                    onClick={handleClick} 
                    alt="card back"></img>
            </div>
        </div>
    );
}

export default Card;