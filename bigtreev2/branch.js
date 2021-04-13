class Branch extends AbstractBranch{

    constructor(begin,end,width,parent) {
        super(begin,end,width,parent)

        this.color = [100,50,0];

        this.center = createVector((this.begin.x+this.end.x)/2,(this.begin.y+this.end.y)/2)
    }

    displayBranch =function(){
        if(this.selected){
            stroke(150,150,0);
        }else{
            stroke(this.color[0],this.color[1],this.color[2]);
        }

        strokeWeight(this.width);

        beginShape(LINES);
            vertex(this.begin.x,this.begin.y);
            vertex(this.end.x,this.end.y);
        endShape();
    }

    growNewBranch=function(){

        //angle 
        var dir = p5.Vector.sub(this.end,this.begin);

        if(this.nextBranches.length>0){
            if(random(0,1)>0.5){
                this.angle = this.nextBranches[0].angle + random(PI/6,PI/4)
            }else{
                this.angle = this.nextBranches[0].angle - random(PI/6,PI/4)
            }
            
        }else{
            this.angle = random(-PI/4,PI/4);
        }
        
        dir.rotate(this.angle);
        var newEnd = p5.Vector.add(this.end,dir);

        
        // width 
        if(this.nextBranches.length===0){
            var newBranch = new Branch(this.end,newEnd,this.width*0.5,this);
        }else{
            var newWidth = this.width
            for(i=0;i<this.nextBranches.length;i++){
                newWidth-=this.nextBranches[i].width
            }
            var newBranch = new Branch(this.end,newEnd,newWidth,this); 
        }        

        this.nextBranches.push(newBranch)
        return newBranch;
    }

    age = () => {

        //max width
        if(this.width < 2*baseWidth){
            
            // sum of children must be less than width of parent
            var availableWidth = this.parent.width + this.width
            this.parent.nextBranches.forEach(element => {
                availableWidth -= element.width
            });

        
            if(this.width<availableWidth) {
                if(this.selected){
                    this.width*=1.1
                }else{
                    // if small grow faster
                    this.width*=(1+this.width/availableWidth/10)
                    
                }
                
            }
           
        }
        
    }

    growLeaf = () =>{
        var newLeaf = new Leaf(this.end,this.end,20,this);

        this.nextBranches.push(newLeaf)
        return newLeaf;
    }

    isLeaf = ()=>{return false}

}