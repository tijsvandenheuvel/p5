function Population(size,lifespan){
    this.rockets=[];
    this.popsize=size;
    this.matingPool=[];
    this.bestid=0;
    for(var i=0;i<this.popsize;i++){
        this.rockets[i]=new Vehicle(lifespan);
    }

    this.run = function(food){
        this.rockets = this.rockets.filter(item => item.alive !== false);
        this.popsize = this.rockets.length;
        for(var i=0;i<this.popsize;i++){
            this.rockets[i].update(food);
            this.rockets[i].show();
        }
    }

    this.reproduce= function(){
        
        //revive crashed ones
        for(var i=0;i<this.popsize;i++){
            if (this.rockets[i].crashed==true){
                this.rockets[i].pos = createVector(random(0,width),random(0,height));
                this.rockets[i].crashed=false;
            }        
        }

        this.evaluate()
        this.selection()

    }

    this.evaluate = function(){

        // calculate max fitness to normalize
        var maxhealth = 0;
        for(var i=0;i<this.popsize;i++){
            if(this.rockets[i].health>maxhealth){
                maxhealth = this.rockets[i].health;
                bestid = i;
            }
        }

        // fill matingpool with more rockets with good fitness
        this.matingPool=[];
        for(var i=0;i<this.popsize;i++){
            var n;
            //if good enough
            if(this.rockets[i].health>300){
                n = (this.rockets[i].health/100)**2;
            }else{
                n = 1;
            }
            for(var j =0;j<n;j++){
                this.matingPool.push(this.rockets[i]);
            }  
        }
    }

    this.selection = function(){
        let newRockets=[];
        // reproduce with mating pool 
        let newpopsize = this.rockets.filter(item => item.health > 300).length

        for(var i=0;i<this.popsize;i++){
            if(this.rockets[i].health>300){
                this.rockets[i].health-=300;
            }
        }

            for(let i=0;i<newpopsize;i++){
                // always crossover with best ?
                let parentA = random(this.matingPool).dna;
                let parentB = random(this.matingPool).dna;
                let child = parentA.crossOver(parentB);
                child.mutation();
                newRockets[i]=new Vehicle(lifespan,child);
            }
        
        
        this.rockets = this.rockets.concat(newRockets)
    }
}