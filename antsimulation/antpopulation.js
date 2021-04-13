function AntPopulation(popsize,maxspeed,maxforce,colony_pos){

    this.ants=[];
    this.popsize=popsize;
    this.colony_pos = createVector(random(0,screenWidth),random(0,screenHeight))

    for(var i=0;i<this.popsize;i++){
        this.ants[i]=new Ant(i,maxspeed,maxforce);
        //this.ants[i]=new Ant(i,maxspeed,maxforce,this.colony_pos);
    }

    this.run = ()=> {
        this.popsize = this.ants.length;
        for(var i=0;i<this.popsize;i++){
            this.ants[i].update();
            this.ants[i].show();
        }
    }

}