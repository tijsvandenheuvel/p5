function Vehicle(lifespan,dna,pos,vel){

    // constructor
    if(dna){
         this.dna = dna;
     }else{
         this.dna = new DNA();
     }
     if(pos){
        this.pos = pos;
    }else{
        this.pos = createVector(random(0,width),random(0,height));
    }
    if(vel){
        this.vel = vel;
    }else{
        this.vel = createVector();
    }

    
    
    this.acc = createVector();

    this.health = 255;
    this.maxspeed = this.dna.genes[0];
    this.maxforce = this.dna.genes[1];

    this.alive=true;
    this.crashed=false;


    this.applyForce = function(force){
        this.acc.add(force);
    }


    this.update = function(food){
        
        // check if found food
        let popsize = food.length;
        let mind = 100;
        let minid = 0;

        for (let i = 0; i < popsize; i++) {
            var d = dist(this.pos.x,this.pos.y,food[i].pos.x,food[i].pos.y);
            if(d<mind){
                mind = d;
                minid = i;
            }
            if(d<10){
                this.health +=50;
                food[i].eaten();
            }
        }

        // //check if crashed against wall
        // if(this.pos.x>width||this.pos.x<0){
        //     this.crashed=true;
        // }
        // if(this.pos.y>height||this.pos.y<0){
        //     this.crashed=true;
        // }

        //this.applyForce(this.dna.genes[count])

        this.seek(food[minid].pos);

        if(this.alive&&!this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(this.maxspeed);
        }

        // Die
        this.health-=(1+this.maxspeed);
        if(this.health<1){
            this.alive=false;
            food_population.addFoodParticle(this.pos);
        }

        // reproduce
        if(this.health>400){
            this.health-=255;
            agent_population.addVehicle(this.dna,this.pos,this.vel);
        }
        
    }

    // A method that calculates a steering force towards a target
    this.seek=function(target) {

        // target is nearest food 

        var desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target

        // Scale to maximum speed
        desired.setMag(this.maxspeed);

        // Steering = Desired minus velocity
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce); // Limit to maximum steering force

        this.applyForce(steer);
    }


    this.show = function(){
        push();
        noStroke();
        fill(this.dna.genes[2],this.dna.genes[3],this.dna.genes[4],this.health+50);
        
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,10+2*this.maxspeed,5);
        pop();
    }

    this.run = function(){
        this.update();
        this.show();
    }
    this.go = (popu) => {

        // Die
        this.health-=1;
        if(this.health<1){
            this.alive=false;
            food_population.addFoodParticle(this.pos);
        }

        let popsize = popu.length;
        let mind = 100;
        let minid = 0;

        for (let i = 0; i < popsize; i++) {
            var d = dist(this.pos.x,this.pos.y,popu[i].pos.x,popu[i].pos.y);
            // &&popu[i].dna.genes[2]>50&&popu[i].dna.genes[4]>50
            if(d<mind&&popu[i].dna.genes[3]<200){
                mind = d;
                minid = i;
            }
            if(d<10){
                this.health +=popu[i].health;
                popu[i].eaten();
            }
        }

        this.seek(popu[minid].pos);

        if(this.alive&&!this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(this.maxspeed);
        }


        push();
        noStroke();
        fill(255,0,0,this.health+50);
        
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,20,10);
        pop();

    }

    this.eaten = () => {this.alive=false}
}