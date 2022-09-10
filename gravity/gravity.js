var sun;
var earth;
var G = 0.5;
function setup() {
	createCanvas(windowWidth * 0.95, windowHeight * 0.95);

    sun = new Body(width/2,height/2,100);
    earth = new Body(width/2,random(height),10);
}

function draw() {
	background(0);

    let force = sun.attract(earth);
    earth.update(force);

    sun.show();
    earth.show();
}

class Body {
	constructor(x, y, mass) {
		this.mass = mass;
		this.pos = createVector(x, y);
		this.vel = createVector(10, 0);
		this.acc = createVector(0, 0);
        this.path = [];
	}
    attract(other){
        let force = p5.Vector.sub(this.pos, other.pos);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);
        let strength = (G * this.mass * other.mass) / (distance * distance);
        force.setMag(strength);
        return force;
    }
    update(f){
        this.acc.add(f);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.path.push(this.pos);
    }
    show() {
        stroke(255);
        strokeWeight(this.mass);
        point(this.pos.x, this.pos.y);
        this.trace();
    }
    trace(){
        for(let i=0; i<this.path.length;i++){
            stroke(255);
            strokeWeight(1);
            point(this.path[i].x, this.path[i].y);
        }
    }
}


