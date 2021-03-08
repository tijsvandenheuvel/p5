function DNA(genes){

    if(genes){
        this.genes = genes;
    }else{
        let maxspeed= random(10);
        let maxforce = random(1);
        let r = random(255)
        let g = random(255)
        let b = random(255)
        
        this.genes = [maxspeed,maxforce,r,g,b];
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
            for(i=2;i<this.genes.length;i++){
                if(random(1)<0.10){
                    this.genes[i]=this.genes[i]+random(-20,+20)
                }
            }
            if(random(1)<0.02){
                this.genes[0]=(random(5)+this.genes[0])/2
            }
            if(random(1)<0.02){
                this.genes[1]=(random(0.5)+this.genes[1])/2
            }
            
        }
        
    }
}