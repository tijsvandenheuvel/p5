var r = 60;
function setup() {
    screenHeight = windowHeight - 30;
    screenWidth = windowWidth - 30;

	createCanvas(screenWidth, screenHeight);

    getCheckboxes();

    getGeometricObjects();

}

function draw() {
	if (frameCount % 10 == 0) {
        if(slider.value()!=r){
            r = slider.value();
            getGeometricObjects();
        }
        
		background(200);
        if(background_check){
            centers.forEach((c) => {
                drawcircle(c, r);
                //drawPoint(c);
            });
        }
        if(metatron_check){
            drawMetatron();
        }
        if(fruitoflife_check){
            drawfruitOflife();
        }
        if(tetrahedron_check){
            drawTetrahedron();
        }
        if(hexahedron_check){
            drawCube();
        }
        if(octahedron_check){
            drawOctahedron();
        }
        if(dodecahedron_check){
            drawDodecahedron();
        }
        if(isocahedron_check){
            drawIsocahedron();
        }
	}
}

getGeometricObjects = () =>{
// get background
c1 = createVector(0, screenHeight / 2);
centers = [c1];
getBackground(c1);

//get fruit of life
fruitOfLife = [getCenter()];

// get metatron
growMeta(1);
growMeta(2);

}

drawIsocahedron = () =>{
    let iso = [
        fruitOfLife[7],
        fruitOfLife[8],
        fruitOfLife[9],
        fruitOfLife[10],
        fruitOfLife[11],
        fruitOfLife[12],
        fruitOfLife[1],
        fruitOfLife[5],
        fruitOfLife[6],
    ]
    drawLine(iso[0],iso[3])
    drawLine(iso[0],iso[2])
    drawLine(iso[0],iso[6])
    drawLine(iso[2],iso[4])
    drawLine(iso[2],iso[7])
    drawLine(iso[2],iso[6])
    drawLine(iso[3],iso[5])
    drawLine(iso[3],iso[8])
    drawLine(iso[3],iso[6])
    drawLine(iso[4],iso[7])
    drawLine(iso[4],iso[1])
    drawLine(iso[5],iso[1])
    drawLine(iso[5],iso[8])
    drawLine(iso[1],iso[7])
    drawLine(iso[1],iso[8])
    drawLine(iso[6],iso[7])
    drawLine(iso[6],iso[8])
    drawLine(iso[7],iso[8])
}

drawDodecahedron = () =>{
    let fol = fruitOfLife;

    let dode = [
        fol[0],
        intersect(fol[0],fol[3],fol[1],fol[11]),
        intersect(fol[0],fol[4],fol[1],fol[12]),
        intersect(fol[0],fol[2],fol[5],fol[12]),

        intersect(fol[8],fol[9],fol[11],fol[6]),
        intersect(fol[8],fol[9],fol[11],fol[1]),

        intersect(fol[11],fol[7],fol[9],fol[2]),
        intersect(fol[11],fol[7],fol[9],fol[4]),

        intersect(fol[11],fol[12],fol[8],fol[3]),
        intersect(fol[11],fol[12],fol[8],fol[4]),

        intersect(fol[10],fol[9],fol[7],fol[5]),
        intersect(fol[10],fol[9],fol[7],fol[6]),

        intersect(fol[10],fol[8],fol[12],fol[1]),
        intersect(fol[10],fol[8],fol[12],fol[5]),

        intersect(fol[12],fol[7],fol[10],fol[3]),
        intersect(fol[12],fol[7],fol[10],fol[2]),
    ]

    drawLine(dode[0],dode[1])
    drawLine(dode[0],dode[2])
    drawLine(dode[0],dode[3])

    drawLine(dode[1],dode[5])
    drawLine(dode[5],dode[6])
    drawLine(dode[6],dode[7])
    drawLine(dode[7],dode[10])
    drawLine(dode[10],dode[1])

    drawLine(dode[10],dode[11])
    drawLine(dode[11],dode[2])

    drawLine(dode[11],dode[14])
    drawLine(dode[14],dode[15])
    drawLine(dode[15],dode[12])
    drawLine(dode[12],dode[2])

    drawLine(dode[12],dode[13])
    drawLine(dode[13],dode[3])

    drawLine(dode[13],dode[9])
    drawLine(dode[9],dode[8])
    drawLine(dode[8],dode[4])
    drawLine(dode[4],dode[3])
    drawLine(dode[4],dode[5])

}

drawOctahedron = () =>{
    let octa = [
        fruitOfLife[7],
        fruitOfLife[8],
        fruitOfLife[9],
        fruitOfLife[10],
        fruitOfLife[11],
        fruitOfLife[12],
    ]

    //octa.forEach(p=>drawPoint(p))

    drawLine(octa[0],octa[3])
    drawLine(octa[0],octa[5])
    drawLine(octa[3],octa[5])

    drawLine(octa[0],octa[2])
    drawLine(octa[0],octa[4])
    drawLine(octa[2],octa[4])

    drawLine(octa[1],octa[4])
    drawLine(octa[1],octa[5])
    drawLine(octa[4],octa[5])

}

drawTetrahedron = () => {
    let tetra = [
        fruitOfLife[0],
        fruitOfLife[7],
        fruitOfLife[11],
        fruitOfLife[12],
    ]
   //tetra.forEach(p=>drawPoint(p))
    drawLine(tetra[0],tetra[1])
    drawLine(tetra[0],tetra[2])
    drawLine(tetra[0],tetra[3])
    drawLine(tetra[1],tetra[2])
    drawLine(tetra[1],tetra[3])
    drawLine(tetra[2],tetra[3])
}

drawCube = () => {
    let cube = [
        fruitOfLife[0],
        fruitOfLife[7],
        fruitOfLife[8],
        fruitOfLife[9],
        fruitOfLife[10],
        fruitOfLife[11],
        fruitOfLife[12],
    ]
    drawLine(cube[0],cube[2])
    drawLine(cube[0],cube[3])
    drawLine(cube[0],cube[4])
    drawLine(cube[1],cube[3])
    drawLine(cube[1],cube[4])
    drawLine(cube[5],cube[2])
    drawLine(cube[5],cube[3])
    drawLine(cube[6],cube[2])
    drawLine(cube[6],cube[4])
}

drawfruitOflife = () =>{
    push();
        strokeWeight(3);
		stroke(105, 2, 164);
		noFill();
    fruitOfLife.forEach((c) => {
		
		circle(c.x, c.y, r * 2);
	});

    pop();

}

drawMetatron = () => {
	push();
	    stroke(255);
	    strokeWeight(1);
	    fruitOfLife.forEach((p) => {
		    fruitOfLife.forEach((p2) => {
			    line(p.x, p.y, p2.x, p2.y);
		    });
	    });
    pop();
};

growMeta = (x) => {
	let c = getCenter();
	let tt = createVector(c.x, c.y - 2 * r * x);
	let bb = createVector(c.x, c.y + 2 * r * x);
	let ltt = createVector(c.x - (sqrt(3) / 2) * r * 2 * x, c.y - r * x);
	let ldd = createVector(c.x - (sqrt(3) / 2) * r * 2 * x, c.y + r * x);
	let rtt = createVector(c.x + (sqrt(3) / 2) * r * 2 * x, c.y - r * x);
	let rdd = createVector(c.x + (sqrt(3) / 2) * r * 2 * x, c.y + r * x);

	fruitOfLife = fruitOfLife.concat([tt, bb, ltt, rtt, ldd, rdd]);
};

getCenter = () => {
	let xfactor = floor(screenWidth / ((sqrt(3) / 2) * r) / 2);
	if (xfactor % 2 != 0) {
		xfactor++;
	}
	let xcenter = (sqrt(3) / 2) * r * xfactor;
	let center = createVector(xcenter, screenHeight / 2);
	return center;
};

growBackground = (col, up) => {
	next_points = [];
	col.forEach((p) => {
		if (up && p.y - r / 2 > -r && p.x < screenWidth) {
			next_points.push(
				createVector(p.x + (sqrt(3) / 2) * r, p.y - r / 2)
			);
		}
		if (!up && p.y + r / 2 < screenHeight + r && p.x < screenWidth) {
			next_points.push(
				createVector(p.x + (sqrt(3) / 2) * r, p.y + r / 2)
			);
		}
	});
	return next_points;
};

growFirstColBackground = (points) => {
	next_points = points;
	points.forEach((p) => {
		for (i = 1; p.y - r * i > 0; i++) {
			next_points.push(createVector(p.x, p.y - r * i));
		}
		for (i = 1; p.y + r * i < screenHeight; i++) {
			next_points.push(createVector(p.x, p.y + r * i));
		}
	});
	return next_points;
};

getBackground = (c) => {
	let col = centers;
	for (i = 0; col[0].x < screenWidth; i++) {
		if (i == 0) {
			newcol = growFirstColBackground(col);
		} else {
			newcol = growBackground(col, i % 2 != 0);
		}
		centers = centers.concat(newcol);
		col = newcol;
	}
};

drawcircle = (coo, diameter) => {
	strokeWeight(3);

	stroke(2, 105, 164);
	noFill();
	circle(coo.x, coo.y, diameter * 2);
};

drawPoint = (coo) => {
	strokeWeight(10);
	stroke("red");
	point(coo.x, coo.y);
};

drawLine = (p1,p2) =>{
    stroke(50);
	strokeWeight(2);
    line(p1.x, p1.y, p2.x, p2.y);

}

function intersect(point1, point2, point3, point4) {
    const ua = ((point4.x - point3.x) * (point1.y - point3.y) - 
              (point4.y - point3.y) * (point1.x - point3.x)) /
             ((point4.y - point3.y) * (point2.x - point1.x) - 
              (point4.x - point3.x) * (point2.y - point1.y));
   
   const ub = ((point2.x - point1.x) * (point1.y - point3.y) - 
              (point2.y - point1.y) * (point1.x - point3.x)) /
             ((point4.y - point3.y) * (point2.x - point1.x) - 
              (point4.x - point3.x) * (point2.y - point1.y));
   
   const x = point1.x + ua * (point2.x - point1.x);
   const y = point1.y + ua * (point2.y - point1.y);
   
   return createVector(x,y)
}