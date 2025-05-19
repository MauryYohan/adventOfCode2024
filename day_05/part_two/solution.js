import { readFileContent } from "../utils.js";
const pattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g;
const matches = [];
let results = [];
let interuptor = true;
let counter = 0;

const memories = readFileContent('input/data.txt');

console.log("Début de traitement");
console.log("--------------------------------------------------");

for (const memory of memories) {
    for (const line of memory) {
        matches.push(line.matchAll(pattern));
    }
}

for (const match of matches) {
    for (const m of match) {
        counter += 1;
        const [elm, x, y] = m;
        if (elm === "do()") {
            interuptor = true;
            continue;
        } else if (elm === "don't()") {
            interuptor = false;
        }
        console.log(`[${counter}] - ${elm} - ${x} - ${y} - ${interuptor}`);
        if (interuptor === true) {
            const result = x * y;
            results.push(result);
        }
    }
}

console.log("Résultats : ", results.reduce((acc, curr) => {
    return acc + curr;
}, 0));

// END
console.log("--------------------------------------------------");
console.log("Fin de traitement");
