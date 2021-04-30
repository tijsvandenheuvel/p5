
function setup(){

    screenHeight = windowHeight-30
    screenWidth = windowWidth-30
    createCanvas(screenWidth,screenHeight);

    middleX = screenWidth/2
    middleY = screenHeight/2

}

function draw(){

    background(25);

    pos = createVector(middleX, middleY)
    drawWord('word',32,pos)


    pos = createVector(middleX, middleY/2)
    drawWord('hello word',100,pos)

    pos = createVector(middleX, middleY*3/2)
    drawWord('what is going on',50,pos)

}

drawWord = (text_string,text_size,pos) => {

    rectMode(CENTER)
    
    fill(200, 200, 200);
    rect(pos.x, pos.y, text_size*(0.6*text_string.length), text_size,10);

    textAlign(CENTER,CENTER);
    textSize(text_size);
    fill(100, 100, 200);
    text(text_string,pos.x,pos.y);
}