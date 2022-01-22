var r;
function setup() {
	screenHeight = windowHeight - 30;
	screenWidth = windowWidth - 30;

	createCanvas(screenWidth, screenHeight, WEBGL);

	getCheckboxes();

	getGeometricObjects();
}

function draw() {
	orbitControl();
	if (frameCount % 10 == 0) {
		if (slider.value() != r) {
			r = slider.value();
			getGeometricObjects();
		}

		background(200);

		if (icosahedron_check) {
			drawIcosahedron();
		}

		if (dodecahedron_check) {
			drawDodecahedron();
		}

		if (octahedron_check) {
			drawOctahedron();
		}

		if (hexahedron_check) {
			drawHexahedron();
		}

		if (tetrahedron_check) {
			drawTetrahedron();
		}
	}
}

getGeometricObjects = () => {
	c = createVector(0, 0, 0);

	i = getIco();

	d = getDode();

    h = getHexa();

	o = getOcta();

	t = getTetra();
};

getIco = () => {
	let a = r;
	let phi = (1 + sqrt(5)) / 2;
	let b = a * phi;

	// vertices
	v1 = createVector(0, b, -a);
	v2 = createVector(0, b, a);
	v3 = createVector(0, -b, a);
	v4 = createVector(0, -b, -a);
	v5 = createVector(-b, a, 0);
	v6 = createVector(-b, -a, 0);
	v7 = createVector(b, a, 0);
	v8 = createVector(b, -a, 0);
	v9 = createVector(a, 0, b);
	v10 = createVector(-a, 0, -b);
	v11 = createVector(a, 0, -b);
	v12 = createVector(-a, 0, b);
	ico = [v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12];

	return ico;
};

getDode = () => {
    let dode = [
        getMiddleOfTriangle(i[0],i[1],i[4]),
        getMiddleOfTriangle(i[0],i[4],i[9]),
        getMiddleOfTriangle(i[0],i[9],i[10]),
        getMiddleOfTriangle(i[0],i[10],i[6]),
        getMiddleOfTriangle(i[0],i[6],i[1]),

        getMiddleOfTriangle(i[1],i[4],i[11]),
        getMiddleOfTriangle(i[4],i[9],i[5]),
        getMiddleOfTriangle(i[9],i[10],i[3]),
        getMiddleOfTriangle(i[10],i[6],i[7]),
        getMiddleOfTriangle(i[6],i[1],i[8]),

        getMiddleOfTriangle(i[1],i[11],i[8]),
        getMiddleOfTriangle(i[4],i[5],i[11]),
        getMiddleOfTriangle(i[9],i[3],i[5]),
        getMiddleOfTriangle(i[10],i[7],i[3]),
        getMiddleOfTriangle(i[6],i[8],i[7]),

        getMiddleOfTriangle(i[11],i[8],i[2]),
        getMiddleOfTriangle(i[5],i[11],i[2]),
        getMiddleOfTriangle(i[3],i[5],i[2]),
        getMiddleOfTriangle(i[7],i[3],i[2]),
        getMiddleOfTriangle(i[8],i[7],i[2]),
    ]
    return dode
};

getHexa = () =>{
    let hexa = [
        d[0],
        d[2],
        d[8],
        d[9],
        d[11],
        d[12],
        d[18],
        d[15]
    ]
    return hexa
}

getOcta = () =>{
    let octa = [
        getMiddleOfSquare(h[0],h[1],h[2],h[3]),
        getMiddleOfSquare(h[0],h[1],h[4],h[5]),
        getMiddleOfSquare(h[1],h[2],h[5],h[6]),
        getMiddleOfSquare(h[2],h[3],h[6],h[7]),
        getMiddleOfSquare(h[3],h[0],h[7],h[4]),
        getMiddleOfSquare(h[4],h[5],h[6],h[7]),
    ]
    return octa
}

getTetra = () =>{
    return [
        h[0],
        h[2],
        h[5],
        h[7]
    ]
}

drawTetrahedron = () =>{
    stroke(255,230,0)

    drawLine(t[0],t[1])
    drawLine(t[0],t[2])
    drawLine(t[0],t[3])
    drawLine(t[2],t[1])
    drawLine(t[3],t[2])
    drawLine(t[1],t[3])

    if (spheres_check){t.forEach(p => drawSphere(p,(t[0].dist(t[1]))/2))}
    if (points_check){t.forEach(p => drawPoint(p))}
}

drawOctahedron = () =>{
    stroke(50,200,50)

    drawLine(o[0],o[1])
    drawLine(o[0],o[2])
    drawLine(o[0],o[3])
    drawLine(o[0],o[4])

    drawLine(o[4],o[1])
    drawLine(o[1],o[2])
    drawLine(o[2],o[3])
    drawLine(o[3],o[4])

    drawLine(o[5],o[1])
    drawLine(o[5],o[2])
    drawLine(o[5],o[3])
    drawLine(o[5],o[4])

    if (spheres_check){o.forEach(p => drawSphere(p,(o[0].dist(o[1]))/2))}
    if (points_check){o.forEach(p => drawPoint(p))}
}

drawHexahedron = () =>{
    stroke(220,20,60);

    drawLine(h[0],h[1])
    drawLine(h[1],h[2])
    drawLine(h[2],h[3])
    drawLine(h[3],h[0])

    drawLine(h[0],h[4])
    drawLine(h[1],h[5])
    drawLine(h[2],h[6])
    drawLine(h[3],h[7])

    drawLine(h[5],h[4])
    drawLine(h[6],h[5])
    drawLine(h[7],h[6])
    drawLine(h[4],h[7])

    if (spheres_check){h.forEach(p => drawSphere(p,(h[0].dist(h[1]))/2))}
    if (points_check){h.forEach(p => drawPoint(p))}
}

drawDodecahedron = () =>{
    stroke(255,0,255);

    drawLine(d[0],d[1])
    drawLine(d[1],d[2])
    drawLine(d[2],d[3])
    drawLine(d[3],d[4])
    drawLine(d[4],d[0])

    drawLine(d[0],d[5])
    drawLine(d[1],d[6])
    drawLine(d[2],d[7])
    drawLine(d[3],d[8])
    drawLine(d[4],d[9])

    drawLine(d[5],d[10])
    drawLine(d[5],d[11])
    drawLine(d[6],d[11])
    drawLine(d[6],d[12])
    drawLine(d[7],d[12])
    drawLine(d[7],d[13])
    drawLine(d[8],d[13])
    drawLine(d[8],d[14])
    drawLine(d[9],d[14])
    drawLine(d[9],d[10])

    drawLine(d[10],d[15])
    drawLine(d[11],d[16])
    drawLine(d[12],d[17])
    drawLine(d[13],d[18])
    drawLine(d[14],d[19])

    drawLine(d[16],d[15])
    drawLine(d[17],d[16])
    drawLine(d[18],d[17])
    drawLine(d[19],d[18])
    drawLine(d[15],d[19])

    if (spheres_check){d.forEach(p => drawSphere(p,(d[0].dist(d[1]))/2))}
    if (points_check){d.forEach(p => drawPoint(p))}
}

drawIcosahedron = () => {

    stroke(255,165,0);

	drawLine(i[0], i[1]);
	drawLine(i[0], i[4]);
	drawLine(i[0], i[6]);
	drawLine(i[0], i[9]);
	drawLine(i[0], i[10]);

	drawLine(i[1], i[4]);
	drawLine(i[4], i[9]);
	drawLine(i[9], i[10]);
	drawLine(i[10], i[6]);
	drawLine(i[6], i[1]);

	drawLine(i[1], i[8]);
	drawLine(i[1], i[11]);
	drawLine(i[8], i[11]);

	drawLine(i[4], i[11]);
	drawLine(i[4], i[5]);
	drawLine(i[11], i[5]);

	drawLine(i[9], i[5]);
	drawLine(i[9], i[3]);
	drawLine(i[5], i[3]);

	drawLine(i[10], i[3]);
	drawLine(i[10], i[7]);
	drawLine(i[3], i[7]);

	drawLine(i[6], i[7]);
	drawLine(i[6], i[8]);
	drawLine(i[7], i[8]);

	drawLine(i[2], i[3]);
	drawLine(i[2], i[5]);
	drawLine(i[2], i[7]);
	drawLine(i[2], i[8]);
	drawLine(i[2], i[11]);

    if (spheres_check){i.forEach(p => drawSphere(p,(i[0].dist(i[1]))/2))}
    if (points_check){i.forEach(p => drawPoint(p))}
};

drawPoint = (p) => {
	push();
	fill(255);
	noStroke();
	translate(p.x, p.y, p.z);
	sphere(5, 5);
	pop();
};

drawSphere = (p,r) => {
	push();
	noFill();
	stroke(2, 105, 164);
	translate(p.x, p.y, p.z);
	sphere(r);
	pop();
};

drawLine = (p1, p2) => {
	push();
	//stroke(50);
	strokeWeight(5);
	beginShape();
	vertex(p1.x, p1.y, p1.z);
	vertex(p2.x, p2.y, p2.z);
	endShape();
	pop();
};


function getMiddleOfLine(p1, p2) {
	return createVector(
		(p1.x + p2.x) / 2,
		(p1.y + p2.y) / 2,
		(p1.z + p2.z) / 2
	);
}
function getMiddleOfTriangle(p1, p2,p3) {
	return createVector(
		(p1.x + p2.x + p3.x) / 3,
		(p1.y + p2.y + p3.y) / 3,
		(p1.z + p2.z + p3.z) / 3
	);
}

function getMiddleOfSquare(p1, p2, p3, p4) {
	return createVector(
		(p1.x + p2.x + p3.x + p4.x) / 4,
		(p1.y + p2.y + p3.y + p4.y) / 4,
		(p1.z + p2.z + p3.z + p4.z) / 4,
	);
}
