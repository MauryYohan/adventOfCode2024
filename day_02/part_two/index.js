import { readFileContent } from "../utils.js";
let counterSafety = 0;

function checkSequenceSafety(levels) {
    // Check if a sequence is monotonic (increasing or decreasing)
    function isMonotonic(sequence) {
        const increasing = sequence.every((val, i, arr) => i === 0 || val > arr[i - 1]);
        const decreasing = sequence.every((val, i, arr) => i === 0 || val < arr[i - 1]);
        return increasing || decreasing;
    }

    // Check adjacent differences
    function validDifferences(sequence) {
        return sequence.every((val, i, arr) => i === 0 || Math.abs(val - arr[i - 1]) >= 1 && Math.abs(val - arr[i - 1]) <= 3);
    }

    // Check if the original sequence is valid
    if (isMonotonic(levels) && validDifferences(levels)) {
        return { safe: true, removedElement: null };
    }

    // Test removing one element at a time
    for (let i = 0; i < levels.length; i++) {
        const newSequence = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isMonotonic(newSequence) && validDifferences(newSequence)) {
            return { safe: true, removedElement: levels[i] };
        }
    }

    // If no valid sequence is found, return unsafe
    return { safe: false, removedElement: null };
}

// Read the input file
const levels = readFileContent('input/data.txt');
console.log("Début de traitement");

for (const level of levels) {
    const result = checkSequenceSafety(level).safe;

    if (result) { counterSafety++; }
}

console.log(`Nombre de séquences sûres : ${counterSafety}`);
