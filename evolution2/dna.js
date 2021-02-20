function DNA(genes){

    if(genes){
        this.genes = genes;
    }else{
        let maxspeed= random(10);
        let maxforce = random(1);
        this.genes = [maxspeed,maxforce];
        // for(var i=0;i<lifespan;i++){
        //     this.genes[i]=p5.Vector.random2D();
        //     this.genes[i].setMag(maxforce);
        // }
    }
   
    this.crossOver= function(partner){
        let newgenes =[];
        let singleGeneOrigin=false; 

        // take each gene from one parent
        if(singleGeneOrigin){
            var mid = floor(random(this.genes.length));
            for(var i=0;i<this.genes.length;i++){
                if(random(1) < 0.5){
                    newgenes[i]=this.genes[i];
                }else{
                    newgenes[i]=partner.genes[i];
                }
            }
        }else{
            for(var i=0;i<this.genes.length;i++){
                newgenes[i]=(this.genes[i]+partner.genes[i])/2
            }
        }
        return new DNA(newgenes)
    }
    this.mutation=function(){
        let vectorgenes=false

        if(vectorgenes){
            for(var i=0;i<this.genes.length;i++){
                if(random(1)<0.01){
                    this.genes[i]=p5.Vector.random2D();
                    this.genes[i].setMag(maxforce);
                    
                }
            }
        }else{
            if(random(1)<0.01){
                this.genes[0]=random(5);
            }
            if(random(1)<0.01){
                this.genes[1]=random(0.5);
            }
        }
        
    }
}