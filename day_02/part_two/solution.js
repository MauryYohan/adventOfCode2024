import { readFileContent } from "../utils.js";

let levelincreaseOrDecrease = false;
let levelAdjacent = false;

let safetable = [];
let safeCount = 0;

let log = [];

/*
7 6 4 2 1: Safe without removing any level.                 ()
1 2 7 8 9: Unsafe regardless of which level is removed.     ()
9 7 6 2 1: Unsafe regardless of which level is removed.     ()
1 3 2 4 5: Safe by removing the second level, 3.            ()
8 6 4 4 1: Safe by removing the third level, 4.             ()
1 3 6 7 9: Safe without removing any level.                 ()
*/

// 1 3 2 4 5 =>  1 2 4 5
// 8 6 4 4 1 =>  8 6 4 1
/*
const checkAlternate = (numbers) => {
    let original = [...numbers];
    let copy;
    for (let i = 0; i < numbers.length; i++) {
        copy = [...original];
        console.log("Copy faite : ", copy);
        copy.splice(i, 1);
        console.log("Tableau modifié : ", copy);
        if (isIncreaseOrDecrease(copy)) {
            return copy, true;
        }
    }
    return numbers, false;
}
*/

const checkAlternate = (numbers) => {
    let original = [...numbers];
    let copy;
    for (let i = 0; i < numbers.length; i++) {
        copy = [...original];
        console.log("Copy faite : ", copy);
        copy.splice(i, 1);
        console.log("Tableau modifié : ", copy);
        if (isIncreaseOrDecrease(copy)) {
            return { modifiedArray: copy, result: true };
        }
    }
    return { modifiedArray: numbers, result: false };
}

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
        return { modifiedArray: numbers, result: true };
    } else {
        return { modifiedArray: numbers, result: checkAlternate(numbers) };
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

const levels = readFileContent('input/data-test.txt');

for (const level of levels) {
    level, levelincreaseOrDecrease = isIncreaseOrDecrease(level);
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
console.log(levels);
