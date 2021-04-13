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

        if(this.pos.x>screenWidth||this.pos.x<0){
            this.vel.x=-this.vel.x
        }
        if(this.pos.y>screenHeight||this.pos.y<0){
            this.vel.y=-this.vel.y
        }

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
            }
        }else{
            let d = dist(this.pos.x,this.pos.y,foodObject.pos.x,foodObject.pos.y);
            if(d<foodObject.size/2){
                this.foundFood=true;
            }
        }
        // follow particles if there are any
        if(particles.length>1){
            this.seek(this.getTarget(),this.maxforce)
        }

        if(this.foundFood==true){
            this.seek(colonyObject.pos,0.2)
        }
}

   

    // seek closest / strongest particle in front
    // if found food follow 'home' particles
    // if not found food follow 'away' particles
    // if not found follow home particles in reverse


    this.getTarget = () => {

        let mind = 100;
        let minid = 0;
        let d = 100;

        angle = this.vel.heading()
        frontpos = createVector(this.pos.x+20*cos(angle),this.pos.y+20*sin(angle))

        for (let i = 0; i < particles.length; i++) {

                if(!this.foundFood){
                    d = dist(frontpos.x,frontpos.y,particles[i].pos.x,particles[i].pos.y);
                    if(particles[i].toHome){
                        d=d*0.5;
                    }
                }
                else{
                    d=101;
                }

                
                

                // // you havent found food and find a to food marker
                // if((!this.foundFood&&!particles[i].toHome)){
                //     d = dist(frontpos.x,frontpos.y,particles[i].pos.x,particles[i].pos.y);
                // }
                // // you have found food and find a to home marker
                // else if(this.foundFood&&particles[i].toHome){
                //     d = dist(frontpos.x,frontpos.y,particles[i].pos.x,particles[i].pos.y);
                // }
                // // you have found food and find a to food marker
                // else if(this.foundFood&&!particles[i].toHome){
                //     d = 100;
                // }
                // else{
                //     d = 100
                // }
                
                if(d<mind){
                    mind = d;
                    minid = i;
                }
        }
        if(mind<20){
            return particles[minid].pos
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

    // show path
    for(i=0;i<this.path.length;i++){
        this.path[i].show();
    }

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