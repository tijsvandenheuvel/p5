function Ant(id,maxspeed,maxforce,pos,vel){

    this.constructor = () => {
        this.id = id
        this.maxspeed = maxspeed
        this.maxforce = maxforce
    
        this.foundFood = false;

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

    }

    this.constructor();

    this.update = () =>{

        this.applyForce(this.randomForce());

        if(this.alive&&!this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(this.maxspeed);
        }

        //this.bounceAgainstWalls() 
        //this.infiniteSpace()
        this.stopAtWalls();

        if(frameCount%10==0){
            this.updatePath();
        }

        if(this.foundFood){
            let d = dist(this.pos.x,this.pos.y,colonyObject.pos.x,colonyObject.pos.y);
            // is Home
            if(d<colonyObject.size/2){
                this.foundFood=false;
                this.vel = createVector();
            }
        }else{
            let d = dist(this.pos.x,this.pos.y,foodObject.pos.x,foodObject.pos.y);
            // is at food
            if(d<foodObject.size/2){
                this.foundFood=true;
                this.vel = createVector();
            }
        }


        if(this.foundFood==true){
            this.seek(colonyObject.pos,0.2)
        }
        // follow particles if there are any
        // max force = 0.5
        if(particles.length>1){
            let target = this.getTargetParticle()
            if(target){
                if(target.toHome){
                    this.seek(target.pos,this.maxforce*(target.age/255))
                }else{
                    this.seek(target.pos,this.maxforce*(target.age/255)*2)
                }
            }
        }  
    }

    // TODO: get direction by where the most feromones are
    this.getTargetParticle = () => {

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

    this.applyForce = (force) => {
        this.acc.add(force);
    }

    // TODO: random force only in direction of heading
    this.randomForce = () => {
        return createVector(random(-this.maxforce,this.maxforce),
                            random(-this.maxforce,this.maxforce))
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

    this.bounceAgainstWalls = () => {
        if(this.pos.x>screenWidth||this.pos.x<0){
            this.vel.x=-this.vel.x
        }
        if(this.pos.y>screenHeight||this.pos.y<0){
            this.vel.y=-this.vel.y
        }
    }

    this.infiniteSpace = () => {
        if(this.pos.x>screenWidth){ this.pos.x = 0 }
        if(this.pos.x<0){ this.pos.x = screenWidth}
        if(this.pos.y>screenHeight){ this.pos.y = 0 }
        if(this.pos.y<0){ this.pos.y = screenHeight}
    }

    this.stopAtWalls = () => {
        if(this.pos.x>screenWidth){ this.pos.x = screenWidth; this.vel = createVector() }
        if(this.pos.x<0){ this.pos.x = 0}
        if(this.pos.y>screenHeight){ this.pos.y = screenHeight; this.vel = createVector() }
        if(this.pos.y<0){ this.pos.y = 0; this.vel = createVector()}
    }

    this.updatePath = () => {
        // add to path
        let  age = 255;
        if(this.foundFood==true){
            this.path.push(new Particle(createVector(this.pos.x,this.pos.y),age,true))
        }else{
            this.path.push(new Particle(createVector(this.pos.x,this.pos.y),age,false))
        }

        //remove from path
        this.path = this.path.filter((particle)=>{ 
            return particle.age>100;
        });
    }

    this.show = () => {
        push();
            noStroke();
    
            fill(255,255,255);
            translate(this.pos.x,this.pos.y);
            rotate(this.vel.heading());
            rectMode(CENTER);
            rect(0,0,6,3);
        pop();
    }
}