var r;
var z = r * 2;
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
			z = r * 2;
            console.log(r)
			getGeometricObjects();
		}

		background(200);

		if (metatron_check) {
			drawMetatron();

			if (spheres_check) {
				drawLife();
			}
		}

		if (tetrahedron_check) {
			drawTetrahedron();
		}

		if (hexahedron_check) {
			drawHexahedron();
		}

		if (octahedron_check) {
			drawOctahedron();
		}

		if (isocahedron_check) {
			drawIsocahedron();
		}
	}
}

getGeometricObjects = () => {
	c = createVector(0, 0, 0);
	life = getLife();

	octa = getOcta();

	h = getHexa();

	t = getTetra();

	i = getIso();
};

getLife = () => {
	let l1 = [
		c,
		createVector(c.x, c.y + 2 * r, c.z),
		createVector(c.x, c.y - 2 * r, c.z),
		createVector(c.x - (sqrt(3) / 2) * r * 2, c.y - r, c.z),
		createVector(c.x - (sqrt(3) / 2) * r * 2, c.y + r, c.z),
		createVector(c.x + (sqrt(3) / 2) * r * 2, c.y - r, c.z),
		createVector(c.x + (sqrt(3) / 2) * r * 2, c.y + r, c.z),
	];
	let l = [
		c,
		createVector(c.x, c.y + 2 * r, c.z),
		createVector(c.x, c.y - 2 * r, c.z),

		createVector(c.x, c.y, c.z + 2 * r),
		createVector(c.x, c.y, c.z - 2 * r),

		createVector(c.x + 2 * r, c.y, c.z),
		createVector(c.x - 2 * r, c.y, c.z),

		createVector(c.x, c.y + 4 * r, c.z),
		createVector(c.x, c.y - 4 * r, c.z),

		createVector(c.x, c.y, c.z + 4 * r),
		createVector(c.x, c.y, c.z - 4 * r),

		createVector(c.x + 4 * r, c.y, c.z),
		createVector(c.x - 4 * r, c.y, c.z),
	];

	return l;
};

getOcta = () => {
	let o = [
		createVector(c.x, c.y + 2 * r, c.z),
		createVector(c.x, c.y - 2 * r, c.z),
		createVector(c.x, c.y, c.z + 2 * r),
		createVector(c.x, c.y, c.z - 2 * r),
		createVector(c.x + 2 * r, c.y, c.z),
		createVector(c.x - 2 * r, c.y, c.z),
	];
	return o;
};

getHexa = () => {
	let h = [
		c,

		createVector(c.x, c.y + 2 * r, c.z),
		createVector(c.x, c.y, c.z + 2 * r),
		createVector(c.x + 2 * r, c.y, c.z),

		createVector(c.x + 2 * r, c.y + 2 * r, c.z),
		createVector(c.x + 2 * r, c.y, c.z + 2 * r),
		createVector(c.x, c.y + 2 * r, c.z + 2 * r),

		createVector(c.x + 2 * r, c.y + 2 * r, c.z + 2 * r),
	];
	return h;
};

getTetra = () => {
	let tetra = [
		c,
		createVector(c.x + z, c.y, c.z),
		createVector(c.x + r, c.y + z * (sqrt(3) / 2), c.z),
		createVector(c.x + r, c.y + r / sqrt(3), c.z + (z / 3) * sqrt(6)),
	];
	return tetra;
};

getIso = () => {
    let a = r* 1.0514623;
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
	iso = [v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12,c];

    console.log(c.dist(v1))

	return iso;
};

drawIsocahedron = () => {

    drawLine(i[0],i[2])

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


	if (spheres_check) {
		i.forEach((p) => {
			drawPoint(p);
			drawSphere(p);
		});
	}
};

drawTetrahedron = () => {
	drawLine(t[0], t[1]);
	drawLine(t[0], t[2]);
	drawLine(t[0], t[3]);
	drawLine(t[2], t[1]);
	drawLine(t[3], t[2]);
	drawLine(t[1], t[3]);

	if (spheres_check) {
		t.forEach((p) => {
			drawPoint(p);
			drawSphere(p);
		});
	}
};

drawOctahedron = () => {
	let t = [octa[0], octa[1], octa[2], octa[3], octa[4], octa[5], c];
	//t.forEach(p=>drawPoint(p))

	drawLine(t[0], t[2]);
	drawLine(t[0], t[3]);
	drawLine(t[0], t[4]);
	drawLine(t[0], t[5]);
	drawLine(t[1], t[2]);
	drawLine(t[1], t[3]);
	drawLine(t[1], t[4]);
	drawLine(t[1], t[5]);
	drawLine(t[2], t[4]);
	drawLine(t[2], t[5]);
	drawLine(t[3], t[4]);
	drawLine(t[3], t[5]);

	if (spheres_check) {
		t.forEach((p) => {
			drawPoint(p);
			drawSphere(p);
		});
	}
};

drawHexahedron = () => {
	//h.forEach(p=>drawPoint(p))

	drawLine(h[0], h[1]);
	drawLine(h[0], h[2]);
	drawLine(h[0], h[3]);

	drawLine(h[1], h[4]);
	drawLine(h[1], h[6]);

	drawLine(h[2], h[6]);
	drawLine(h[2], h[5]);

	drawLine(h[3], h[4]);
	drawLine(h[3], h[5]);

	drawLine(h[7], h[4]);
	drawLine(h[7], h[5]);
	drawLine(h[7], h[6]);

	if (spheres_check) {
		h.forEach((p) => {
			drawPoint(p);
			drawSphere(p);
		});
	}
};

drawMetatron = () => {
	push();
	stroke(255);
	strokeWeight(1);
	life.forEach((p1) => {
		life.forEach((p2) => {
			beginShape();
			vertex(p1.x, p1.y, p1.z);
			vertex(p2.x, p2.y, p2.z);
			endShape();
		});
	});
	pop();
};

drawLife = () => {
	life.forEach((p) => {
		drawPoint(p);
		drawSphere(p);
	});
};

drawPoint = (p) => {
	push();
	fill("red");
	noStroke();
	translate(p.x, p.y, p.z);
	sphere(5, 5);
	pop();
};

drawSphere = (p) => {
	push();
	noFill();
	stroke(2, 105, 164);
	translate(p.x, p.y, p.z);
	sphere(r);
	pop();
};

drawLine = (p1, p2) => {
	push();
	stroke(50);
	strokeWeight(5);
	beginShape();
	vertex(p1.x, p1.y, p1.z);
	vertex(p2.x, p2.y, p2.z);
	endShape();
	pop();
};
