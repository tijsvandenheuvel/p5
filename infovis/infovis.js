var data;

var wordpos = [];

var input;

var counter  = 2 ; 

function preload(){
    //data = loadJSON('https://tijsvandenheuvel.github.io/infovis/data.json')
    data = loadJSON('data.json')

}
function setup(){

    let inputsize = 200

    let inp = createInput('');
    inp.position(10, 10);
    inp.size(inputsize);
    inp.input(myInputEvent);

    button = createButton('vis');
    button.position(inputsize+20,12);
    button.mousePressed(visInput);

    button2 = createButton('all');
    button2.position(inputsize+64,12);
    button2.mousePressed(allWordsInStruct);

    button3 = createButton('none');
    button3.position(inputsize+105,12);
    button3.mousePressed(resetTree);

    screenHeight = windowHeight-30
    screenWidth = windowWidth-30
    createCanvas(screenWidth,screenHeight);

    middleX = screenWidth/2
    middleY = screenHeight/2

    // spacing x slider
    slider = createSlider(20, 100, 50); // min, max, start
    slider.position(screenWidth-200,10); // x and y
    slider.size(200, 20);
    slider.input(updateSpacing);

    // spacing y slider
    slider2 = createSlider(20, 200, 50); // min, max, start
    slider2.position(screenWidth-200,30); // x and y
    slider2.size(200, 20);
    slider2.input(updateSpacing);

    // size slider
    slider3 = createSlider(1, 100, 20); // min, max, start
    slider3.position(screenWidth-200,50); // x and y
    slider3.size(200, 20);
    //slider3.input(updateSpacing);


    //words = new Words(data[0]['text']);

    wordstructure = new AdvancedWordStructure(data[0]['text']);

}

function draw(){

    if(frameCount%50==0){
        background(25);

        push();
            fill(200,200,200)
            rect(screenWidth-110, 5, 220, 120);
        pop();
        wordstructure.show(slider3.value());
    }
}

function keyPressed() {
    if(keyCode==32){
        wordstructure.createLinkedList(wordstructure.listofwordstrings.slice(0, counter));
        wordstructure.createLinkedListPositions(100,50,20);
        counter++;
    }
  }

function updateSpacing(){
    wordstructure.createLinkedListPositions(slider.value(),slider2.value())
}

function myInputEvent(){
    //console.log('you are typing: ', this.value());
    input = this.value();
}

function allWordsInStruct(){
	wordstructure.createLinkedList(wordstructure.listofwordstrings);
	wordstructure.createLinkedListPositions(100,50,20);
    counter=2;
}

function resetTree(){
    wordstructure.createLinkedList([wordstructure.listofwordstrings[0]]);
	wordstructure.createLinkedListPositions(100,50,20);
    counter=2;
}



visInput = () => {

    var stringstring = input.split(" ");

    words = stringstring

    getWordPositions()

    for(i=0;i<stringstring.length;i++){
        //console.log(stringstring[i]);
    }
}




