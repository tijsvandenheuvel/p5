var spheres_check = false;
var points_check = true;
var tetrahedron_check = true;
var hexahedron_check = true;
var octahedron_check = true;
var dodecahedron_check = true;
var icosahedron_check = true;



function getCheckboxes(){
    ui_x_pos = windowWidth * (5 / 6);

    slider = createSlider(0, 200, r, 0.1); // min, max, start
    slider.position(ui_x_pos,10);
    slider.size(100, 20);

    checkbox_fruitoflife = createCheckbox("points", points_check);
	checkbox_fruitoflife.changed(myCheckedEvent2);
	checkbox_fruitoflife.position(ui_x_pos, 40);

    checkbox_fruitoflife = createCheckbox("spheres", spheres_check);
	checkbox_fruitoflife.changed(myCheckedEvent3);
	checkbox_fruitoflife.position(ui_x_pos, 60);

    checkbox_floweroflife = createCheckbox("tetrahedron", tetrahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent4);
	checkbox_floweroflife.position(ui_x_pos, 100);


    checkbox_floweroflife = createCheckbox("icosahedron", icosahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent8);
	checkbox_floweroflife.position(ui_x_pos, 160);

    checkbox_floweroflife = createCheckbox("dodecahedron", dodecahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent7);
	checkbox_floweroflife.position(ui_x_pos, 120);

    checkbox_floweroflife = createCheckbox("hexahedron", hexahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent5);
	checkbox_floweroflife.position(ui_x_pos, 140);

 
    checkbox_floweroflife = createCheckbox("octahedron", octahedron_check);
	checkbox_floweroflife.changed(myCheckedEvent6);
	checkbox_floweroflife.position(ui_x_pos, 180);

}

function myCheckedEvent2(){
    points_check = this.checked();
}
function myCheckedEvent3(){
    spheres_check = this.checked();
}
function myCheckedEvent4(){
    tetrahedron_check = this.checked();
}
function myCheckedEvent5(){
    hexahedron_check = this.checked();
}
function myCheckedEvent6(){
    octahedron_check = this.checked();
}
function myCheckedEvent7(){
    dodecahedron_check = this.checked();
}
function myCheckedEvent8(){
    icosahedron_check = this.checked();
}
