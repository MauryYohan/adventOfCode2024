import { readFileContent, writeFileContent } from "../utils.js";

let isLevelincreaseOrDecrease = false;
let isAlternativeSafe = false;
let isLevelAdjacent = false;
let isAlternativeAdjancentSafe = false;
let safeCount = 0;

writeFileContent('output/output.txt', 'N°,  \r\n');


/**
 * 
 * @param {*} numbers 
 * @returns Array of arrays with all possible alternate with one level removed
 */
const createAlternate = (numbers) => {
    const alternates = [];
    for (let i = 0; i < numbers.length; i++) {
        const newTab = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        alternates.push(newTab);
    }
    // console.log("Alternates : ", alternates);
    return alternates;
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
        return true;
    }
    return false;
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

const incrementSafeCount = (_isLevelincreaseOrDecrease, _isLevelAdjacent) => {
    if (_isLevelincreaseOrDecrease && _isLevelAdjacent) {
        console.log(`[${globalCount}] True !`);
        safeCount += 1;
    } else {
        console.log(`[${globalCount}] False !`);
    }
}

const levels = readFileContent('input/data.txt');

console.log("Début de traitement");

let globalCount = 0;

for (let level of levels) {
    globalCount++;
    console.log("Level n° : ", globalCount);

    isLevelincreaseOrDecrease = isIncreaseOrDecrease(level);
    console.log("1.1) isLevelincreaseOrDecrease : ", isLevelincreaseOrDecrease);
    let newLevel = [];
    if (!isLevelincreaseOrDecrease) {
        const alternates = createAlternate(level);
        for (const alternate of alternates) {
            isAlternativeSafe = isIncreaseOrDecrease(alternate);
            if (isAlternativeSafe) {
                isLevelincreaseOrDecrease = true;
                newLevel = alternate;
                break;
            }
        }
    }
    console.log("1.2) isLevelincreaseOrDecrease : ", isLevelincreaseOrDecrease);
    
    console.log("*) Check level : ", level);
    console.log("*) Check newLevel : ", newLevel);

    if (newLevel.length >= 1) {
        isLevelAdjacent = adjacentLevelsDifference(newLevel);
    } else {
        isLevelAdjacent = adjacentLevelsDifference(level);
    }

    console.log("2.1) isLevelAdjacent : ", isLevelAdjacent);
    
    let anotherNewLevel = [];
    if (!isLevelAdjacent) {    
        const alternates = createAlternate(level);    
        for (const alternate of alternates) {
            isAlternativeAdjancentSafe = adjacentLevelsDifference(alternate);
            if (isAlternativeAdjancentSafe) {
                isLevelAdjacent = true;
                anotherNewLevel = alternate;
                break;
            }
        }
    }
    
    console.log("1) isLevelincreaseOrDecrease : ", isLevelincreaseOrDecrease);
    console.log("2) isLevelAdjacent : ", isLevelAdjacent);
    
    console.log("*) Check level : ", level);
    console.log("*) Check newLevel : ", newLevel);
    console.log("*) Check anotherNewLevel : ", anotherNewLevel);

    incrementSafeCount(isLevelincreaseOrDecrease, isLevelAdjacent);
    let content = `${globalCount}, [${level}], ${isLevelincreaseOrDecrease}, 
    [${newLevel}], ${isAlternativeSafe}, ${isLevelAdjacent}, [${anotherNewLevel}], ${isAlternativeAdjancentSafe}, ${safeCount} \r\n`;
    writeFileContent('output/output.txt', content);
}


// END
console.log("--------------------------------------------------");
console.log("Fin de traitement");
console.log("Safe count : ", safeCount, " / ", levels.length);
