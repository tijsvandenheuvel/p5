function Ant(id,maxspeed,maxforce,pos,vel){

    this.id = id
    this.maxspeed = maxspeed
    this.maxforce = maxforce

    this.foundFood = false;

    // constructor
    if(pos){
       this.pos = pos;
   }else{
        //this.pos = createVector(random(0,screenWidth),random(0,screenHeight));
        this.pos = createVector(screenWidth/2,screenHeight/2);
   }
   if(vel){
       this.vel = vel;
   }else{
        this.vel = createVector();
   }

   this.acc = createVector();

   this.alive = true;
   this.crashed = false;

   this.path = [];

   this.applyForce = function(force){
    this.acc.add(force);
    }

    // this.randomForce = () => {
    //     noiseVal = noise(frameCount*this.id)
    //     if(frameCount%100==0){
    //         console.log(noiseVal)
    //     }
        
    //     return createVector(this.maxforce*noiseVal*2-1,this.maxforce*noiseVal*2-1)
    // }

    this.randomForce = () => {
        return createVector(random(-this.maxforce,this.maxforce),
                            random(-this.maxforce,this.maxforce))
    }

    this.update = () =>{

        this.applyForce(this.randomForce());

        if(this.alive&&!this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(this.maxspeed);
        }

        // // bounce against walls
        // if(this.pos.x>screenWidth||this.pos.x<0){
        //     this.vel.x=-this.vel.x
        // }
        // if(this.pos.y>screenHeight||this.pos.y<0){
        //     this.vel.y=-this.vel.y
        // }

        // // infinite space
        // if(this.pos.x>screenWidth){ this.pos.x = 0 }
        // if(this.pos.x<0){ this.pos.x = screenWidth}
        // if(this.pos.y>screenHeight){ this.pos.y = 0 }
        // if(this.pos.y<0){ this.pos.y = screenHeight}


        // just walls
        if(this.pos.x>screenWidth){ this.pos.x = screenWidth; this.vel = createVector() }
        if(this.pos.x<0){ this.pos.x = 0}
        if(this.pos.y>screenHeight){ this.pos.y = screenHeight; this.vel = createVector() }
        if(this.pos.y<0){ this.pos.y = 0; this.vel = createVector()}



        if(frameCount%10==0){
            this.addPosToPath();

            this.path = this.path.filter((particle)=>{ 
                return particle.age>100;
            });
        }

        if(this.foundFood){
            let d = dist(this.pos.x,this.pos.y,colonyObject.pos.x,colonyObject.pos.y);
            if(d<colonyObject.size/2){
                this.foundFood=false;
                this.vel = createVector();
            }
        }else{
            let d = dist(this.pos.x,this.pos.y,foodObject.pos.x,foodObject.pos.y);
            if(d<foodObject.size/2){
                this.foundFood=true;
            }
        }


        if(this.foundFood==true){
            this.seek(colonyObject.pos,0.2)
        }
        // follow particles if there are any
        // max force = 0.5
        if(particles.length>1){
            let target = this.getTarget()
            if(target){
                if(target.toHome){
                    this.seek(target.pos,this.maxforce*(target.age/255))
                }else{
                    this.seek(target.pos,this.maxforce*(target.age/255)*2)
                }
                
            }
        }

        
}

// get direction by where the most feromones are

    this.getTarget = () => {

        let mind = 100;
        let minid = 0;
        let d = 100;

        angle = this.vel.heading()
        frontpos = createVector(this.pos.x+20*cos(angle),this.pos.y+20*sin(angle))

        for (let i = 0; i < particles.length; i++) {

            // if found food just go home
            if(this.foundFood&&!particles[i].toHome){
                d=101;
            }

            // if found food just go home
            if(this.foundFood&&particles[i].toHome){
                d = dist(frontpos.x,frontpos.y,particles[i].pos.x,particles[i].pos.y);
            }
            // if not found food follow to food particles
            else if(!this.foundFood&&!particles[i].toHome){
                d = dist(frontpos.x,frontpos.y,particles[i].pos.x,particles[i].pos.y);
            }
            // else follow to home particles
            else if(!this.foundFood&&particles[i].toHome){
                d = dist(frontpos.x,frontpos.y,particles[i].pos.x,particles[i].pos.y)*0.5;

            }
            else{
                d=101;
            }
                
                if(d<mind){
                    mind = d;
                    minid = i;
                }
        }
        if(mind<20){
            return particles[minid]
        }
        
    }

    this.seek = (target,force) => {
        if(target){
            // vector: location -> target
            var desired = p5.Vector.sub(target, this.pos);

            desired.setMag(this.maxspeed);

            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(force);

            this.applyForce(steer);
        }
    }


   this.show = () => {

    // show self
    push();
        noStroke();

        fill(255,255,255);
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,6,3);
    pop();

   }

    this.run = () => {
        this.update();
        this.show();
    }

    this.addPosToPath = () => {
        let  age = 255;
         if(this.foundFood==true){
             this.path.push(new Particle(createVector(this.pos.x,this.pos.y),age,true))
         }else{
             this.path.push(new Particle(createVector(this.pos.x,this.pos.y),age,false))
         }
     }

}