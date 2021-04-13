setup = () => {

    screenHeight = windowHeight-20
    screenWidth = windowWidth*2/3
    createCanvas(screenWidth,screenHeight , WEBGL);

    wid = 20;
    len = 40;

    end = createVector(0,screenHeight/2-len)

    root = createVector(0,screenHeight/2)

    branches = [new Branch(root,end,wid)]
    for (i=0;i<5;i++){
        branches.push(branches[i].growBranch())
    }


    button = createButton('grow ends');
    button.position(screenWidth+10, 10);
    button.mousePressed(growEnds);  

    button = createButton('grow all');
    button.position(screenWidth+10, 30);
    button.mousePressed(growAll); 
}

draw = () => {
    background(50);
    stroke(255);


    branches = branches.filter((branch)=>{ 
        return branch.width > 1;
    });

    for (i=0;i<branches.length;i++){
        branches[i].showBranch();
    }


}

function mousePressed() {

    mx = mouseX-screenWidth/2
    my = mouseY-screenHeight/2

    mV = createVector(mx,my)

    minimal = 1000
    
    id = 0

    for (i=0;i<branches.length;i++){
        dist = branches[i].center.dist(mV)
        if (dist<minimal){
            id = i
            minimal = dist
        }
    }
    if(minimal < 50){
        branches.push(branches[id].growBranch()) 
    }
    return false;
  }

  function growEnds() {
    newBranches = []
    for (i=0;i<branches.length;i++){
        if(!branches[i].nextBranch){
            newBranches.push(branches[i].growBranch())
        }
    }
    branches = branches.concat(newBranches)
  }

  function growAll() {
    newBranches = []
    for (i=0;i<branches.length;i++){
        newBranches.push(branches[i].growBranch())
    }
    branches = branches.concat(newBranches)
  }