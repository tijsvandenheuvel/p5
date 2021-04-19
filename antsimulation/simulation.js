var lifespan = 200;
var lifeP;
var count = 0;

var maxforce = 0.5;
var maxspeed = 3;
var pop_size = 150;

var runsim=true;

function myCheckedEvent() {
  if (this.checked()) {runsim=true;} else {runsim=false;}
}

function setup(){

    fps = frameRate();

    
    checkbox = createCheckbox('run', true);
    checkbox.changed(myCheckedEvent);

    screenHeight = windowHeight-75
    screenWidth = windowWidth-30
    createCanvas(screenWidth,screenHeight);

    lifeP = createP();
 
    ant_population = new AntPopulation(pop_size,maxspeed,maxforce);

    foodObject = new FoodObject(50);
    colonyObject = new ColonyObject(50);

    particles = [];
}

function draw(){
    if(runsim){
        background(0);

        push()
            fill(255);
            stroke(0);
            text("FPS: " + fps.toFixed(2), 10, height - 10);
        pop()
        
        particles = particles.filter((particle)=>{ 
            return particle.age>100;
        });

        for(i=0;i<particles.length;i++){
            particles[i].show();
        }
        updatePixels();

        ant_population.run();

        foodObject.show();
        colonyObject.show();

        lifeP.html(count);
        count++;
    }
}
    
function mousePressed() {
    mx = mouseX
    my = mouseY
    mV = createVector(mx,my)

    //console.log(mx,my)
    console.log(mouseX,mouseY)
    
}

function FoodObject(size) {

    this.size = 40;
    this.pos = createVector(random(screenWidth/2+size,screenWidth-size),random(size,screenHeight-size))

    this.show = () => {
        push();
            fill(0,255,0);
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        pop();
    }
}
function ColonyObject(size) {

    this.size = 40;
    this.pos = createVector(screenWidth/2,screenHeight/2)

    this.show = () => {
        push();
            fill(255,255,0);
            ellipse(this.pos.x,this.pos.y,this.size,this.size);
        pop();
    }
}