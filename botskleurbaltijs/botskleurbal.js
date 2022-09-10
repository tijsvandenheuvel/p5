var w;
var h;

var bolletjes;
var begin_aantal = 20;
//var begin_size = 10;
var input_aantal = begin_aantal;

var vel_limit = 6;
var size_limit = 30;

// wordt 1 keer uitgevoerd
function setup(aantal=begin_aantal) {

    w = windowWidth; 
    h = windowHeight;

    buttons(aantal);
	createCanvas(w, h);

    bolletjes = [];

    // initialiseer bolletjes
	for (let i = 0; i < aantal; i++) {
		let pos1 = createVector(random(w), random(h));
		let vel1 = createVector(random(-vel_limit,vel_limit), random(-vel_limit,vel_limit));
		let size1 = random(1,size_limit);
        let col1 = color(random(255), random(255), random(255));
        
		bolletjes.push(new Bolletje(pos1, vel1, size1 , col1));
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

            // als ge botst ma ni botsen met uzelf
            if(dist>0 && dist<this.size/2){        
                this.merge(bol,i);
            }
		}
	}
    merge(bol,i){
        // je wordt zelf de nieuwe bol
        this.size = 0.95*(this.size+bol.size)
        this.color = telKleurenOp(this.color,bol.color)
        this.vel = gemiddelde(this.vel,bol.vel)
        // andere bol verwijderen
        bolletjes.splice(i, 1)
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

function buttons(aantal){
    input1 = createInput(aantal);
	input1.position(5, 5);
	input1.size(50);
    input1.input(myInputEvent);
}
function myInputEvent(){
    input_aantal = this.value()
}
function keyPressed() {
    if (keyCode === ENTER) {
        if(!isNaN(input_aantal)){
            setup(input_aantal)
        }
    } 
}
function keyTyped() {
    if (keyCode === 32) {
        let pos1 = createVector(random(w), random(h));
		let vel1 = createVector(random(-vel_limit,vel_limit), random(-vel_limit,vel_limit));
		let size1 = random(1,size_limit);
        let col1 = color(random(255), random(255), random(255));
        
		bolletjes.push(new Bolletje(pos1, vel1, size1 , col1));
    };
};
// bol ontploft wanneer je erop klikt
function mousePressed() {
    let mouse_pos = createVector(mouseX, mouseY);

    for (let i = 0; i < bolletjes.length; i++) {
        // check of muis in bolletje zit
        let bol = bolletjes[i];
        let dist = mouse_pos.dist(bol.pos);

        if(dist<bol.size/2){    
            let new_size = bol.size/2;

            bolletjes[i].size = new_size;
         
            let vel2 = createVector(-bol.vel.x*1.2,-bol.vel.y*1.2);
            // vel is negative pos should be -
            let pos2
            if(vel2.x<0 && vel2.y<0){
                pos2 = createVector(bol.pos.x-new_size,bol.pos.y-new_size);
            }
            if(vel2.x<0 && vel2.y>0){
                pos2 = createVector(bol.pos.x-new_size,bol.pos.y+new_size);
            }
            if(vel2.x>0 && vel2.y<0){
                pos2 = createVector(bol.pos.x+new_size,bol.pos.y-new_size);
            }
            if(vel2.x>0 && vel2.y>0){
                pos2 = createVector(bol.pos.x+new_size,bol.pos.y+new_size);
            }
               
            
            let size2 = new_size;
            let col2 = bol.color;
            bolletjes.push(new Bolletje(pos2, vel2, size2 , col2));
            
        }
    }
}





  
  
