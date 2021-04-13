class Leaf extends AbstractBranch{
    constructor(begin,end,width,parent) {
        super(begin,end,width,parent)

        this.color = [50,200,50];
        this.center = this.begin
        }

    displayBranch =function(){

        if(this.selected){
            stroke(150,150,0);
        }else{
            stroke(this.color[0],this.color[1],this.color[2]);
        }
        
        strokeWeight(this.width);

        beginShape(POINTS);
            vertex(this.begin.x, this.begin.y);
        endShape();
    }

    age = () => {
        if(this.width<=baseWidth*2){
            this.width*=1.05
        }else{
            this.parent.nextBranches = this.parent.nextBranches.filter((branch)=>{ 
                return branch !== this;
            })
            this.dead=true
        }
       

    }

    growLeaf = () =>{}
    growNewBranch = () =>{}

    isLeaf = ()=>{return true}

}