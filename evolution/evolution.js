var population;
var lifespan = 400;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;
var generation = 0 ;

//hitbox objects to avoid
var rx = 400;
var ry = 270;
var rw = 500;
var rh= 20;

var r2x = 0;
var r2y = 450;
var r2w = 500;
var r2h= 20;

function setup(){
    createCanvas(900,700);
    rocket = new Rocket();
    population = new Population(200);
    lifeP = createP();
    target =createVector(width/2,50);
}

function draw(){
    background(0);
    population.run();
    lifeP.html(count);

    count++;
    if(count==lifespan){
        population.evaluate();
        population.selection();
        count=0;
        generation++;
    }

    //objects to avoid
    fill(255)
    rect(rx,ry,rw,rh);
    rect(r2x,r2y,r2w,r2h);

    //target
    ellipse(target.x,target.y,30,30);
}

function Population(size){
    this.rockets=[];
    this.popsize=size;
    this.matingPool=[];
    this.bestid=0;
    for(var i=0;i<this.popsize;i++){
        this.rockets[i]=new Rocket();
    }

    this.run = function(){
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
    this.evaluate = function(){

        // calculate max fitness to normalize
        var maxfit = 0;
        
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].calcFitness();
            if(this.rockets[i].fitness>maxfit){
                maxfit = this.rockets[i].fitness;
                bestid = i;
            }
        }
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].fitness/=maxfit;
        }

        //console.log((this.rockets[0].fitness*100)**2,(this.rockets[0].fitness*100),100*1.1**(this.rockets[0].fitness*10))
        //console.log(this.rockets[0].fitness)
        // fill matingpool with more rockets with good fitness
        this.matingPool=[];
        for(var i=0;i<this.popsize;i++){
            var n;
            //if good enough
            if(this.rockets[i].fitness>0.2){
                n = (this.rockets[i].fitness*100)**2;
            }else{
                n = 1;
            }
            for(var j =0;j<n;j++){
                this.matingPool.push(this.rockets[i]);
            }  
        }

        console.log("generation",generation,"maxfit",maxfit,"mating pool size",this.matingPool.length);
    }
    this.selection = function(){
        var newRockets=[];
        for(var i=0;i<this.popsize;i++){
            // always crossover with best ?
            var parentA = random(this.matingPool).dna;
            var parentB = random(this.matingPool).dna;
            var child = parentA.crossOver(parentB);
            child.mutation();
            newRockets[i]=new Rocket(child);
        }
        this.rockets = newRockets;
    }
}

function DNA(genes){

    if(genes){
        this.genes = genes;
    }else{
        this.genes = [];
        for(var i=0;i<lifespan;i++){
            this.genes[i]=p5.Vector.random2D();
            this.genes[i].setMag(maxforce);
        }
    }
   
    this.crossOver= function(partner){
        var newgenes =[];
        var mid = floor(random(this.genes.length));
        for(var i=0;i<this.genes.length;i++){
            if(random(1) < 0.5){
                newgenes[i]=this.genes[i];
            }else{
                newgenes[i]=partner.genes[i];
            }
        }
        return new DNA(newgenes)
    }
    this.mutation=function(){
        for(var i=0;i<this.genes.length;i++){
            if(random(1)<0.01){
                this.genes[i]=p5.Vector.random2D();
                this.genes[i].setMag(maxforce);
            }
        }
    }
}

function Rocket(dna){

    if(dna){
        this.dna = dna;
    }else{
        this.dna = new DNA();
    }

    this.pos = createVector(width/2,height);
    this.vel = createVector();
    this.acc = createVector();
    this.fitness=0;
    this.completed=false;
    this.crashed=false;
    this.timeFactor=lifespan;

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.calcFitness = function(){
        console.log(this.timeFactor)
        var d = dist(this.pos.x,this.pos.y,target.x,target.y);

        this.fitness = map(d,0,width,width,0);
        if(this.completed){
            this.fitness*=(lifespan-this.timeFactor);
        }
        if(this.crashed){
            this.fitness/=10;
        }
    }


    this.update = function(){

        var d = dist(this.pos.x,this.pos.y,target.x,target.y);
        if(d<20&&!this.completed){
            this.completed=true;
            this.timeFactor=count;
            this.pos=target.copy();
        }

        if(this.pos.x>rx&&this.pos.x<rx+rw&&
            this.pos.y>ry&&this.pos.y<ry+rh){
                this.crashed=true;
        }
        if(this.pos.x>r2x&&this.pos.x<r2x+r2w&&
            this.pos.y>r2y&&this.pos.y<r2y+r2h){
                this.crashed=true;
        }

        
        if(this.pos.x>width||this.pos.x<0){
            this.crashed=true;
        }
        if(this.pos.y>height||this.pos.y<0){
            this.crashed=true;
        }

        this.applyForce(this.dna.genes[count])
        if(!this.completed&&!this.crashed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    this.show = function(){
        push();
        noStroke();
        fill(255,150);
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0,0,30,10);
        pop();
    }
}