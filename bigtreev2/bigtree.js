setup = () => {

    screenHeight = windowHeight-20
    screenWidth = windowWidth*2/3
    createCanvas(screenWidth,screenHeight , WEBGL);

    baseWidth = 40;
    baseLength = 80;

    tree = new Tree(baseWidth,baseLength)

    createButtons();
}

draw = () => {
    background(100,250,250,150);
    stroke(255);

    tree.update();
}

function mousePressed() {

    mx = mouseX-screenWidth/2
    my = mouseY-screenHeight/2

    mV = createVector(mx,my)

    minimal = 1000
    
    id = 0

    for (i=0;i<tree.canopy.length;i++){
        dist = tree.canopy[i].center.dist(mV)
        if (dist<minimal){
            id = i
            minimal = dist
        }
    }
    if(minimal < 50){
        if(radio.value()==='add'){
            if(b = tree.canopy[id].growNewBranch()){
                tree.canopy.push(b);
            }
        }
        else if(radio.value()==='delete'){
            tree.removeBranch(tree.canopy[id])
        }
        else if (radio.value()==='select'){
            tree.canopy[id].selected = !tree.canopy[id].selected;
        }
        else if (radio.value()==='leaf'){
            if(leaf = tree.canopy[id].growLeaf()){
                tree.canopy.push(leaf);
            }
        }
        
    }
    return false;
  }

