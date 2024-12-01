import { readFileContent, extractsSides } from '../utils.js';

const sortList = (list) => {
    return list.sort((a, b) => a - b);
}


const oneListBeforeResult = [];
const numbers = readFileContent('input/data.txt');

const { leftSideList, rightSideList } = extractsSides(numbers);

const leftSorted = sortList(leftSideList);
const rightSorted = sortList(rightSideList);

for (let i = 0; i < leftSorted.length; i++) {
    oneListBeforeResult.push(Math.abs(leftSorted[i] - rightSorted[i]));
}

const result = oneListBeforeResult.reduce((acc, curr) => {
    return acc + curr;
})

console.log(result);