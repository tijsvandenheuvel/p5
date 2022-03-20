// source: https://www.youtube.com/watch?v=FWSR_7kZuYg
// Coding Challenge #85: The Game of Life - The Coding Train

function get2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < cols; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

let grid;
let rows
let cols
let res = 10;

function setup() {
	createCanvas(windowWidth*0.97, windowHeight*0.97);
	cols = floor(width / res);
	rows = floor(height / res);
	grid = get2DArray(cols, rows);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = floor(random(2));
		}
	}
}

function renderGrid(){
    background(0);
    for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
            let x = i*res;
            let y = j*res;

            if(grid[i][j]==1){
                fill(255);
                stroke(0);
                rect(x, y, res-1, res-1);
            }
		}
	}
}

function countNeighbors(grid,i,j){
    let sum = 0;
    sum += (grid[i-1]??0)[j-1]??0;
    sum += (grid[i-1]??0)[j]??0;
    sum += (grid[i-1]??0)[j+1]??0;
    sum += (grid[i]??0)[j-1]??0;
    sum += (grid[i]??0)[j+1]??0;
    sum += (grid[i+1]??0)[j-1]??0;
    sum += (grid[i+1]??0)[j]??0;
    sum += (grid[i+1]??0)[j+1]??0;
    return sum;
}

function updateGrid(){
    let next = get2DArray(cols,rows);
    for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
            let neighbors = countNeighbors(grid,i,j);
            let state = grid[i][j];

            if(state==0 && neighbors==3){
                next[i][j] = 1;
            }
            else if(state==1 && (neighbors<2||neighbors>3)){
                next[i][j] = 0;
            }
            else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

function draw() {
    if (frameCount % 5 == 0) {
        renderGrid();
        updateGrid();
    }
}
