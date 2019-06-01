import React, {Component} from 'react';
import BingoBoardContainer from './components/containers/BingoBoardsContainer';
import GameButtonsContainer from './components/containers/GameButtonsContainer';
import "./App.css";
import CompletedLineBoardContainer from './components/containers/CompletedLineBoardContainer';

import {observer, inject} from "mobx-react";

@inject("bingo")
@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.bingoStore = this.props.bingo;

    }

    render() {
        let turnText = this.bingoStore.isInGame === 1? this.bingoStore.turn + '의 차례입니다.' : ""
        return (
            <div id="app">
                <GameButtonsContainer/>
                <div id = "turn-text">
                    <b>{turnText}</b>
                </div>
                <BingoBoardContainer/>
                <CompletedLineBoardContainer />
            </div>
        );
    }
}

export default App;