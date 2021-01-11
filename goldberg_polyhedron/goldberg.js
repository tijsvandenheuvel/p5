// http://paulbourke.net/geometry/platonic/

function setup() {
    createCanvas(750, 750, WEBGL);

    // param = edgelength
    triangles = initializeIcosaeder(200);
    
    radius = triangles[0][0].dist(createVector(0,0,0))

    pointsInTriangles = getAllPointsInTriangles(triangles)

    goldBergPolyherdon = projectPointsOnSphere(pointsInTriangles);

    //colorPerTriangle = getColorsPerTriangleRandom();
    colorPerTriangle = getColorsPerTriangleGradient();

    // these points form a T
    specificPoints = drawPointsOnSphereByIds([1,6,7,22,23,48,49,2,11,19,42,75]);

    singleCoordinate = getCooById(1);

    coordinatesById = getAllCoordinates();

    let cooJSON = JSON.stringify(coordinatesById)
    //console.log(cooJSON)
  }

// ------------------------------------------
// DRAW 
// ------------------------------------------

function draw(){
    background(50);
    stroke(255);

    // turn shape with mouse
    orbitControl();

    // auto turn 
    doRotate();
    
    //drawIcosaederVertices();
    //drawIcosaederEdges();
    //drawPointsOnIcosaederFaces(pointsInTriangles);

    drawPointsOnSphere(colorPerTriangle);
    drawSphere();

    //colorSpecificPointsOnSphereCode(colorPerTriangle);
    colorSpecificPointsOnSphere(specificPoints,colorPerTriangle);

    
}

// ------------------------------------------
// DRAW FUNCTIONS
// ------------------------------------------

function drawIcosaederEdges(){
    let c = color(0, 255, 0);
    triangles.forEach(function(t){
        push();
        //noFill();
        stroke(c)
        beginShape(TRIANGLES);
            vertex(t[0].x,t[0].y,t[0].z);
            vertex(t[1].x,t[1].y,t[1].z);
            vertex(t[2].x,t[2].y,t[2].z);
        endShape();
        pop();
    })
}

function drawIcosaederVertices(){
    let c = color('DarkViolet');
    vectors.forEach(function(v){
        push();
        fill(c);
        noStroke();
        translate(v.x, v.y, v.z);
        sphere(5, 5);
        pop();
    })
}

function drawPointsOnIcosaederFaces(innerPoints){
    let c = color(255, 0, 255);
    innerPoints.forEach(function(points){
        points.forEach(function(p){
            push();
            fill(c);
            noStroke();
            translate(p.x, p.y, p.z);
            sphere(5, 5);
            pop();
        })
    })
}

function colorSpecificPointsOnSphereCode(colors){
    i=0
    goldBergPolyherdon.forEach(function(triangle){
        triangle.forEach(function(v){
            push();
            if(v.z<55&&v.z>-55){
                fill(color(0, 0, 0));
            }else if (v.x<55&&v.x>-55){
                fill(color(0, 0, 0));
            }else if (v.y<55&&v.y>-55){
                fill(color(0, 0, 0));
            }
            else{fill(colors[i]);}
            noStroke();
            translate(v.x, v.y, v.z);
            sphere(5, 5);
            pop();
        })
        i++;
    })
}

function colorSpecificPointsOnSphere(specificPoints,colors){
    i=0
    goldBergPolyherdon.forEach(function(triangle){
        triangle.forEach(function(v){
            push();
            if(specificPoints.includes(v)){
                fill(color(0, 0, 0));
            }else{fill(colors[i]);}
            noStroke();
            translate(v.x, v.y, v.z);
            sphere(5, 5);
            pop();
        })
        i++;
    })
}

function drawPointsOnSphere(colors){
    let i=0
    goldBergPolyherdon.forEach(function(triangle){
        triangle.forEach(function(v){
            push();
            if(v==triangle[0]){
                fill(color(0, 0, 0));
            }else{fill(colors[i]);}
            noStroke();
            translate(v.x, v.y, v.z);
            sphere(5, 5);
            pop();
        })
        i++;
    })
}

function drawSphere(){
    push();
    translate(0, 0, 0);
    //noFill();
    sphere(radius);
    pop();
}

function doRotate(){
    rotateZ(frameCount * 0.001);
    rotateX(frameCount * 0.001);
    rotateY(frameCount * 0.001);
}

// ------------------------------------------
// CREATION OF ICOSAEDER & POINTS
// ------------------------------------------

function initializeIcosaeder(length){
    let a = length
    let phi = (1+sqrt(5))/2
    let b = length*phi/2

    // vertices
    v1=createVector(0, b,-a);
    v2=createVector(0, b, a);
    v3=createVector(0, -b, a);
    v4=createVector(0, -b,-a);
    v5=createVector(-b, a, 0);
    v6=createVector(-b, -a, 0);
    v7=createVector( b, a, 0);
    v8=createVector(b, -a, 0);
    v9=createVector(a, 0, b);
    v10=createVector(-a,0,-b);
    v11=createVector(a, 0,-b);
    v12=createVector(-a, 0,b);
    vectors = [v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12];

    // triangles
    t0=[v5,v1,v7];t1=[v5,v7,v2];t2=[v3,v12,v2];t3=[v2,v9,v3];
    t4=[v1,v4,v11];t5=[v4,v1,v10];t6=[v8,v6,v3];t7=[v8,v6,v4];
    t8=[v5,v12,v10];t9=[v6,v10,v12];t10=[v7,v11,v9];t11=[v8,v9,v11];
    t12=[v5,v2,v12];t13=[v9,v2,v7];t14=[v5,v10,v1];t15=[v11,v7,v1];
    t16=[v10,v4,v6];t17=[v8,v11,v4];t18=[v12,v3,v6];t19=[v8,v3,v9];
    triangles =[t0,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19]

    return triangles
}

function getAllPointsInTriangles(triangles){
    let innerPoints = []
    triangles.forEach(function(t){
        innerPoints.push(calculatePointsInTriangle(t));
    })
    return innerPoints
}

function calculatePointsInTriangle(t){
    // zijde middelpunt = ((x1+x2)/2,...,...)
    zmp = getMidpoint(t[0],t[1])

    // driehoek middelpunt = x1+ k(x2-x1)
    p6 = getOneThirdPoint(zmp,t[2])

    // punten tussen middelpunt en zmp's
    zmp1 = getMidpoint(t[2],t[1])
    zmp2 = getMidpoint(t[2],t[0])
    p5 = getMidpoint(p6,zmp)
    p12 = getMidpoint(p6,zmp1)
    p7 = getMidpoint(p6,zmp2)

    //middelpunt tussen middelpunt en hoekpunt
    p2 = getMidpoint(t[0],p6)
    p10 = getMidpoint(t[1],p6)
    p14 = getMidpoint(t[2],p6)

    // middelpunt tussen vorige punten en hoekpunt
    p0 = getMidpoint(t[0],p2)
    p9 = getMidpoint(t[1],p10)
    p15 = getMidpoint(t[2],p14)

    // punten tussen p0,p19,p15
    p3 = getOneThirdPoint(p0,p15)
    p8 = getOneThirdPoint(p15,p0)
    p1 = getOneThirdPoint(p0,p9)
    p4 = getOneThirdPoint(p9,p0)
    p11 = getOneThirdPoint(p9,p15)
    p13 = getOneThirdPoint(p15,p9)

    return [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15]
}

function getMidpoint(p1,p2){
    return createVector((p1.x+p2.x)/2,(p1.y+p2.y)/2,(p1.z+p2.z)/2)
}

function getOneThirdPoint(p1,p2){
    return createVector(p1.x+(1/3)*(p2.x-p1.x),p1.y+(1/3)*(p2.y-p1.y),p1.z+(1/3)*(p2.z-p1.z))
}

function projectPointsOnSphere(pointsInTriangles){
    let pointsOnSphere=[]
    // for every point 
    // get distance from center, multiply each coordinate by factor: radius/distance
    pointsInTriangles.forEach(function(points){
        let pointsPerSphericTriangle=[]
        points.forEach(function(p){
            distance = dist(0, 0,0, p.x, p.y,p.z)
            factor = radius/distance
            pointsPerSphericTriangle.push(createVector(p.x*factor, p.y*factor,p.z*factor))
        })
        pointsOnSphere.push(pointsPerSphericTriangle)
    })
    return pointsOnSphere;
}

// ------------------------------------------
// COORDINATE FUNCTIONS
// ------------------------------------------

function getAllCoordinates(){
    // get all coo of per id
    // id:1 == co[0]
    let coById=[]
    for(i=1;i<=320;i++){
        let v = getCooById(i)
        if(v){
            let pointObj = {id:i,x:v.x,y:v.y,z:v.z}
            coById.push(pointObj)
        }else{console.log(i)}
    }
    return coById
}

function getCoo(t_int,t_arr,id){
    gp = goldBergPolyherdon
    let up = [0,1,12,8,14,10,3,4,18,16];
    let down = [6,7,11,19,17,15,13,2,9,5];
    if(up.includes(t_int)){
        // point in gp in triangle
        return gp[t_int][t_arr.indexOf(id)]
    }else{
        t_arr = t_arr.reverse()
        return gp[t_int][t_arr.indexOf(id)]
    }
}

function getCooById(id){
        t0 = [1,20,6,7,44,45,21,22,23,78,79,80,46,47,48,49]
        t1 = [2,8,9,10,24,25,26,27,28,50,51,52,53,54,55,56]
        t12 = [3,11,12,13,29,30,31,32,33,57,58,59,60,61,62,63]
        t8 = [4,14,15,16,34,35,36,37,38,64,65,66,67,68,69,70]
        t14= [5,17,18,19,39,40,41,42,43,71,72,73,74,75,76,77]
        t5= [110,111,112,113,114,115,116,151,152,153,154,155,191,192,193,232]
        t4 = [117,156,157,158,194,195,196,197,198,233,234,235,236,237,238,239]
        t15 =[118,119,120,81,82,83,84,159,160,121,122,123,199,200,161,240]
        t10 = [85,124,125,126,162,163,164,165,166,201,202,203,204,205,206,207]
        t13 = [86,87,88,89,90,91,92,127,128,129,130,131,167,168,169,208]
        t3 = [93,132,133,134,170,171,172,173,174,209,210,211,212,213,214,215]
        t2 = [94,95,96,97,98,99,100,135,136,137,138,139,175,176,177,216]
        t18 = [101,140,141,142,178,179,180,181,182,217,218,219,220,221,222,223]
        t9 = [102,103,104,105,106,107,108,143,144,145,146,147,183,184,185,224]
        t16 = [109,148,149,150,186,187,188,189,190,225,226,227,228,229,230,231]
        t7 = [262,263,264,265,266,267,268,291,292,293,294,295,310,311,312,319]
        t17 = [269,270,271,272,273,274,275,296,297,298,299,300,313,314,315,320]
        t11 = [241,242,243,244,245,246,247,276,277,278,279,280,301,302,303,316]
        t19 = [248,249,250,251,252,253,254,281,282,283,284,285,304,305,306,317]
        t6 = [255,256,257,258,259,260,261,286,287,288,289,290,307,308,309,318]
        // top 
        if(t0.includes(id)){
            return getCoo(0,t0,id)
        }else if(t1.includes(id)){
            return getCoo(1,t1,id)
        }else if(t12.includes(id)){
            return getCoo(12,t12,id)
        }else if(t8.includes(id)){
            return getCoo(8,t8,id)
        }else if(t14.includes(id)){
            return getCoo(14,t14,id)}
        //middle
        else if(t5.includes(id)){
            return getCoo(5,t5,id)
        }else if(t4.includes(id)){
            return getCoo(4,t4,id)
        }else if(t15.includes(id)){
            return getCoo(15,t15,id)
        }else if(t10.includes(id)){
            return getCoo(10,t10,id)
        }else if(t13.includes(id)){
            return getCoo(13,t13,id)
        }else if(t3.includes(id)){
            return getCoo(3,t3,id)
        }else if(t2.includes(id)){
            return getCoo(2,t2,id)
        }else if(t18.includes(id)){
            return getCoo(18,t18,id)
        }else if(t9.includes(id)){
            return getCoo(9,t9,id)
        }else if(t16.includes(id)){
            return getCoo(16,t16,id)}
        //bottom
        else if(t7.includes(id)){
            return getCoo(7,t7,id)
        }else if(t17.includes(id)){
            return getCoo(17,t17,id)
        }else if(t11.includes(id)){
            return getCoo(11,t11,id)
        }else if(t19.includes(id)){
            return getCoo(19,t19,id)
        }else if(t6.includes(id)){
            return getCoo(6,t6,id)
        }
}

function drawPointsOnSphereByIds(ids){
    let selectedPoints = []
    ids.forEach(id=>{
        selectedPoints.push(getCooById(id));
    })
    return selectedPoints;
}

// ------------------------------------------
// COLOR TRIANGLE FUNCTIONS
// ------------------------------------------

function getColorsPerTriangleRandom(){
    let colorsPerTriangle = []
    for(i=0;i<20;i++){
        colorsPerTriangle.push(color(random(0,255), random(0,255), random(0,255)));
    }
    return colorsPerTriangle
}
function getColorsPerTriangleGradient(){
    let colorsPerTriangle = []
    for(i=0;i<20;i++){
        switch(i) {
            // top 
            case 0:
                colorsPerTriangle.push(color(230,0,50))
              break;
            case 1:
                colorsPerTriangle.push(color(230,0,10))
              break;
            case 12:
                colorsPerTriangle.push(color(230,40,5))
              break;
            case 8:
                colorsPerTriangle.push(color(230,80,5))
                break;
            case 14:
                colorsPerTriangle.push(color(230,120,10))
                break;
            //middle 
            case 5:
                colorsPerTriangle.push(color(235,165,10))
              break;
            case 4:
                colorsPerTriangle.push(color(235,205,15))
              break;
            case 15:
                colorsPerTriangle.push(color(230,240,15))
              break;
            case 10:
                colorsPerTriangle.push(color(190,240,20))
                break;
            case 13:
                colorsPerTriangle.push(color(150,240,20))
                break;
            case 3:
                colorsPerTriangle.push(color(120,240,20))
              break;
            case 2:
                colorsPerTriangle.push(color(80,245,25))
              break;
            case 18:
                colorsPerTriangle.push(color(40,245,25))
              break;
            case 9:
                colorsPerTriangle.push(color(30,245,50))
                break;
            case 16:
                colorsPerTriangle.push(color(30,250,95))
                break;
            // bottom
            case 7:
                colorsPerTriangle.push(color(35,250,135))
              break;
            case 17:
                colorsPerTriangle.push(color(40,250,175))
              break;
            case 11:
                colorsPerTriangle.push(color(40,250,215))
              break;
            case 19:
                colorsPerTriangle.push(color(45,250,250))
                break;
            case 6:
                colorsPerTriangle.push(color(45,220,255))
                break;
          } 
    }
    return colorsPerTriangle
}