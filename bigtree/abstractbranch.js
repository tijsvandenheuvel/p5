class AbstractBranch {

    constructor(begin,end,width,parent) {
        
        this.parent = parent;
        this.begin = begin;
        this.end = end;
        this.width = width;

        
        this.nextBranches = [];
        this.dead = false;
        this.angle = 0;
        this.selected = false;
    
        }

    changeColor = () => {
        this.color = [255, 204, 0]
    }

}