import { readFileContent } from "../utils.js";

let levelincreaseOrDecrease = false;
let levelAdjacent = false;

let safetable = [];
let safeCount = 0;

let log = [];

const isIncreaseOrDecrease = (numbers) => {
    let constant = 0;
    for (let i = 1; i < numbers.length; i++) {
        if (Number(numbers[i - 1]) < Number(numbers[i])) {
            constant += 1;
        } 
        if (Number(numbers[i - 1]) > Number(numbers[i])) {
            constant -= 1;
        }
    }
    if (Math.abs(constant) === (numbers.length - 1)) {
        return true;
    } else {
        return false;
    }
}

const adjacentLevelsDifference = (numbers) => {
    for (let i = 1; i < numbers.length; i++) {
        let difference = Math.abs(Number(numbers[i - 1]) - Number(numbers[i]));
        if ( difference < 1 || difference > 3) {
            return false;
        }
    }
    return true;
};

const isIncreaseOrDecreaseGPT = (numbers) => {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > numbers[i - 1]) {
            isDecreasing = false;
        } else if (numbers[i] < numbers[i - 1]) {
            isIncreasing = false;
        }
    }
    return isIncreasing || isDecreasing;
};

const levels = readFileContent('input/data.txt');

for (const level of levels) {
    levelincreaseOrDecrease = isIncreaseOrDecrease(level);
    levelAdjacent = adjacentLevelsDifference(level);
    if (levelincreaseOrDecrease && levelAdjacent) {
        safeCount += 1;
    }
    safetable.push(levelincreaseOrDecrease && levelAdjacent);
    log.push([level, levelincreaseOrDecrease && levelAdjacent]);
}

console.log(safeCount);

const safeLevels = safetable.filter((level) => level === true).length;
console.log(safeLevels);