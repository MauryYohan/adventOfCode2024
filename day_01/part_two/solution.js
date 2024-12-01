
const fs = require('fs');
const leftSideList = [];
const rightSideList = [];
const oneListBeforeResult = [];

const readFileContent = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\r\n');
    const numbers = lines.map((line) => {
        return line.split(' ')
    });
    return numbers;
}


const numbers = readFileContent('input/data.txt');

for (const number of numbers) {
    leftSideList.push(number.at(0));
    rightSideList.push(number.at(-1));
}

// The code up to this point is the same as the one in adventOfCode2024/day_01/part_one/solution.js

for (let i = 0; i < leftSideList.length; i++) {
    const num = leftSideList[i];
    const count = rightSideList.filter((n) => n === num).length;
    console.log(num, count);
    if (count >= 1) {
        oneListBeforeResult.push(num * count);
    }
}

const result = oneListBeforeResult.reduce((acc, curr) => {
    return acc + curr;
})

console.log(result);