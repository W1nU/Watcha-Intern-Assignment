import React, {Component} from 'react'
import {observer, inject} from "mobx-react";
import {arrayToMatrix} from "../../ArrayFunctions";
import BingoItem from './BingoItem';
import "./BingoBorad.css"

@inject("bingo")
@observer
class BingoBoard extends Component {
    constructor(props) {
        super(props);
        this.bingoStore = this.props.bingo;
        this.colCount = 5
    }

    _generateBingoBoard = () => {
        let tempArray = this.props.player === "player1" ? arrayToMatrix(this.bingoStore.p1Numbers, 5) : arrayToMatrix(this.bingoStore.p2Numbers, 5);
        let JSXScripts = [];

        for (let i = 0; i < tempArray.length; i++) {
            let colScripts = [];
            if(this.bingoStore.isInGame === 0){
                colScripts = tempArray[i].map(
                    col => (
                        <BingoItem className="bingo-table-cell" player={this.props.player} key={col}/>
                    ));
            }
            else{
                colScripts = tempArray[i].map(
                    col => (
                        <BingoItem className="bingo-table-cell" item={col} player={this.props.player} key={col}/>
                    ));
            }
            JSXScripts.push(<tr key={i}>{colScripts}</tr>)
        }

        return JSXScripts
    };

    render() {

        return (
            <table className="bingo-board">
                <thead>
                    <tr>
                        <th colSpan={this.colCount}>{this.props.player}</th>
                    </tr>
                </thead>
                <tbody className="binggo-board">
                {this._generateBingoBoard()}
                </tbody>
            </table>
        )
    }
}

export default BingoBoard