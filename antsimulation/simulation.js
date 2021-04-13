var lifespan = 200;
var lifeP;
var count = 0;

var maxforce = 0.5;
var maxspeed = 3;
var pop_size = 100;

var runsim=true;

function myCheckedEvent() {
  if (this.checked()) {runsim=true;} else {runsim=false;}
}

function setup(){
    

    checkbox = createCheckbox('run', true);
    checkbox.changed(myCheckedEvent);

    screenHeight = windowHeight-75
    screenWidth = windowWidth-30
    createCanvas(screenWidth,screenHeight);

    lifeP = createP();

    
    
    ant_population = new AntPopulation(pop_size,maxspeed,maxforce);

    //let food_size = 100;
    //particle_population = new ParticlePopulation(particle_size);

    
    //target =createVector(width/2,50);

    //bigBos = new Ant(500,new DNA([5,3]));

    //console.log(ant_population.ants[0])

    foodObject = new FoodObject(50);
    colonyObject = new ColonyObject(50);

    particles = [];
}

function draw(){
    if(runsim){
        background(0);

        //rocket.run();
        ant_population.run();
        //food_population.run();

        particles = particles.filter((particle)=>{ 
            return particle.age>100;
        });

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