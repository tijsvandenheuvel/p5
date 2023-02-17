let lokalen;
let angle;;

function preload() {
	//lokalen = loadModel("lokalen3.obj");
    lokalen_base = loadModel("lokalen_base.obj");
    lokalen_dak = loadModel("lokalen_dak.obj");
}

function setup() {
	screenHeight = windowHeight - 30;
	screenWidth = windowWidth - 30;

	createCanvas(screenWidth, screenHeight, WEBGL);
    angle = PI * 1.05;
}

function draw() {
	background(190, 203, 212);

    //orbitControl();
    camera(0, -2 * height , 5 * height, 0, 0, 0, 0, 1, 0 );

    ambientLight(250, 250, 250);
	//ambientLight(182, 102, 91);
	directionalLight(255, 255, 255, 0, 0, 1);

	rotateY(angle);
	angle += 0.002;

    push();
        rotateX(PI / 2);
        rotateZ(PI * 0.88);
        fill('#6b8446');
        noStroke();
        plane(10000, 10000);
    pop();
	//sphere(50);

    push();
	    rotateX(PI / 2);
	    translate(-2750, -7500, 0);
        stroke(142, 62, 51);
        fill(255, 255, 255);
	    model(lokalen_base);
        fill(182, 102, 91)
        model(lokalen_dak);
    pop();
}
