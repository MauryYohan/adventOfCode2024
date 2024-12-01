import { readFileContent, extractsSides } from '../utils.js';


const oneListBeforeResult = [];
const numbers = readFileContent('input/data.txt');

const { leftSideList, rightSideList } = extractsSides(numbers);

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