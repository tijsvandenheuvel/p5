// TODO 
// dynamically calculate position of final module 
    // follow all vector transformations

function setup(modules=2,radius=150,height=50) {
    createCanvas(windowWidth*2/3, windowHeight, WEBGL);

    ui_pos = windowWidth*2/3 - 260; 
    
    text = createElement('h3', "default: 2, 150, 50");   
    text.position(ui_pos, 0);
    
    input1 = createInput();
    input1.position(ui_pos, 40);
    input2 = createInput();
    input2.position(ui_pos, 60);
    input3 = createInput();
    input3.position(ui_pos, 80);
      
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
        
    toColor = false;
    createCylinders(numberOfModules,moduleRadius,moduleSegmentHeight,toColor);

    h = moduleSegmentHeight;
    n = numberOfModules
    dop = createVector(0,(h/2)-((n-1)*h),0);
    drawSphere(dop,10);

    bottom = getBottomCoordinatesMulti();
    drawSphere(bottom,10);


    push();
        strokeWeight(4);
        stroke(255, 204, 0);
        line(bottom.x,bottom.y,bottom.z,dop.x,dop.y,dop.z);
    pop();
}   

    // top stays at same place
    // because the entire frame of reference shifts 
    // the bottom gets new coordinates
function getBottomCoordinates(){
        n = numberOfModules
        r = moduleRadius
        h = moduleSegmentHeight
        dif = h*n;
        ratio = 1-(h/r);

        coo = createVector(0,(h/2)-((n-1)*h),0);
        //createVector(0,moduleSegmentHeight*numberOfModules*2-moduleSegmentHeight/2,0)

        //for(i=n-1;i>=0;i--){
        for(i=0;i<n;i++){

            // move trough top segment
            coo = createVector(coo.x, coo.y+h, coo.z)

            // translation over cylinder face
            coo = createVector(coo.x+(r*ratio), coo.y , coo.z)

            // 4. rotate around z-axis
            b = HALF_PI-sliders[i][0].value()
            coo = createVector(coo.x-(r*ratio*sin(b)), coo.y+(r*ratio*cos(b)) , coo.z)

            // 90° -> x+h ,y
            // 0° -> x,y+h
            coo = createVector(coo.x+(h*cos(b)), coo.y+(h*sin(b)), coo.z)

            // rotate around y-axis
            a = sliders[i][1].value()
            coo = createVector(coo.x*cos(a), coo.y , coo.x*sin(a))

            if(frameCount%100==0){
                //console.log(a*180/PI)
            }
        }

        // initial position
        return coo
}
function getBottomCoordinatesMulti2(){
    n = numberOfModules
    r = moduleRadius
    h = moduleSegmentHeight
    dif = h*n;
    ratio = 1-(h/r);
    L=r*ratio

    th = h*n*2

    b1 = HALF_PI-sliders[0][0].value()
    b2 = HALF_PI-sliders[1][0].value()

    //begin
    coo = createVector(0,(h/2)-((n-1)*h),0);

    coo = createVector(
        coo.x+
        L*(cos(b1)+cos(b2))+
        h*(cos(b1)+cos(b2)+2*sin(b1)*cos(b2))
        ,
        coo.y+
        L*(sin(b1)*cos(b2)+cos(b1)*sin(b2))+
        h*(sin(b1)*cos(b2)+3*cos(b1)*sin(b2)+4*sin(b1)*sin(b2))
        ,
        coo.z);

    // full length
    //coo = createVector(coo.x,coo.y+th,coo.z);

    // b1=90 b2=0
    //coo = createVector(coo.x+250,coo.y-50,coo.z);

    // b1=0 b2=90
    //coo = createVector(coo.x+150,coo.y+50,coo.z);

    // b1=0 b2=0
    //coo = createVector(coo.x+300,coo.y-200,coo.z);


    if(frameCount%100==0){
        console.log('b2:',b2*180/PI,'b1:',b1*180/PI)
    }
    return coo;
}

function getBottomCoordinatesMulti(){
        n = numberOfModules
        r = moduleRadius
        h = moduleSegmentHeight
        dif = h*n;
        ratio = 1-(h/r);

        // begin
        coo = createVector(0,(h/2)-((n-1)*h),0);

        // FIRST MODULE

        // move trough top segment
        // volgens hoek van vorig schuin segment
        coo = createVector(coo.x, coo.y+h, coo.z)

        // translation over cylinder face
        coo = createVector(coo.x+(r*ratio), coo.y , coo.z)

        // 4. rotate around z-axis
        b1 = sliders[1][0].value()
        coo = createVector(coo.x-(r*ratio*cos(b1)), coo.y+(r*ratio*sin(b1)) , coo.z)

        // 90° -> x+h ,y
        // 0° -> x,y+h
        // door schuin segment
        coo = createVector(coo.x+(h*sin(b1)), coo.y+(h*cos(b1)), coo.z)

    // SECOND MODULE

        // rotate around new y-axis
        // deze werkt nog niet
        // afhankelijk van b1
        a2 = sliders[0][1].value()
        coo = createVector((coo.x*cos(a2))-(coo.z*sin(a2)), coo.y, (coo.x*sin(a2))+(coo.z*cos(a2)))

        // move trough top segment
        //coo = createVector(coo.x, coo.y+h, coo.z)
        coo = createVector(coo.x+(h*sin(b1)), coo.y+(h*cos(b1)), coo.z)

        // translation over cylinder face
        coo = createVector(coo.x+(r*ratio*cos(b1)), coo.y-(r*ratio*sin(b1)) , coo.z)

        // 4. rotate around z-axis
        b2 = sliders[0][0].value()
        //coo = createVector(coo.x-(r*ratio*cos(b2)), coo.y+(r*ratio*sin(b2)), coo.z)
        coo = createVector(coo.x-(r*ratio*cos(b2+b1)), coo.y+(r*ratio*sin(b2+b1)), coo.z)

        coo = createVector(coo.x+(h*sin(b1+b2)), coo.y+(h*cos(b1+b2)), coo.z)

        // rotate around y-axis
        // deze werkt 
        a1 = sliders[1][1].value()
        coo = createVector((coo.x*cos(a1))-(coo.z*sin(a1)), coo.y, (coo.x*sin(a1))+(coo.z*cos(a1)))


        
        // bij a2 = 180° wille we 
        //coo = createVector(coo.x-100, coo.y+100, coo.z)

        // bij a2 = 90° wille we 
        //coo = createVector(coo.x-100, coo.y+100, coo.z)

    if(frameCount%100==0){
        console.log('b2:',b2*180/PI,'b1:',b1*180/PI)
        console.log('a2:',a2*180/PI,'a1:',a1*180/PI)
        console.log(coo.x,coo.y,coo.z)
    }
    return coo 
}

        
    
function drawSphere(v,s){
    push();
        translate(v.x,v.y,v.z);
        //noFill();
        sphere(s);
    pop();
    }
    
function createCylinders(amount,radius,height,fillBool){
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
            if(fillBool){fill(colors[i]);}else{noFill();}
            cylinder(r, h, 24, 1);
        pop();
    
        translate(r*ratio,ydif+(h/2),0)
        rotate(sliders[i][0].value(),createVector(0,0,1))
        translate(-r*ratio,-(ydif+(h/2)),0)
    
        //cylinder on top
        push();
            translate(0, ydif , 0);
            if(fillBool){fill(colors[i]);}else{noFill();}
            cylinder(r, h, 24, 1);
        pop();
    
        rotate(sliders[i][1].value(),createVector(0,1,0))
    }
}
    
function getSliders(amount){
    length = windowWidth/8

    let sliders =[]
    
    for(i=0;i<amount;i++){
        // open close slider
        let slider = createSlider(0, PI/2, 0, 0.001); // min, max, start
        slider.position(10,10+i*20); // x and y
        slider.size(length, 20);
    
        // turn around slider
        let slider2 = createSlider(0, 2*PI, 0, 0.001); // min, max, start
        slider2.position(length+20,10+ i*20); // x and y
        slider2.size(length, 20);
            
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
    