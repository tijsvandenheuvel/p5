var population;
var lifespan = 200;
var lifeP;
var count = 0;
var maxforce = 0.5;
var generation = 0;
var history=[];

var runsim = false;
var initsim = true;
var predator = false;

function myCheckedEvent() {
  if (this.checked()) {runsim=true;} else {runsim=false;}
}
function myCheckedEvent2() {
    if (this.checked()) {predator=true;} else {predator=false;}
  }

function setup(){
    createCanvas(750,700);

    checkbox = createCheckbox('run sim', false);
    checkbox.changed(myCheckedEvent);
    checkbox.position(10, 10);

    checkbox2 = createCheckbox('predator', false);
    checkbox2.changed(myCheckedEvent2);
    checkbox2.position(80, 10);


    //rocket = new Vehicle(lifespan);
    let pop_size = 50;
    agent_population = new Population(pop_size,lifespan);

    let food_size = 100;
    food_population = new FoodPopulation(food_size);

    lifeP = createP();
    //target =createVector(width/2,50);

    bigBos = new Vehicle(500,new DNA([5,3]));
}

function draw(){
	if (initsim | runsim) {
		initsim = false;

        background(0);
        

        //rocket.run();
        agent_population.run(food_population.food);
        food_population.run();
        if(predator){
            bigBos.go(agent_population.rockets);
        }
        
    
        //lifeP.html(count);
        
    
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

            //console.log("gen",generation,"agents",alive_vehicles,"food",alive_food,'speed',avg_speed,'force',avg_force,'health',avg_health);
            console.log('bigbos',bigBos.health,'agents',alive_vehicles,'speed',avg_speed
            )
            history[generation]=[alive_vehicles,alive_food,avg_speed,avg_force,avg_health];
    
            //agent_population.reproduce();
            count=0;
            generation++;
    
        }
        rect(3,3,150,20)
        //objects to avoid
        //(255)
        //rect(rx,ry,rw,rh);
        //rect(r2x,r2y,r2w,r2h);
    
        //target
        //ellipse(target.x,target.y,30,30);
    }
}
    