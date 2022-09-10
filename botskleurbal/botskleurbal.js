var w;
var h;
var bolletjes = [];
var aantal = 10;

// wordt 1 keer uitgevoerd
function setup() {
    w = windowWidth * 0.98; 
    h = windowHeight * 0.97;

	createCanvas(w, h);

    // initialiseer bolletjes
	for (let i = 0; i < aantal; i++) {
		let pos1 = createVector(random(w), random(h));
		let vel1 = createVector(random(-5,5), random(-5,5));
		let col = color(random(255), random(255), random(255));
		let bol1 = new Bolletje(pos1, vel1, random(1,50), col);
		bolletjes.push(bol1);
	}
}

// wordt 1 keer uitgevoerd per frame (60/ seconde)
function draw() {
	background(0);
	for (let i = 0; i < bolletjes.length; i++) {
		bolletjes[i].toon();
		bolletjes[i].beweeg();
	}
}

class Bolletje {
	constructor(pos, vel, size, color) {
		this.pos = pos;
		this.vel = vel;
		this.size = size;
		this.color = color;
	}
	toon() {
		stroke(this.color);
		strokeWeight(this.size);
		point(this.pos.x, this.pos.y);
	}
	beweeg() {
		this.pos.add(this.vel);
		// botsen tegen rand
		if (this.pos.y >= h || this.pos.y <= 0) {
			this.vel.y = -this.vel.y;
		}
		if (this.pos.x >= w || this.pos.x <= 0) {
			this.vel.x = -this.vel.x;
		}
		// bots tegen elkaar
		for (let i = 0; i < bolletjes.length; i++) {
            // check of jezelf te dicht bij een ander bolletje zit
            let bol = bolletjes[i];
            let dist = this.pos.dist(bol.pos);

            // ni botsen met uzelf
            if(dist>0 && dist<this.size/2){            
                // je wordt zelf de nieuwe bol
                this.size = 0.95*(this.size+bol.size)
                this.color = telKleurenOp(this.color,bol.color)
                this.vel = gemiddelde(this.vel,bol.vel)

                // andere bol verwijderen
                bolletjes.splice(i, 1)
            }
		}
	}
}

function telKleurenOp(col1,col2){
    let r1 = col1.levels[0]
    let g1 = col1.levels[1]
    let b1 = col1.levels[2]

    let r2 = col2.levels[0]
    let g2 = col2.levels[1]
    let b2 = col2.levels[2]

    let nieuwe_kleur = color((r1+r2)%255,(g1+g2)%255,(b1+b2)%255);

    return nieuwe_kleur;
}

function gemiddelde(v1,v2){
    return createVector((v1.x+v2.x)/2,(v1.y+v2.y)/2)

}
