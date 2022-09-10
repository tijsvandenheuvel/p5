var r = 200;
var cs = [];
function setup() {
	screenHeight = windowHeight - 30;
	screenWidth = windowWidth - 30;

	createCanvas(screenWidth, screenHeight, WEBGL);

	getCheckboxes();

	getGeometricObjects();
}

function draw() {
	orbitControl();
	if (frameCount % 10 == 0) {
		if (slider.value() != r) {
			r = slider.value();
			getGeometricObjects();
		}
		background(200);

        for(i=0;i<cs.length;i++){
            drawPoint(cs[i]);
            if(spheres_check){
                drawSphere(cs[i],r)
            }
        }
        if (tetrahedron_check) {
			//drawTetrahedron();
		}

        if (tetrahedron_check) {
			//drawCube();
		}

        
	}
}

getGeometricObjects = () => {
    cs=[]
    let t = PI/3;
    cs.push(createVector(0, 0, 0))
    cs.push(createVector(r, 0, 0))
    cs.push(createVector(r*cos(t),r*sin(t), 0))
    cs.push(createVector(r*cos(t/2),r*sin(t/2), r*cos(t/2)))
    //cs.push(createVector(r/2, (sqrt(3) / 2) * r, 0))
    //cs.push(createVector(r/2, r/3, (sqrt(6) / 3) * r))

    //cs.push(createVector(r/2, -r/3, r/3))
    //cs.push(createVector(r/2, r/3 , (sqrt(6) / 3) * r) - (sqrt(3) / 2) * r)

    


    console.log(cs[0].dist(cs[1]))
    console.log(cs[0].dist(cs[2]))
};

drawTetrahedron= () =>{

    if(cs.length>=4){
        stroke(255,230,0)
        drawLine(cs[0],cs[1])
        drawLine(cs[0],cs[2])
        drawLine(cs[0],cs[3])
        drawLine(cs[2],cs[1])
        drawLine(cs[3],cs[2])
        drawLine(cs[1],cs[3])
    }
}

drawCube= () =>{
    if(cs.length>=4){
        stroke(220,20,60);
        drawLine(cs[0],cs[4])
        drawLine(cs[1],cs[4])
        drawLine(cs[3],cs[4])

        drawLine(cs[0],cs[5])
        drawLine(cs[1],cs[5])
        drawLine(cs[2],cs[5])
    }
}


drawPoint = (p) => {
	push();
	fill(255);
	noStroke();
	translate(p.x, p.y, p.z);
	sphere(5, 5);
	pop();
};

drawSphere = (p,r) => {
	push();
	noFill();
	stroke(2, 105, 164);
	translate(p.x, p.y, p.z);
	sphere(r);
	pop();
};

drawLine = (p1, p2) => {
	push();
	//stroke(50);
	strokeWeight(5);
	beginShape();
	vertex(p1.x, p1.y, p1.z);
	vertex(p2.x, p2.y, p2.z);
	endShape();
	pop();
};

function getMiddleOfLine(p1, p2) {
	return createVector(
		(p1.x + p2.x) / 2,
		(p1.y + p2.y) / 2,
		(p1.z + p2.z) / 2
	);
}
function getMiddleOfTriangle(p1, p2,p3) {
	return createVector(
		(p1.x + p2.x + p3.x) / 3,
		(p1.y + p2.y + p3.y) / 3,
		(p1.z + p2.z + p3.z) / 3
	);
}
function getMiddleOfSquare(p1, p2, p3, p4) {
	return createVector(
		(p1.x + p2.x + p3.x + p4.x) / 4,
		(p1.y + p2.y + p3.y + p4.y) / 4,
		(p1.z + p2.z + p3.z + p4.z) / 4,
	);
}
