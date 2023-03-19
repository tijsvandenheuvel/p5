let sketch = function(p) {
    let lokalen_base;
    let lokalen_dak;

    p.preload = function(){
        lokalen_base = p.loadModel("lokalen_base_5.obj");
        lokalen_dak = p.loadModel("lokalen_dak_3.obj");
    }
    p.setup = function(){
        screenHeight = p.windowHeight;
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
        p.fill('#c7bea0');
        p.stroke('#a9ad89');
        p.model(lokalen_base);
        p.stroke('#a45b6e');
        p.fill('#b6665b')
        p.model(lokalen_dak);
        p.pop();
    }
  };
new p5(sketch, 'container');