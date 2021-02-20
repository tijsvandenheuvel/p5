var population;
var lifespan = 200;
var lifeP;
var count = 0;
var maxforce = 0.5;
var generation = 0;
var history=[];

var runsim=true;

function myCheckedEvent() {
  if (this.checked()) {runsim=true;} else {runsim=false;}
}

function setup(){
    checkbox = createCheckbox('run', true);
    checkbox.changed(myCheckedEvent);

    createCanvas(800,650);
    //rocket = new Vehicle(lifespan);
    let pop_size = 200;
    agent_population = new Population(pop_size,lifespan);

    let food_size = 1;
    food_population = new FoodPopulation(food_size);

    lifeP = createP();
    //target =createVector(width/2,50);
}

function draw(){
    if(runsim){
        background(0);

        //rocket.run();
        agent_population.run(food_population.food);
        food_population.run();
    
        lifeP.html(count);
        
    
        count++;
        if(count==lifespan){
    
            alive_vehicles = agent_population.rockets.filter(item => item.alive !== false).length
            alive_food = food_population.food.filter(item => item.alive !== false).length

            avg_speed=0;
            avg_force=0;
            avg_health=0;
            agent_population.rockets.forEach(function (rocket, index) {
                avg_speed+=rocket.maxspeed
                avg_force+=rocket.maxforce
                avg_health+=rocket.health
            });
            avg_speed/=alive_vehicles
            avg_force/=alive_vehicles
            avg_health/=alive_vehicles

            avg_speed=nf(avg_speed,1,2)
            avg_force=nf(avg_force,1,2)
            avg_health=nf(avg_health,1,2)

            console.log("gen",generation,"agents",alive_vehicles,"food",alive_food,'speed',avg_speed,'force',avg_force,'health',avg_health);
            history[generation]=[alive_vehicles,alive_food,avg_speed,avg_force,avg_health];
    
            agent_population.reproduce();
            count=0;
            generation++;
    
        }
    
        //objects to avoid
        //(255)
        //rect(rx,ry,rw,rh);
        //rect(r2x,r2y,r2w,r2h);
    
        //target
        //ellipse(target.x,target.y,30,30);
    }
}
    