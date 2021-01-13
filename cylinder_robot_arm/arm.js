    // TODO 
    // parameterize radius - rotation center ratio

    function setup(modules=2,radius=150,height=50) {
        createCanvas(750, 750, WEBGL);
    
        text = createElement('h3', "default: 2, 150, 50");   
        text.position(500, 0);
    
        input1 = createInput();
        input1.position(490, 40);
        input2 = createInput();
        input2.position(490, 60);
        input3 = createInput();
        input3.position(490, 80);
      
        button1 = createButton('change amount');
        button1.position(input1.x + input1.width, 40);
        button1.mousePressed(changeAmount);
        button2 = createButton('change radius');
        button2.position(input1.x + input1.width, 60);
        button2.mousePressed(changeRadius);
        button3 = createButton('change height');
        button3.position(input1.x + input1.width, 80);
        button3.mousePressed(changeHeight);
    
        numberOfModules = modules;
        moduleRadius = radius; 
        moduleSegmentHeight = height
    
        sliders = getSliders(numberOfModules);
        colors = getColors(numberOfModules);
    }
    
    function draw(){
        background(50);
        stroke(255);
 
        orbitControl();

        //drawRefAxis();
        
        createCylinders(numberOfModules,moduleRadius,moduleSegmentHeight);
    }   
    
    function createCylinders(amount,radius,height){
        let r = radius;
        let h = height;
        let dif = h*amount;
        let ratio = 1-(h/r);
    
        for(i=0;i<amount;i++){
            // base cylinder
    
            let ydif = (-2*h*i)+dif;
            //if(ydif==0){ydif2=50}else{ydif2=ydif}
            push();
                translate(0, ydif+h , 0);
                fill(colors[i]);
                cylinder(r, h, 24, 1);
            pop();
    
            translate(r*ratio,ydif+(h/2),0)
            rotate(sliders[i][0].value(),createVector(0,0,1))
            translate(-r*ratio,-(ydif+(h/2)),0)
    
            //cylinder on top
            push();
                translate(0, ydif , 0);
                fill(colors[i]);
                cylinder(r, h, 24, 1);
            pop();
    
            rotate(sliders[i][1].value(),createVector(0,1,0))
        }
    }
    
    function getSliders(amount){
        let sliders =[]
    
        for(i=0;i<amount;i++){
            // open close slider
            let slider = createSlider(0, PI/2, 0, 0.001); // min, max, start
            slider.position(10,10+i*20); // x and y
            slider.size(200, 20);
    
            // turn around slider
            let slider2 = createSlider(0, 2*PI, 0, 0.001); // min, max, start
            slider2.position(220,10+ i*20); // x and y
            slider2.size(200, 20);
            
            let subsliders =[slider,slider2]
            sliders.push(subsliders)
        }
        return sliders
    }
    
    function getColors(amount){
        let colors = [];
        for( i= 0;i<numberOfModules;i++){
            colors.push(color(random(0,255), random(0,255), random(0,255)))
        }
        return colors;
    }

    function drawRefAxis(){
        line(-100,0,0,100,0,0); //x
        line(0,-100,0,0,100,0); //y
        line(0,0,-100,0,0,100); //z
    }

    function changeAmount(){
        sliders.forEach(slider => {slider[0].remove();slider[1].remove();});
        setup(int(input1.value()),moduleRadius,moduleSegmentHeight);
    }
    function changeRadius(){
        sliders.forEach(slider => {slider[0].remove();slider[1].remove();});
        setup(numberOfModules,int(input2.value()),moduleSegmentHeight);   
    }
    function changeHeight(){
        sliders.forEach(slider => {slider[0].remove();slider[1].remove();});
        setup(numberOfModules,moduleRadius,int(input3.value()));
    }
    