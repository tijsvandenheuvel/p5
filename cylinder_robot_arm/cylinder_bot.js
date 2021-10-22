
// hiermee kunt ge via UI checkbox de simulatie stoppen
var runsim_checkbox_value = true;
var color_checkbox_value = true;
var lines_checkbox_value = false;
var points_checkbox_value = false;
var orbit_checkbox_value = false;

// deze functie wordt normaal gezien 1 malig uitgevoerd in het begin
// kan ook aangeroepen worden voor iets resetten
function setup(modules=2,radius=150,height=50) {

    // initialiseer beeld met afmetingen en render engine
    createCanvas(windowWidth*2/3, windowHeight*4/5, WEBGL);

    // properties / constructor
    // hiermee kunt ge de simulatie parameteriseren
    numberOfModules = modules;
    moduleRadius = radius; 
    moduleSegmentHeight = height;

    // knopkes, vakskes, checkboxkes zie support.js voor details
    createUIElements();
    
    // init sliders 
    sliders = getSliders(numberOfModules);
    // genereer een array van random kleuren
    colors = getColors(numberOfModules+1);

    // een variabele die bepaald hoeveel de figuur naar beneden verplaatst wordt
    // zodat het zo goed mogelijk op het scherm past
    // is dus parameteriseerbaar
    offset = (moduleSegmentHeight*numberOfModules)+ 1.5 * moduleSegmentHeight;
} 

// loopt 30-60 maal per seconden
// zo snel als het kan eigenlijk
function draw(){
    if(runsim_checkbox_value){
        // elke frame reset en opnieuw tekenen
        background(50);
        stroke(255);
 
        // laat toe figuur met muis te manipuleren 
        if(orbit_checkbox_value){
            orbitControl();
        }

        // tekent referentie/ grond oppervlakske
        // zie draw_modules.js
        drawBasePlane(offset=offset);

        // tekent de cylinder modules
        // zet toFill = true om gekleurde cylinders te krijgen
        // zie draw_modules.js
        drawCylinderModules(
            amount=numberOfModules,
            radius=moduleRadius,
            height=moduleSegmentHeight,
            toFill=color_checkbox_value,
            offset=offset
        )

        // de transformaties die drawCylinderModules vanzelf doet
        // zelf doen zodat je de exacte coordinaten van elk punt kan bepalen
        // zie hieronder

        vector_list = getVectors();

        if (points_checkbox_value){
            // zie draw_modules.js
            drawVectors(vector_list);
        }
        if(lines_checkbox_value){
            // zie draw_modules.js
            connectVectors(vector_list);
        }
    }
}

function getVectors(){
    // lees de hoek gegeven door de sliders
    open1 = sliders[0][0].value();
    open2 = sliders[1][0].value();
    rot = sliders[0][1].value();
    
    // get sim settings
    n = numberOfModules
    r = moduleRadius
    h = moduleSegmentHeight
    // draaipunt op cylinder oppervlak
    ratio = 1-(h/r);

    // begin waar de figuur getekend wordt
    translate(0,offset,0);
    rotateX(PI)
    
    // base 
    coo0 = createVector(0,0,0)
    
    // door eerste segment
    coo1 = createVector(coo0.x,coo0.y+h,coo0.z)

    // transleer naar rotatie-as
    coo2 = createVector(coo1.x+r*ratio,coo1.y,coo1.z)

    // rotatie rond z-as
    coo3 = createVector(coo2.x-r*ratio*cos(open1),coo2.y+r*ratio*sin(open1),coo2.z)

    // door 2e segment
    coo4 = createVector(coo3.x+h*sin(open1),coo3.y+h*cos(open1),coo3.z)

    // rotatie rond y-as -> Y.x*sin(open1),Y.y*cos(open1),Y.z

    // door 3e segment
    coo5 = createVector(coo4.x+h*sin(open1),coo4.y+h*cos(open1),coo4.z)

    // transleer naar rotatie-as
    coo6 = createVector(coo5.x+r*ratio*cos(open1),coo5.y-r*ratio*sin(open1),coo5.z)

    // HIER ZIT IK DUS VAST 

    // rotatie rond y-as
    // wanneer hoek open1 opent moeten dus alle volgende punten rond 
    // de nieuwe middenas roteren en niet rond de y-as

    U = createVector(coo6.x/rot,coo6.y/rot,coo6.z/rot)
    C = (coo6.x/rot)*sin(rot)
    D = 1-cos(rot)

    // R = I* cos(rot) + D * U * UT + C
    // coo6OM = R * coo6

    OMX = coo6.x*(cos(rot)+D*U.x*U.x+C)+coo6.y*(D*U.x*U.y+C)+coo6.z*(D*U.x*U.z+C)
    OMY = coo6.x*(D*U.y*U.x+C)+coo6.y*(cos(rot)+D*U.y*U.y+C)+coo6.z*(D*U.y*U.z+C)
    OMZ = coo6.x*(D*U.z*U.x+C)+coo6.y*(D*U.z*U.y+C)+coo6.z*(cos(rot)+D*U.z*U.z+C)

    coo6OM = createVector(OMX,OMY,OMZ)
    

    // werkt als hoek open1 0° is (dus rond normale y-as)
    coo6A = createVector(coo6.x*cos(rot)-coo6.z*sin(rot), coo6.y, coo6.x*sin(rot)+coo6.z*cos(rot))

    // pogingen met rotatie matrix
    // draait rond foute as 
    coo6B = createVector(
        coo6.x*cos(open1)*cos(rot) - coo6.y*sin(open1) + coo6.z*cos(open1)*sin(rot), 
        coo6.x*sin(open1)*cos(rot) + coo6.y*cos(open1) + coo6.z*sin(open1)*sin(rot),
        -coo6.x*sin(rot)+coo6.z*cos(rot)
        )
    coo6C = createVector(
        coo6.x*cos(open1)*cos(rot) + coo6.y*sin(open1) +coo6.z*cos(open1)*sin(rot), 
        coo6.x*sin(open1)*cos(rot) + coo6.y*cos(open1) + coo6.z*sin(open1)*sin(rot),
        coo6.x*sin(rot)-coo6.z*cos(rot)
        )

    // poging om coo6A proberen rekening te laten houden met open1
    // coo6AB = createVector(coo6A.x*cos(open1), coo6A.y, coo6A.z*sin(open1))
    // dit niet op de volledige waarde maar op het verschil ? 
    coo6V = createVector(coo6A.x - coo6.x, coo6A.y - coo6.y, coo6A.z- coo6.z)
    coo6AB = createVector(coo6A.x + coo6V.x*cos(open1), coo6A.y - coo6V.y*sin(open1) , coo6A.z)


    // hier de 2 laatste punten die ook nog niet in orde zijn

    // rotatie rond z-as
    coo7 = createVector(coo6.x-r*ratio*cos(open1+open2),coo6.y+r*ratio*sin(open1+open2),coo6.z)
    coo7A = createVector(coo7.x*cos(rot)-coo7.z*sin(rot), coo7.y, coo7.x*sin(rot)+coo7.z*cos(rot))

    // door 4e segment
    coo8 = createVector(coo7.x+h*sin(open1+open2),coo7.y+h*cos(open1+open2),coo7.z)
    coo8A = createVector(coo8.x*cos(rot)-coo8.z*sin(rot), coo8.y, coo8.x*sin(rot)+coo8.z*cos(rot))

    return [coo0,coo1,coo2,coo3,coo4,coo5,coo6A,coo7A,coo8A,coo6OM];
}

