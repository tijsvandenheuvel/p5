function Particle(pos,age,toHome){

    this.pos = pos;
    this.age = age;
    this.color= color;
    this.toHome = toHome;

    particles.push(this);

    this.show = () => {
        push();
            noStroke();
            if(toHome){
                fill(255,0,0,this.age);
            }else{
                fill(0,0,255,this.age);
            }
            
            translate(this.pos.x,this.pos.y);
            ellipse(0,0,2,2);
        pop();

        this.age-=2;
    }
}