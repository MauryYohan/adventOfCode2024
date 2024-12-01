
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

const leftSorted = leftSideList.sort((a, b) => a - b);
const rightSorted = rightSideList.sort((a, b) => a - b);

for (let i = 0; i < leftSorted.length; i++) {
    oneListBeforeResult.push(Math.abs(leftSorted[i] - rightSorted[i]));
}

const result = oneListBeforeResult.reduce((acc, curr) => {
    return acc + curr;
})

console.log(result);