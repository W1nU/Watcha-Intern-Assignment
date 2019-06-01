import {observable, action} from "mobx";
import {initArray, shuffleArray, initBoolArray, checkCompletedLine} from "../ArrayFunctions";


export default class BingoStore {
    @observable isInGame = 0;
    @observable p1Numbers = initArray(25);
    @observable p2Numbers = initArray(25);
    @observable p1ClickedArray = initBoolArray(25);
    @observable p2ClickedArray = initBoolArray(25);
    @observable p1CompletedArray = []; // 이 State는 빙고완성된 순서대로 1줄 Array가 저장됨
    @observable p2CompletedArray = [];
    @observable p1CompletedCheckArray = []; // 이 State는 빙고 완성검사함수를 통과한 Array가 저장됨
    @observable p2CompletedCheckArray = [];
    @observable p1CompletedLineCount = 0; // 이 State는 빙고 완성검사함수에서 카운팅한 숫자가 저장됨
    @observable p2CompletedLineCount = 0;
    @observable turn = "player1";
    @observable gameButtonText = "게임 시작";

    gameStartButtonHandler = () => {
        if (this.isInGame === 1 && window.confirm("재시작 하시겠습니까?")) {
            this.gameStart()
        } else if (this.isInGame === 0) {
            this.gameStart()
        }
    };

    gameStopButtonHandler = () => {
        if (this.isInGame === 1 && window.confirm("종료 하시겠습니까?")) {
            this.gameStop()
        } else if (this.isInGame === 0) {
            window.alert("게임을 먼저 시작해 주세요.")
        }
    };

    itemClickedHandler = (e) => {
        let item = e.target.innerText;
        this.itemToTrue(parseInt(item));
        this._checkCompletedLine();
        this.turn = this.turn === "player1" ? "player2" : "player1"
    };

    isCompletedItem = (item, player) => {
        if(player === "player1"){
            if(this.p1CompletedCheckArray[this.p1Numbers.indexOf(parseInt(item))] === 3){
                return true
            }
        }
        else{
            if(this.p2CompletedCheckArray[this.p2Numbers.indexOf(parseInt(item))] === 3){
                return true
            }
        }
        return false
    };

    completeGame = () => {
        if(this.p2CompletedLineCount >= 5 && this.p1CompletedLineCount >= 5){
            window.alert("무승부 입니다.")
        }
        else if(this.p1CompletedLineCount >= 5){
            window.alert("1P가 빙고를 완성했습니다.")
        }
        else if(this.p2CompletedLineCount >= 5){
            window.alert("2P가 빙고를 완성했습니다.")
        }
        this.gameStop()
    };


    @action _checkCompletedLine = () => {
        let p1Result = checkCompletedLine(this.p1ClickedArray, this.p1CompletedArray, this.p1Numbers);
        let p2Result = checkCompletedLine(this.p2ClickedArray, this.p2CompletedArray, this.p2Numbers);
        this.p1CompletedCheckArray = p1Result[0];
        this.p2CompletedCheckArray = p2Result[0];
        this.p1CompletedLineCount = p1Result[1];
        this.p2CompletedLineCount = p2Result[1];
        this.p1CompletedArray = p1Result[2];
        this.p2CompletedArray = p2Result[2];

        setTimeout(()=>{
            if(this.p1CompletedLineCount >= 5 || this.p2CompletedLineCount >= 5){
                this.completeGame()
            }
        },100) // 랜더링 이전에 게임 종료 방지용
    };

    @action itemToTrue = (item) => {
        this.p1ClickedArray[this.p1Numbers.indexOf(item)] = true;
        this.p2ClickedArray[this.p2Numbers.indexOf(item)] = true;
    };

    @action removeArray = () => {
        this.p1Numbers = initArray(25);
        this.p2Numbers = initArray(25);
        this.p1ClickedArray = initBoolArray(25);
        this.p2ClickedArray = initBoolArray(25);
        this.p1CompletedArray = [];
        this.p2CompletedArray = [];
        this.p1CompletedCheckArray = [];
        this.p2CompletedCheckArray = [];
        this.p1CompletedLineCount = 0;
        this.p2CompletedLineCount = 0;
    };

    @action shuffleArray = () => {
        this.p1Numbers = shuffleArray(this.p1Numbers);
        this.p2Numbers = shuffleArray(this.p2Numbers);
    };

    @action gameStart = () => {
        this.removeArray();
        this.shuffleArray();
        this.turn = "player1";
        this.gameButtonText = "게임 재시작";
        this.isInGame = 1;
        this.p1ClickedArray = initBoolArray(25);
        this.p2ClickedArray = initBoolArray(25);
    };

    @action gameStop = () => {
        this.isInGame = 0;
        this.gameButtonText = "게임 시작";
        this.removeArray()
    };
}