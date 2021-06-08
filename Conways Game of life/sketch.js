function Make2dArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols, rows;
let resolution = 20;
let START = 1;
let PLAY = 2;
let gamestate = START;

function setup() {
    createCanvas(1000, 1000);
    cols = width / resolution;
    rows = height / resolution;
    grid = Make2dArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function draw() {
    background(151);

    

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            x = i * resolution;
            y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                rectMode(CENTER);
                rect(x, y, resolution - 2, resolution - 2);
            }
            if (grid[i][j] == 0) {
                fill(0);
                rectMode(CENTER);
                rect(x, y, resolution - 2, resolution - 2);
            }


            //rect(x, y, resolution - 1, resolution - 1);
        }
    }
    if (gamestate === PLAY) {
        let next = Make2dArray(cols, rows);

        //Compute next based on old array
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];

                //Count live neighbors
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);
                
                

                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                }
                else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                }else {
                    next[i][j] = state;
                }
                /*sum += grid[i-1][j];
                sum += grid[i][j - 1];
                sum += grid[i+1][j];
                sum += grid[i+1][j+1];
                sum += grid[i+1][j-1];
                sum += grid[i][j+1];
                sum += grid[i-1][j+1];
                sum += grid[i-1][j];*/
            }
        }


        grid = next;
    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum += grid[col][row];
        }
    }

    sum -= grid[x][y];
    return sum;
}
function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let d = dist(i * resolution, j * resolution, mouseX, mouseY);
            if (d < (resolution / 2)) {
                grid[i][j] = 1;
            }
        }
        
    }
}
function keyPressed() {
    if (keyCode == 32) {
        gamestate = PLAY;
    }
    if (keyCode === LEFT_ARROW) {
        gamestate = START;
    }
}