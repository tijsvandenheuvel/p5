class Tree{

    constructor(baseWidth,baseLength,amount){
        // location and low midpoint
        let rootPoint = createVector(0,screenHeight/2)
        let end = createVector(0,screenHeight/2-baseLength)

        //root without parent
        let root = new Branch(rootPoint,rootPoint,baseWidth*2)

        // first branch
        this.canopy = [new Branch(rootPoint,end,baseWidth,root)]

        // first leave
        this.canopy.push(new Leaf(this.canopy[0].end,this.canopy[0].end,20,this.canopy[0]))
    }

    update(){
        // remove too thin canopy
        this.canopy = this.canopy.filter((branch)=>{ 
            return branch.width > 1;
        });

        // remove dead branch
        this.canopy = this.canopy.filter((branch)=>{ 
            return !branch.dead;
        });

         // remove branches that are larger than parent
         this.canopy = this.canopy.filter((branch)=>{ 
            return branch.parent.width > branch.width||branch.isLeaf();
        });

        // remove leaves without parents
        this.canopy = this.canopy.filter((branch)=>{ 
            return this.canopy.includes(branch.parent)||!branch.isLeaf();
        });

        // draw canopy
        for (let i=0;i<this.canopy.length;i++){
            this.canopy[i].displayBranch();
        }

        // get bigger over time
        if(frameCount%100==0){
            for (let i=0;i<this.canopy.length;i++){
                this.canopy[i].age();
            }
        }
    }

    // activated by button
    addLeafToEnds() {
        let newLeaves = []
        for (let i=0;i<this.canopy.length;i++){
            if(this.canopy[i].nextBranches.length===0){
                let leaf = this.canopy[i].growLeaf()
                if(leaf){
                    newLeaves.push(leaf)
                }
            }
        }
        this.canopy = this.canopy.concat(newLeaves)
    }

    addLeafToRandom() {
        let newLeaves = []
        for (let i=0;i<this.canopy.length;i++){
            if(random(0,1)>0.5){
                let leaf = this.canopy[i].growLeaf()
                if(leaf){
                    newLeaves.push(leaf)
                }
            }
        }
        this.canopy = this.canopy.concat(newLeaves)
    }

    // activated by button
    growAll() {
        let newBranches = []
        for (let i=0;i<this.canopy.length;i++){

            if(this.canopy[i].isLeaf()&&this.canopy[i].parent.width > 2){

                //remove reference from leaf parent
                this.canopy[i].parent.nextBranches = this.canopy[i].parent.nextBranches.filter((branch)=>{ 
                    return branch !== this.canopy[i];
                })

                // create new branch
                let newBranch = this.canopy[i].parent.growNewBranch()
            

                // set new branch as parent
                let changedLeaf = this.canopy[i];
                changedLeaf.parent = newBranch;
                changedLeaf.begin = newBranch.end;

                this.canopy[i] = changedLeaf;
                newBranch.nextBranches.push(this.canopy[i]);

                newBranches.push(newBranch)
            }
        
        }
        this.canopy = this.canopy.concat(newBranches);
    }

    removeBranch = (branchToRemove) =>{
    
        // remove reference in parent branch
        branchToRemove.parent.nextBranches = branchToRemove.parent.nextBranches.filter((branch)=>{ 
            return branch !== branchToRemove;
        })

        //remove children recursively
        branchToRemove.nextBranches.forEach(branch => {
            this.removeBranch(branch);
        });
        branchToRemove.dead=true;
    }
}