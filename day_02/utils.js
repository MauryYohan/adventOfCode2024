// utils.js
const fs = require('fs');

const readFileContent = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\r\n');
    return lines.map((line) => line.split(' '));
}

const extractsSides = (numbers) => {
    const leftSideList = [];
    const rightSideList = [];
    
    for (const number of numbers) {
        leftSideList.push(number.at(0));
        rightSideList.push(number.at(-1));
    }

    return { leftSideList, rightSideList };
}

module.exports = { readFileContent, extractsSides };
