import {toJS} from 'mobx';

export let initArray = (len) => {
    let returnArray = [];

    for (let i = 0; i < len; i++) {
        returnArray[i] = i + 1;
    }

    return returnArray
};

export let initBoolArray = (len) => {
    let returnArray = [];

    for (let i = 0; i < len; i++) {
        returnArray[i] = false;
    }

    return returnArray
};

export let shuffleArray = (array) => {
    let tempIdx, tempNumber;

    for (let i = 0; i < array.length; i++) {
        tempIdx = Math.floor(Math.random() * i);
        tempNumber = array[i];
        array[i] = array[tempIdx];
        array[tempIdx] = tempNumber;
    }

    return array
};

export let arrayToMatrix = (array, col) => {
    let returnMatrix = [];
    let indexCount = 0;
    let tempCol = col;

    for (let i = 0; i < parseInt(array.length / col); i++) {
        returnMatrix.push(array.slice(indexCount, tempCol));
        indexCount += col;
        tempCol += col;
    }

    return returnMatrix
};

export let matrixToArray = (matrix) => {
    let tempArray = [];

    for (let i = 0; i < matrix.length; i++) {
        tempArray = tempArray.concat(matrix[i])
    }
    return tempArray
};

export let isIncludedInArray = (array, item) => {
    for(let i = 0; i < array.length; i++) {
        if(JSON.stringify(array[i]) === JSON.stringify(item)){
            return true
        }
    }
    return false
};

export let checkCompletedLine = (array, completeArray, rawArray) => {

    let count = 0;
    let matrix = arrayToMatrix(array, 5);
    let tempMatrix = JSON.parse(JSON.stringify(matrix));
    let checkBool, tempArray;
    let rawMatrix = arrayToMatrix(rawArray, 5);
    let numberArray = toJS(completeArray);
    // let presentCompleteArray = toJS(completeArray);

    //가로 검사
    for (let row = 0; row < matrix.length; row++) {
        tempArray = [];
        if (!matrix[row].includes(false)) {
            count++;
            for (let col = 0; col < matrix[row].length; col++) {
                tempArray.push(rawMatrix[row][col]);
                tempMatrix[row][col] = 3
            }
            if(!isIncludedInArray(numberArray, tempArray)){
                numberArray.push(tempArray)
            }
        }
    }

    //세로 검사
    for (let col = 0; col < matrix[0].length; col++) {
        checkBool = true;
        tempArray = [];
        for (let row = 0; row < matrix.length; row++) {
            if (matrix[row][col] === false) {
                checkBool = false;
                break
            }
        }
        if (checkBool) {
            count++;
            for (let row = 0; row < matrix.length; row++) {
                tempArray.push(rawMatrix[row][col]);
                tempMatrix[row][col] = 3
            }
            if(!isIncludedInArray(numberArray, tempArray)){
                numberArray.push(tempArray)
            }
        }

    }

    //대각선 검사
    checkBool = true;
    for (let idx = 0; idx < matrix.length; idx++) {
        if (matrix[idx][idx] === false) {
            checkBool = false;
            break
        }
    }

    if (checkBool) {
        tempArray = [];
        count++;
        for (let idx = 0; idx < matrix.length; idx++) {
            tempArray.push(rawMatrix[idx][idx]);
            tempMatrix[idx][idx] = 3
        }
        if(!isIncludedInArray(numberArray, tempArray)){
            numberArray.push(tempArray)
        }
    }

    checkBool = true;
    for (let idx = 0; idx < matrix.length; idx++) {
        if (matrix[idx][4 - idx] === false) {
            checkBool = false;
            break
        }
    }
    if (checkBool) {
        count++;
        tempArray = [];
        for (let idx = 0; idx < matrix.length; idx++) {
            tempArray.push(rawMatrix[idx][4 - idx]);
            tempMatrix[idx][4 - idx] = 3
        }
        if(!isIncludedInArray(numberArray, tempArray)){
            numberArray.push(tempArray)
        }
    }

    return [matrixToArray(tempMatrix), count, numberArray]
};


