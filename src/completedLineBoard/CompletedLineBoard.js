import React, {Component} from 'react';
import './CompletedLineBoard.css'
import {observer, inject} from "mobx-react";

@inject("bingo")
@observer
class CompletedLineBoard extends Component{
    constructor(props) {
        super(props);
        this.bingoStore = this.props.bingo;
        this.boardJSX = []
    }

    _generateCell = () => {
        if(this.props.player === "player1"){
            this.boardJSX = [];
            for(let i = 0; i<this.bingoStore.p1CompletedArray.length; i++){
                this.boardJSX.push(<tr key = {i} className="completed-line-board-row">
                    {this.bingoStore.p1CompletedArray[i].map(
                        x => <td key={x} className="completed-line-board-cell">
                            {x}</td>)}</tr>)
            }
        }
        else{
            this.boardJSX = [];
            for(let i = 0; i<this.bingoStore.p2CompletedArray.length; i++){
                this.boardJSX.push(<tr key={i} className="completed-line-board-row">
                    {this.bingoStore.p2CompletedArray[i].map(
                        x => <td key={x} className="completed-line-board-cell">
                            {x}</td>)}</tr>)
            }
        }
    };

    render() {
        this._generateCell();
        return(
            <table id="completed-line-board">
                <thead>
                    <tr>
                        <th colSpan="5" className="completed-line-board-header">
                            {this.props.player}이 완료한 빙고
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.boardJSX}
                </tbody>
            </table>
        )
    }
}

export default CompletedLineBoard