var data;

function preload(){
    data = loadJSON('https://tijsvandenheuvel.github.io/infovis/data.json')

}
function setup(){


    let inp = createInput('');
    inp.position(10, 10);
    inp.size(200);
    inp.input(myInputEvent);


    screenHeight = windowHeight-30
    screenWidth = windowWidth-30
    createCanvas(screenWidth,screenHeight);

    middleX = screenWidth/2
    middleY = screenHeight/2

    console.log(data[0])

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

    textSize(text_size);

    text_width = textWidth(text_string)

    rectMode(CENTER)
    fill(200,200,200)
    rect(pos.x, pos.y, text_width+10, text_size,10);

    textAlign(CENTER,CENTER);
    
    fill(100, 100, 200);
    text(text_string,pos.x,pos.y);

}

function myInputEvent() {
    console.log('you are typing: ', this.value());
  }

function loadData(dat){
    console.log(dat)
}