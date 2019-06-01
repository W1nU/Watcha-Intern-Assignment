import React from 'react';
import CompletedBoard from '../completedLineBoard/CompletedLineBoard';
import './CompletedLineBoardContainer.css';

const CompletedLineBoardContainer = () => {
    return(
        <div className="completed-line-board-container">
            <CompletedBoard player="player1"/>
            <CompletedBoard player="player2"/>
        </div>
    )
}

export default CompletedLineBoardContainer