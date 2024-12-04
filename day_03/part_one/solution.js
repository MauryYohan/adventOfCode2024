import { readFileContent } from "../utils.js";
const pattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
const matches = [];
let results = [];

const memories = readFileContent('input/data.txt');

console.log("Début de traitement");

for (const memory of memories) {
    for (const line of memory) {
        matches.push(line.matchAll(pattern));
    }
}

for (const match of matches) {
    for (const m of match) {
        const [_, a, b] = m;
        const result = a * b;
        results.push(result);
    }
}

console.log("Résultats : ", results.reduce((acc, curr) => {
    return acc + curr;
}, 0));

// END
console.log("--------------------------------------------------");
console.log("Fin de traitement");
