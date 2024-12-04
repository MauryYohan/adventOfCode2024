There are two new instructions you'll need to handle:

 - The do() instruction enables future mul instructions.
 - The don't() instruction disables future mul instructions.

Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.

For example:

xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))

*ENABLE*
mul(2,4) => O
*DISABLE*
mul(5,5) => X
mul(11,8) => X
*ENABLE*
mul(8,5)

Résultat : (2*4) + (8*5) = 48

---

## Explications
`
const pattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g;
...
for (const match of matches) {
    for (const m of match) {
        console.log(m);
        const [_, a, b] = m;
        const result = a * b;
        results.push(result);
    }
}

Ici, la liste des elements qui sont retournés, correspondant au pattern :
- ["mul(2,4)", "2", "4", index: 1, input: "data-test.txt content", groups: undefined]
- ["don't()", undefined, undefined, index: 20, input: "data-test.txt content", groups: undefined]
- ["mul(5,5)", "5", "5", index: 28, input: "data-test.txt content", groups: undefined]
- ["mul(11,8)", "11", "8", index: 48, input: "data-test.txt content", groups: undefined]
- ["do()", undefined, undefined, index: 59, input: "data-test.txt content", groups: undefined]
- ["mul(8,5)", "8", "5", index: 64, input: "data-test.txt content", groups: undefined]
`