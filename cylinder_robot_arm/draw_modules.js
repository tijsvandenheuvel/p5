
function drawCylinderModules (amount,radius,moduleHeight,toFill,offset){
    let r = radius;
    let h = moduleHeight;
    let dif = offset - 1.5 * moduleHeight;
    let ratio = 1-(h/r);

    push();
    for(i=0;i<amount;i++){
        // base cylinder
    
        let ydif = (-2*h*i)+dif;
        push();
            translate(0, ydif+h , 0);
            if(toFill){fill(colors[i]);}else{noFill();}
            cylinder(r, h, 24, 1);
        pop();
    
        translate(r*ratio,ydif+(h/2),0)
        rotate(sliders[i][0].value(),createVector(0,0,1))
        translate(-r*ratio,-(ydif+(h/2)),0)
    
        //cylinder on top
        push();
            translate(0, ydif , 0);
            if(toFill){fill(colors[i]);}else{noFill();}
            cylinder(r, h, 24, 1);
        pop();
    
        
        rotate(sliders[i][1].value(),createVector(0,1,0))
    }
    pop();
}

function drawBasePlane(offset){
    push();
    fill(colors[colors.length-1])
    translate(0, offset , 0);
    rotateX(PI/2)
    plane(500);
    pop();
}

function drawSphere(v,s){
    push();
        translate(v.x,v.y,v.z);
        //noFill();
        sphere(s);
    pop();
}

function drawVectors(v_list){
    for (var i = 0;i < v_list.length; i++) {
        drawSphere(v_list[i],10)
    }
}

function connectVectors(v_list){

    // deze push en pops worden op veel plekken gebruikt
    // hiermee kan je dingen aanpassen zoals 
    // assenstelsel transleren, roteren, kleuren bepalen
    // en er terug uitpoppen zodat dit alleen geldt voor 
    // de statements die zich ertussen bevinden
    push();
        strokeWeight(4);
        stroke(255, 204, 0);
        let vorige;
        for (var i = 0;i < v_list.length; i++) {
            if (!vorige){
                vorige=v_list[i];
            }else{
                line(vorige.x,vorige.y,vorige.z,v_list[i].x,v_list[i].y,v_list[i].z);
                vorige=v_list[i];
            }
        }
    pop();
}