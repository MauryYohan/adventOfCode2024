import { readFileContent } from "../utils.js";
// 2685 is the correct answer.

/** Fonction qui permet de créer la grille de caractères à partir du fichier texte.
 * @param {Array} lines
 * @returns {Array} grid
 */
function createGrid() {
    for (const line of lines) {
        let theString = line[0].split('');
        grid.push(theString.map((char) => char));
    }
}

function followPath(depart_x, depart_y, x, y, char) {
    let path = [[depart_x, depart_y]];
    let current_x = depart_x;
    let current_y = depart_y;
    while (current_x !== x && current_y !== y) {
        if (current_x < x) {
            current_x++;
            path.push([current_x, current_y]);
        }
        if (current_x > x) {
            current_x--;
            path.push([current_x, current_y]);
        }
        if (current_y < y) {
            current_y++;
            path.push([current_x, current_y]);
        }
        if (current_y > y) {
            current_y--;
            path.push([current_x, current_y]);
        }
    }
    console.log("Path: ", path);
    return path;
}

function checkDirection(depart_x, depart_y, directions) {
    for (let i = 0; i < directions.length; i++) {
        console.log("Direction: ", directions[i]);
        const x = directions[i][0];
        const y = directions[i][1];
        if (grid[x][y] === "M") {
            console.log("M trouvé à la position : ", x, y);
            followPath(depart_x, depart_y, x, y, "M");
        }
        if (grid[x][y] === "A") {
            console.log("A trouvé à la position : ", x, y);
            followPath(depart_x, depart_y, x, y, "A");
        }
        if (grid[x][y] === "S") {
            wordsFound += 1;
        }
    }
    return void 0;
}

/**
 * Fonction qui permet de verifier si une des cases adjacentes à la case actuelle contient le caractère recherché. 
 * Utilisable uniquement pour le caractère "M", puisqu'ensuite, on doit rester sur une ligne droite.
 * @param {Number} x 
 * @param {Number} y 
 * @param {String} char 
 * @returns
 */
const casesAdjacentes = (x, y, char) => {
    const directions = [];
    // on commence à minuit = 0 ⬆ (si x > 0)
    if (x > 0) { 
        console.log(`⬆ Cette position contient la lettre ${grid[x-1][y]}, nous cherchons ${char}`);
        if (grid[x-1][y] === char) {
            directions.push([x-1, y]); 
        }
    }
    // ↗  (si x > 0 && y < grid[0].length - 1) => [x][y]
    if (x > 0 && y < grid[0].length - 1) { 
        console.log(`↗ Cette position contient la lettre ${grid[x-1][y+1]}, nous cherchons ${char}`);
        if (grid[x-1][y+1] === char) {
            console.log(`${char} trouvé à la position : ${x-1}, ${y+1})`);
            directions.push([x-1, y+1]);
        }
    }
    // -> (si y < grid[0].length - 1)
    if (y < grid[0].length - 1) { 
        console.log(`-> Cette position contient la lettre ${grid[x][y+1]}, nous cherchons ${char}`);
        if (grid[x][y+1] === char) {
            directions.push([x, y+1]);
        }
    }
    // ↘  (si x < grid.length - 1 && y < grid[0].length - 1))
    if (x < grid.length - 1 && y < grid[0].length - 1) { 
        console.log(`↘ Cette position contient la lettre ${grid[x+1][y+1]}, nous cherchons ${char}`);
        if (grid[x+1][y+1] === char) {
            directions.push([x+1, y+1]);
        }
    }

    // ⬇  (si x < grid.length - 1)
    if (x < grid.length - 1) { 
        console.log(`⬇ Cette position contient la lettre ${grid[x+1][y]}, nous cherchons ${char}`);
        if (grid[x+1][y] === char) {
            directions.push([x+1, y]);
        }
    }
    

    // ↙  (si x < grid.length - 1 && y > 0)
    if (x < grid.length - 1 && y > 0) { 
        console.log(`↙ Cette position contient la lettre ${grid[x+1][y-1]}, nous cherchons ${char}`);
        if (grid[x+1][y-1] === char) {
            directions.push([x+1, y-1]);
        }
    }

    // <- (si y > 0)
    if (y > 0) { 
        console.log(`<- Cette position contient la lettre ${grid[x][y-1]}, nous cherchons ${char}`);
        if (grid[x][y-1] === char) {
            directions.push([x, y-1]);
        }
    }

    // ↖ (si x > 0 && y > 0)
    if (x > 0 && y > 0) { 
        console.log(`↖ Cette position contient la lettre ${grid[x-1][y-1]}, nous cherchons ${char}`);
        if (grid[x-1][y-1] === char) {
            directions.push([x-1, y-1]);
        }
    }

    console.log("Directions: ", directions);
    
    return checkDirection(x, y, directions);
}


console.log("Début de traitement");
console.log("--------------------------------------------------");

const lines = readFileContent('input/data-test.txt');
let grid = [];
let wordsFound = 0;

createGrid();

// On parcours la grid pour chercher une occurence de "X"
  // Si on trouve, on verifie les directions possibles :
    // - Si on trouve un "M" dans une direction, on marque la case comme visit
// Si on trouve un "X", on verifie les directions possibles.
// Si on trouve un "M", on verifie les directions possibles.
// Si on trouve un "A", on verifie les directions possibles.
// Si on trouve un "S", on ajoute 1 au nombre de mots trouvés.
// On continue jusqu'à la fin de la grid.
for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
        if(grid[x][y] === 'X') {
            // On verifie les directions possibles
            console.log("X trouvé à la position : ", x, y);
            console.log("--------------------------------------------------");
            console.log("Vérification des directions possibles");
            console.log("--------------------------------------------------");
            console.log("Directions: ", casesAdjacentes(x, y, 'M'));
            console.log("--------------------------------------------------");
            console.log("Nombre de mots trouvés: ", wordsFound);
            process.exit(0);
            /*
            if(casesAdjacentes(x, y, 'M')) {
                if(casesAdjacentes(x, y, 'A')) {
                    if(casesAdjacentes(x, y, 'S')) {
                        wordsFound += 1;
                    }
                }
            }
            */
        }                 
    }
}

// END
console.log('Grid : ', grid);
console.log("--------------------------------------------------");
console.log("Fin de traitement");
console.log("--------------------------------------------------");