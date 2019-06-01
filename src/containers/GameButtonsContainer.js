import React, {Component} from 'react'

import {observer, inject} from "mobx-react";

@inject("bingo")
@observer
class GameButtonsContainer extends Component {
    constructor(props) {
        super(props);
        this.bingoStore = this.props.bingo;
    }

    render() {
        return (
            <div className="game-buttons-container">
                <button id="game-button"
                        onClick={this.bingoStore.gameStartButtonHandler}>{this.bingoStore.gameButtonText}</button>
                <button id="game-button" onClick={this.bingoStore.gameStopButtonHandler}>게임 종료</button>
            </div>
        )
    }

}

export default GameButtonsContainer