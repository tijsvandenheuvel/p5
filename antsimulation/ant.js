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
    if(particles.length>10){
        //this.seek(this.getTarget())
    }
   }

    // seek closest / strongest particle in front
    // if found food follow 'home' particles
    // if not found food follow 'away' particles
    
    //this.seek(createVector(random(0,screenWidth),random(0,screenHeight)));
    //this.seek(createVector(mouseX,mouseY));
    this.getTarget = () => {

        let mind = 100;
        let minid = 0;
        let d = 100;

        // TODO: only search in front 

        for (let i = 0; i < particles.length; i++) {

            //var direction = p5.Vector.sub(particles[i].pos, this.pos);

            //console.log(direction.heading(),this.pos.heading())

            //if(direction.x>0 && direction.y>0){
                if(this.foundFood&&particles[i].toHome){
                    d = dist(this.pos.x,this.pos.y,particles[i].pos.x,particles[i].pos.y);
                }
                if(!this.foundFood&&!particles[i].toHome){
                    d = dist(this.pos.x,this.pos.y,particles[i].pos.x,particles[i].pos.y);
                }else{
                    d = 100
                }
                
                if(d<mind){
                    mind = d;
                    minid = i;
                }
            //}
        }
        if(mind<30){
            return particles[minid].pos
        }
        
    }

    this.seek = (target) => {
        if(target){
            // vector: location -> target
            var desired = p5.Vector.sub(target, this.pos);

            desired.setMag(this.maxspeed);

            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce/10);

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