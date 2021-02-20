function FoodParticle(pos){

    this.alive = true;

    if(pos){
        this.pos = pos
    }else{
        this.pos = createVector(random(0,width),random(0,height));
    }

    this.eaten= function(){
        this.alive=false;

    }

    this.show= function(){
        push();
        noStroke();
        fill(10,240,10);
        translate(this.pos.x,this.pos.y);
        ellipseMode(CENTER)
        circle(0,0,5);
        pop();
    }
}