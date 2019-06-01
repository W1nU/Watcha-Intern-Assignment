import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import "./BingoItem.css";


@inject("bingo")
@observer
class BingoItem extends Component {
    constructor(props) {
        super(props);
        this.bingoStore = this.props.bingo;
    }

    _checkIsClicked = () => {
        if (this.props.player === "player1") {
            if (this.bingoStore.p1ClickedArray[this.bingoStore.p1Numbers.indexOf(this.props.item)]) return true;
        } else {
            if (this.bingoStore.p2ClickedArray[this.bingoStore.p2Numbers.indexOf(this.props.item)]) return true;
        }
        return false
    }

    _checkTurnbeforeClick = (e) => {
        if(this.props.player !== this.bingoStore.turn){
            alert("잘못된 차례입니다.")
            return;
        }
        this.bingoStore.itemClickedHandler(e)
    }

    render() {
        if (this.props.item === undefined) {
            return (
                <td className="bingo-table-cell"></td>
            )
        } else {
            if (this._checkIsClicked()) {
                if(this.bingoStore.isCompletedItem(this.props.item, this.props.player)){
                    return (
                        <td className="bingo-table-cell"
                            style={{"background": "tomato"}}>{this.props.item}</td>
                    )
                }
                return (
                    <td className="bingo-table-cell"
                        style={{"background": "grey"}}>{this.props.item}</td>
                )
            } else {
                return (
                    <td className="bingo-table-cell"
                        onClick={this._checkTurnbeforeClick}>{this.props.item}</td>
                )
            }
        }
    }

}

export default BingoItem