function setup(modules=2,radius=150,height=50) {
    createCanvas(windowWidth*2/3, windowHeight, WEBGL);

    createUIElements();
    
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

    // draw top sphere
    h = moduleSegmentHeight;
    n = numberOfModules
    begin = createVector(0,(h/2)-((n-1)*h),0);
    //drawSphere(begin,10);

    //bottom = getBottomCoordinatesMulti();
    //drawSphere(bottom,10);
    
    openSlider1= sliders[1][0].value();
    rotationSlider1= sliders[1][1].value();
    middle = getBottomCoordinatesSingular(begin,openSlider1,rotationSlider1,0,0,false);
    //drawSphere(middle,10);

    openSlider2= sliders[0][0].value();
    rotationSlider2= sliders[0][1].value();
    bottom = getBottomCoordinatesSingular(middle,openSlider2,rotationSlider2,openSlider1,rotationSlider1,true);
    //drawSphere(bottom,10);

    //getCooByMethods(numberOfModules,moduleRadius,moduleSegmentHeight);

    push();
        strokeWeight(4);
        stroke(255, 204, 0);
        //line(middle.x,middle.y,middle.z,begin.x,begin.y,begin.z);
        //line(bottom.x,bottom.y,bottom.z,begin.x,begin.y,begin.z);
        //line(bottom.x,bottom.y,bottom.z,middle.x,middle.y,middle.z);
    pop();
}   
   
    
        // top stays at same place
        // because the entire frame of reference shifts 
        // the bottom gets new coordinates
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
    
            // move trough top segment
            //coo = createVector(coo.x, coo.y+h, coo.z)
            coo = createVector(coo.x+(h*sin(b1)), coo.y+(h*cos(b1)), coo.z)
    
            // translation over cylinder face
            coo = createVector(coo.x+(r*ratio*cos(b1)), coo.y-(r*ratio*sin(b1)) , coo.z)
    
            // 4. rotate around z-axis
            b2 = sliders[0][0].value()
            coo = createVector(coo.x-(r*ratio*cos(b2+b1)), coo.y+(r*ratio*sin(b2+b1)), coo.z)
    
            coo = createVector(coo.x+(h*sin(b1+b2)), coo.y+(h*cos(b1+b2)), coo.z)
    
            // rotate around y-axis
            // deze werkt 
            a1 = sliders[1][1].value()
            coo = createVector((coo.x*cos(a1))-(coo.z*sin(a1)), coo.y, (coo.x*sin(a1))+(coo.z*cos(a1)))
    
    
    
            // rotate around new y-axis
            // deze werkt nog niet
            // a2 afhankelijk van b1 
            // b2 afhankelijk van a2 ? 
            a2 = sliders[0][1].value()
    
            //deze werkt als b1 = 0 dus as == y-as
            //coo = createVector((coo.x*cos(a2))-(coo.z*sin(a2)),coo.y, +(coo.x*sin(a2))+(coo.z*cos(a2)))
    
            // als b2 = 90 dus y-as -> x-as
            //coo = createVector(coo.x,(coo.y*cos(a2))-(coo.z*sin(a2)),+(coo.y*sin(a2))+(coo.z*cos(a2)))
    
            //coo = createVector((coo.x*cos(a2))-(coo.z*sin(a2)),((coo.x*sin(b1+b2)))+(coo.y*cos(b1+b2)), (coo.x*sin(a2))+(coo.z*cos(a2)))
            //coo = createVector((coo.x*cos(a2))-(coo.z*sin(a2)),((coo.x*sin(b1)))+(coo.y*cos(b1)), (coo.x*sin(a2))+(coo.z*cos(a2)))
            
    
        if(frameCount%100==0){
            console.log('b2:',b2*180/PI,'b1:',b1*180/PI)
            console.log('a2:',a2*180/PI,'a1:',a1*180/PI)
            console.log(coo.x,coo.y,coo.z)
        }
        return coo 
    }

function getBottomCoordinatesSingular(beginVector,openSlider,rotationSlider,totalOpenSlider,totalRotationSlider,log){
    n = numberOfModules
    r = moduleRadius
    h = moduleSegmentHeight
    dif = h*n;
    ratio = 1-(h/r);
    open1 = openSlider;
    openTot = totalOpenSlider;
    rot1 = rotationSlider;
    rotTot = totalRotationSlider;

    ro = rot1+rotTot
    op = open1+openTot

            // begin
    coo = beginVector;  
    drawSphere(coo,15);
    
            // FIRST MODULE
    
            // move trough top segment
            // volgens hoek van vorig schuin segment
    coo = createVector(coo.x+(h*sin(openTot)), coo.y+(h*cos(openTot)), coo.z)
    drawSphere(coo,8);

            // translation over cylinder face
    coo = createVector(coo.x+(r*ratio*cos(openTot)), coo.y-(r*ratio*sin(openTot)) , coo.z)
    drawSphere(coo,8);



    // 4. rotate around z-axis (en y-as ???)
    // dependence on rotTot ? 
    coo = createVector(coo.x-(r*ratio*cos(op)), coo.y+(r*ratio*sin(op)), coo.z)
    drawSphere(coo,8); 

    // door schuin segment
    coo = createVector(coo.x+(h*sin(op)), coo.y+(h*cos(op)), coo.z)
    drawSphere(coo,8);
    
    
    // rotate around y-axis
    
    // dependence on openTot,rotTot
    //coo = createVector((coo.x*cos(rot1))-(coo.z*sin(rot1)), coo.y, (coo.x*sin(rot1))+(coo.z*cos(rot1)))

    // dependence on openTot
    coo = createVector((coo.x*cos(ro))-(coo.z*sin(ro)), coo.y, (coo.x*sin(ro))+(coo.z*cos(ro)))
    

    //coo = createVector((coo.x*cos(rotTot))+(coo.z*sin(rotTot)), coo.y, -(coo.x*sin(rotTot))+(coo.z*cos(rotTot)))

    drawSphere(coo,15);

    // openTot = 90 rot1 = 180 rotTot = 0 dan moet x -> -x 
    // openTot = 90 rot1 = 0 rotTot = 180 dan moet x -> x 



    // z moet tegengesteld bij o

    //z coordinaten omdraaien

    // coo = createVector(
    //     coo.x*cos(ro)-coo.y*sin(ro)*sin(op)+coo.z*(sin(ro)*cos(op)*sin(op)),
    //     +coo.y*cos(op)-coo.z*sin(op),
    //     -coo.x*sin(ro)-coo.y*cos(ro)*sin(op)+coo.z*cos(ro)*cos(op)
    //     )

    // coo = createVector(
    //     coo.x*cos(r)+coo.y*sin(r)*sin(o)+coo.z*(sin(r)*cos(o)*sin(o)),
    //     coo.y*cos(o)-coo.z*sin(o),
    //     -coo.x*sin(r)+coo.y*cos(r)*sin(o)+coo.z*cos(r)*cos(o)
    //     )

        

    if(frameCount%200==0 && log){
        console.log('open1:',open1*180/PI,'openTot:',openTot*180/PI)
        console.log('rot1:',rot1*180/PI,'rotTot:',rotTot*180/PI)
        console.log(coo.x,coo.y,coo.z)
    }

    return coo;
}

function getCooByMethods(amount,radius,height){
    let r = radius;
    let h = height;
    let dif = h*amount;
    let ratio = 1-(h/r);
    

    translate(0, -dif+h*3/2, 0);

    begin = createVector(0,0,0)
        drawSphere(begin,10);
    
    for(i=0;i<amount;i++){

        translate(0, h , 0);
        next = createVector(0,0,0)
        //drawSphere(next,10);
    
        translate(r*ratio,h,0)
        rotate(sliders[i][0].value(),createVector(0,0,1))
        translate(-r*ratio,0,0)

        drawSphere(createVector(0,0,0),10);
    
        rotate(-sliders[i][1].value(),createVector(0,1,0))
    }
    line(next.x,next.y,next.z,begin.x,begin.y,begin.z);
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

    function drawSphere(v,s){
        push();
            translate(v.x,v.y,v.z);
            //noFill();
            sphere(s);
        pop();
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
    function createUIElements(){
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
    }
        