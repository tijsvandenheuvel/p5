leafEnds = () =>{
    tree.addLeafToEnds()
  }

growAll = () =>{
    tree.growAll()
}

leafSome = () =>{
    tree.addLeafToRandom()
}

createButtons = () => {
    button = createButton('leaf ends');
    button.position(screenWidth+10, 10);
    button.mousePressed(leafEnds);  

    button = createButton('leaf some');
    button.position(screenWidth+10, 30);
    button.mousePressed(leafSome); 

    button = createButton('grow all');
    button.position(screenWidth+10, 50);
    button.mousePressed(growAll); 

    radio = createRadio();
    radio.position(screenWidth+10, 70);
    radio.option('add');
    radio.option('delete');
    radio.option('select');
    radio.option('leaf');
    radio.value('add')
    radio.style('width', '60px');
}