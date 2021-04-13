setup = () => {
    screenHeight = windowHeight-20
    screenWidth = windowWidth*2/3
    createCanvas(screenWidth,screenHeight , WEBGL);

    baseWidth = 40;
    baseLength = 80;
    amount = 0;

    tree = new Tree(baseWidth,baseLength,amount)

    button = createButton('leaf ends');
    button.position(screenWidth+10, 10);
    button.mousePressed(leafEnds);  

    button = createButton('grow all');
    button.position(screenWidth+10, 30);
    button.mousePressed(growAll); 

    radio = createRadio();
    radio.position(screenWidth+10, 50);
    radio.option('add');
    radio.option('delete');
    radio.option('select');
    radio.option('leaf');
    radio.value('add')
    radio.style('width', '60px');
}

draw = () => {
    background(100,250,250,150);
    stroke(255);

    tree.update();
}




