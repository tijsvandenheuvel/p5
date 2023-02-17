let sketch = function(p) {
    let lokalen_base;
    let lokalen_dak;

    p.preload = function(){
        //lokalen = loadModel("lokalen3.obj");
        lokalen_base = p.loadModel("lokalen_base.obj");
        lokalen_dak = p.loadModel("lokalen_dak.obj");
    }
    p.setup = function(){
        screenHeight = p.windowHeight - 60;
        screenWidth = p.windowWidth * 0.999;
    
        p.createCanvas(screenWidth, screenHeight, p.WEBGL);
        angle = p.PI * 1.05;
    }

    p.draw = function() {
        p.background(190, 203, 212);
    
        //orbitControl();
        p.camera(0, -2 * p.height , 5 * p.height, 0, 0, 0, 0, 1, 0 );
    
        p.ambientLight(250, 250, 250);
        //ambientLight(182, 102, 91);
        p.directionalLight(255, 255, 255, 0, 0, 1);
    
        p.rotateY(angle);
        angle += 0.002;
    
        p.push();
        p.rotateX(p.PI / 2);
        p.rotateZ(p.PI * 0.88);
        p.fill('#6b8446');
        p.noStroke();
        p.plane(10000, 10000);
        p.pop();
        //sphere(50);
    
        p.push();
        p.rotateX(p.PI / 2);
        p.translate(-2750, -7500, 0);
        p.stroke(142, 62, 51);
        p.fill('#c7bea0');
            //model(lokalen);
        p.model(lokalen_base);
        p.fill(182, 102, 91)
        p.model(lokalen_dak);
        p.pop();
    }
  };
new p5(sketch, 'container');

// let lokalen;
// let angle;

// function preload() {
// 	//lokalen = loadModel("lokalen3.obj");
//     lokalen_base = loadModel("lokalen_base.obj");
//     lokalen_dak = loadModel("lokalen_dak.obj");
// }

// function setup() {
// 	screenHeight = windowHeight - 80;
// 	screenWidth = windowWidth - 30;

// 	createCanvas(screenWidth, screenHeight, WEBGL);
//     angle = PI * 1.05;
// }

// function draw() {
// 	background(190, 203, 212);

//     //orbitControl();
//     camera(0, -2 * height , 5 * height, 0, 0, 0, 0, 1, 0 );

//     ambientLight(250, 250, 250);
// 	//ambientLight(182, 102, 91);
// 	directionalLight(255, 255, 255, 0, 0, 1);

// 	rotateY(angle);
// 	angle += 0.002;

//     push();
//         rotateX(PI / 2);
//         rotateZ(PI * 0.88);
//         fill('#6b8446');
//         noStroke();
//         plane(10000, 10000);
//     pop();
// 	//sphere(50);

//     push();
// 	    rotateX(PI / 2);
// 	    translate(-2750, -7500, 0);
//         stroke(142, 62, 51);
//         fill(255, 255, 255);
//         //model(lokalen);
// 	    model(lokalen_base);
//         fill(182, 102, 91)
//         model(lokalen_dak);
//     pop();
// }
