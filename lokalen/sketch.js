let lokalen;
let angle;;

function preload() {
	lokalen = loadModel("lokalen3.obj");
}

function setup() {
	screenHeight = windowHeight - 30;
	screenWidth = windowWidth - 30;

	createCanvas(screenWidth, screenHeight, WEBGL);
	rotateX(PI / 2);
    angle = PI * 1.05;
}

function draw() {
	background(190, 203, 212);

    //orbitControl();

    camera(0, -2 * height , 5 * height, 0, 0, 0, 0, 1, 0 );


	ambientLight(182, 102, 91);
	directionalLight(255, 255, 255, 0, 0, 1);

	

	rotateY(angle);
	angle += 0.002;

	sphere(50);

	rotateX(PI / 2);
	translate(-2750, -7500, 0);

	//rotateX(angle);
	//rotateZ(angle);

    stroke(142, 62, 51);
	model(lokalen);
    
}
