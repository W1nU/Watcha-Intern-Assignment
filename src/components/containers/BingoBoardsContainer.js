import React from 'react'
import BingoBoard from "../bingoBoard/BingoBoard";
import "./BingoBoardsContainer.css"

const BingoBoardsContainer = () => {
    return (
        <div className="bingo-boards-container">
            <BingoBoard player="player1"/>
            <BingoBoard player="player2"/>
        </div>
    )
}

export default BingoBoardsContainer