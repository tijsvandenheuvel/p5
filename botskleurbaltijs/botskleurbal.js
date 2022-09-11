var w;
var h;

var bolletjes;

var global_aantal = 20;
var global_vel_limit = 6;
var global_size_limit = 30;

// wordt 1 keer uitgevoerd
function setup(
	aantal = global_aantal,
	vel = global_vel_limit,
	size = global_size_limit
) {
	w = windowWidth;
	h = windowHeight;

	// input elementen om aantal (enzo) te kiezen
	createInputs(aantal);

	createCanvas(w, h);

	bolletjes = new Bolletjes(aantal, vel, size);
}

// wordt 1 keer uitgevoerd per frame (60/ seconde)
function draw() {
	background(0);
	bolletjes.next();

	if (frameCount % 60 == 0) {
		bolletjes.explodeWhenTooLarge(200);
	}

	if (bolletjes.pop.length < 5) {
		bolletjes.addRandom();
	}
}

class Bolletjes {
	constructor(aantal, vel, size) {
		this.aantal = aantal;
		this.vel = vel;
		this.size = size;
		this.pop = [];
		this.init();
	}
	// initialiseer bolletjes
	init() {
		for (let i = 0; i < this.aantal; i++) {
			this.addRandom();
		}
	}
	// toon en beweeg elk bolletje
	next() {
		for (let i = 0; i < this.pop.length; i++) {
			this.pop[i].toon();
			this.pop[i].beweeg();
		}
	}
	explodeWhenTooLarge(max_size) {
		for (let i = 0; i < this.pop.length; i++) {
			if (this.pop[i].size > max_size) {
				this.pop[i].explode();
			}
		}
	}
	// voeg bolletje toe aan pop, obv parameters
	add(pos, vel, size, col) {
		this.pop.push(new Bolletje(pos, vel, size, col));
	}
	// voeg bolletje toe aan pop, obv properties
	addRandom() {
		// nieuw bolletje
		let pos1 = createVector(random(w), random(h));
		let vel1 = createVector(
			random(-this.vel, this.vel),
			random(-this.vel, this.vel)
		);
		let size1 = random(1, this.size);
		let col1 = color(random(255), random(255), random(255));

		this.add(pos1, vel1, size1, col1);
	}
    explodeBolWaaropGekliktWordt(mouse_pos){
        for (let i = 0; i < this.pop.length; i++) {
            // afstand tussen muis en bolletje
            let dist = mouse_pos.dist(this.pop[i].pos);
    
            // als de afstand kleiner is dan half de size zit je erop.
            if (dist < this.pop[i].size / 2) {
                this.pop[i].explode();
            }
        }
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

        let r = this.size/2;
		// botsen tegen rand
		if (this.pos.y+r >= h) {
			this.vel.y = -Math.abs(this.vel.y);
		}
		if (this.pos.y-r <= 0) {
			this.vel.y = Math.abs(this.vel.y);
		}
		if (this.pos.x+r >= w) {
			this.vel.x = -Math.abs(this.vel.x);
		}
		if (this.pos.x-r <= 0) {
			this.vel.x = Math.abs(this.vel.x);
		}
		// bots tegen elkaar
		for (let i = 0; i < bolletjes.pop.length; i++) {
			// check of jezelf te dicht bij een ander bolletje zit
			let bol = bolletjes.pop[i];
			let dist = this.pos.dist(bol.pos);

			// als ge botst ma ni botsen met uzelf
			// als de afstand kleiner is dan de helft van de size van beide
			if (dist > 0 && dist < (this.size + bol.size)/2) {
				this.merge(bol, i);
			}
		}
	}
	merge(bol, i) {
		// je wordt zelf de nieuwe bol
		this.size = 0.95 * (this.size + bol.size);
		this.color = telKleurenOp(this.color, bol.color);

        this.pos = gemiddelde(this.pos, bol.pos);

		// let gemiddeld = gemiddelde(this.vel, bol.vel);
        // gewogen gemiddelde
        // hoe groter hoe meer impact 
        let total_size = (this.size + bol.size);
        let gg = gemiddelde(
            createVector(this.vel.x*this.size,this.vel.y*this.size),
            createVector(bol.vel.x*bol.size,bol.vel.y*bol.size));
        gg = createVector(gg.x/total_size,gg.y/total_size)
        this.vel = gg;

		// andere bol verwijderen
		bolletjes.pop.splice(i, 1);
	}
	explode() {
		// new size half of old size
		let new_size = this.size / 2;
		this.size = new_size;

		// new velocity, a bit more than old vel
		let vel2 = createVector(-this.vel.x * 1.2, -this.vel.y * 1.2);

		// new position in the direction of new vel
		let pos2;
		if (vel2.x < 0 && vel2.y < 0) {
			pos2 = createVector(this.pos.x - new_size, this.pos.y - new_size);
		}
		if (vel2.x < 0 && vel2.y > 0) {
			pos2 = createVector(this.pos.x - new_size, this.pos.y + new_size);
		}
		if (vel2.x > 0 && vel2.y < 0) {
			pos2 = createVector(this.pos.x + new_size, this.pos.y - new_size);
		}
		if (vel2.x > 0 && vel2.y > 0) {
			pos2 = createVector(this.pos.x + new_size, this.pos.y + new_size);
		}
		// new color same as this color
		let col2 = this.color;

		bolletjes.add(pos2, vel2, new_size, col2);
	}
}

function telKleurenOp(col1, col2) {
	let r1 = col1.levels[0];
	let g1 = col1.levels[1];
	let b1 = col1.levels[2];

	let r2 = col2.levels[0];
	let g2 = col2.levels[1];
	let b2 = col2.levels[2];

	let nieuwe_kleur = color((r1 + r2) % 255, (g1 + g2) % 255, (b1 + b2) % 255);

	return nieuwe_kleur;
}
function gemiddelde(v1, v2) {
	return createVector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
}

// create visual elements
function createInputs(aantal) {
	input1 = createInput(aantal);
	input1.position(5, 5);
	input1.size(50);
	input1.input(updateAantal);
}
function updateAantal() {
	global_aantal = this.value();
}
// reset setup on ENTER with new amount
function keyPressed() {
	if (keyCode === ENTER) {
		// check if input value is a number
		if (!isNaN(global_aantal)) {
			setup();
		}
	}
}
// nieuw bolletje op SPATIE
function keyTyped() {
	// SPATIEBALK
	if (keyCode === 32) {
		bolletjes.addRandom();
	}
}
// bol ontploft wanneer je erop klikt
function mousePressed() {
	let mouse_pos = createVector(mouseX, mouseY);
    bolletjes.explodeBolWaaropGekliktWordt(mouse_pos)
}
