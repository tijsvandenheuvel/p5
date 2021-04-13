class Tree{

    constructor(baseWidth,baseLength,amount){
        // location and low midpoint
        let rootPoint = createVector(0,screenHeight/2)
        let end = createVector(0,screenHeight/2-baseLength)

        //root without parent
        let root = new Branch(rootPoint,rootPoint,baseWidth*2)

        // first branch
        this.tree = [new Branch(rootPoint,end,baseWidth,root)]

        // first leave
        this.tree.push(new Leaf(this.tree[0].end,this.tree[0].end,20,this.tree[0]))


        for (let i=0; i<amount; i++){
            this.tree.push(this.tree[i].growBranch())
        }
    }

    update(){
        // remove too thin tree
        this.tree = this.tree.filter((branch)=>{ 
            return branch.width > 1;
        });

        // remove dead branch
        this.tree = this.tree.filter((branch)=>{ 
            return !branch.dead;
        });

        // remove leaves without parents
        this.tree = this.tree.filter((branch)=>{ 
            return this.tree.includes(branch.parent)||!branch.isLeaf();
        });

        // draw tree
        for (let i=0;i<this.tree.length;i++){
            this.tree[i].displayBranch();
        }

        // get bigger over time
        if(frameCount%200==0){
            for (let i=0;i<this.tree.length;i++){
                this.tree[i].age();
            }
        }
    }

    // button
    leafEnds() {
        let newBranches = []
        for (let i=0;i<this.tree.length;i++){
            if(this.tree[i].nextBranches.length===0){
                let branch = this.tree[i].growLeaf()
                if(branch){
                    newBranches.push(branch)
                }
            }
        }
        this.tree = this.tree.concat(newBranches)
    }

// button
growAll() {
    let newBranches = []
    for (let i=0;i<this.tree.length;i++){

        if(this.tree[i].isLeaf()&&this.tree[i].parent.width > 2){

            //remove reference from leaf parent
            this.tree[i].parent.nextBranches = this.tree[i].parent.nextBranches.filter((branch)=>{ 
                return branch !== this.tree[i];
                })

            // create new branch
            let newBranch = this.tree[i].parent.growNewBranch()
            

            // set new branch as parent
            let changedLeaf = this.tree[i];
            changedLeaf.parent = newBranch;
            changedLeaf.begin = newBranch.end;

            this.tree[i] = changedLeaf;
            newBranch.nextBranches.push(this.tree[i]);

            newBranches.push(newBranch)
            
        }
        
    }
    this.tree = this.tree.concat(newBranches);
}

removeBranch = (branchToRemove) =>{
    
    // remove reference in parent branch
    branchToRemove.parent.nextBranches = branchToRemove.parent.nextBranches.filter((branch)=>{ 
        return branch !== branchToRemove;
    })

    //remove children
    branchToRemove.nextBranches.forEach(branch => {
        this.removeBranch(branch);
    });

    branchToRemove.dead=true;
}

}