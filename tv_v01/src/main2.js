// External libraries
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/libs/tween.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/libs/inflate.min.js"></script>');

// Loader
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/OBJLoader.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/MTLLoader.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/GLTFLoader.js"></script>');

// Cannon
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/tools/threejs/CannonDebugRenderer.js"></script>');

// Models
document.write('<script type="text/javascript" src="src/objects/Radio.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TV.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Floor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/RadioFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TableFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Table2FromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TVFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/LampFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/ConsoleTableFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/ArmchairFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/BowlFromFile.js"></script>');

// Andere Skripts
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/onDocumentMouseDown.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

/*
* Über globale Variablen und Scopes im Allgemeinen in JavaScript am Beispiel von renderer:
*   renderer wird an einigen Stellen (z.B. updateAspectRatio) benötigt und wird deswegen als globale Variable definiert.
*   Dies kann einerseits wie hier passieren oder durch das Weglassen der "var" oder "let" Deklarierung innerhalb der main()-Funktion (global-Kennzeichner). */
let renderer = null;
let camera = null;
let scene = null;

function main() {

    scene = new THREE.Scene();

    /* Camera
    * Parameter:
    * FOV = Field of View: Sichtfeld
    *       Wichtig: Wert ist in Degrees
    * Aspect Ratio: Bildformat
    *       Wir nutzen die Breite geteilt durch die Höhe (der Fenstergröße des Browsers), ansonsten verzerrtes oder zusammengestauchtes Ergebnis
    * Near and Far Clipping Plane:
    *       Objekte, die weiter entfernt oder näher dran sind als die definierten far/near Werte werden nicht gerendert, sprich nicht angezeigt
    *       Wichtig für Performance-Einstellungen
    *
    * */
    camera = new THREE.PerspectiveCamera(45,
        window.innerWidth / window.innerHeight,
        0.1, 1000);
    camera.position.set(0, 150, 150); // Frontalsicht TV
    camera.position.set(0,60,300); // Weiter entfernt

    camera.lookAt(0, 83, 0); // Rotates the object to face a point in world space.

    /* Renderer
    * */
    // Anti-Alias rundet quasi ab, weichere Kanten...
    renderer = new THREE.WebGLRenderer({antialias: true});

    /*  Wir müssen die Größe des Renderers festlegen, alles außerhalb wird nicht gerendert
        Typischerweise wird die Größe auf die Fenstergröße des Browsers gesetzt.
        Bei Perfomance-Problemen sollte eine kleinere Größe gewählt werden, z.B. Width/2 und Height/2 */
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Hintergrundfarbe
    renderer.setClearColor("#efefef"); // alternativ: (new THREE.Color(0xefefef))
    renderer.shadowMap.enabled = true; // zeigt generell nirgends Schatten an bei false!

    // Wir fügen den Renderer zum HTML Dokument hinzu
    //document.body.appendChild( renderer.domElement );
    // Alternativ:
    document.getElementById("3d_content").appendChild(renderer.domElement);

    // #co
    let orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 83, 0);
    orbitControls.update();

    // #co
    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var directionalLight = lights.createDirectionalLight(-30, 200, 100);
    scene.add(directionalLight);

    //#co
    var gui = new dat.GUI();
    gui.add(directionalLight.position, "x", -100, 100);
    gui.add(directionalLight.position, "y", -100, 100);
    gui.add(directionalLight.position, "z", -100, 100);
    gui.domElement.onmouseenter = function () {
        orbitControls.enabled = false;
    };
    gui.domElement.onmouseleave = function () {
        orbitControls.enabled = true;
    };


    // Physics
    physics = new Physics();
    physics.initialize(0, -200, 0, 1 / 120, true);
    physicsVisualDebugger = new THREE.CannonDebugRenderer(scene, physics.getWorld());

    ////// OBJEKTE
    // Enthält Verticles und Faces
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // Kombiniert Geoemtry und Material zu einem Mesh, das auf der Szene bewegt werden kann
    let cube = new THREE.Mesh(geometry, material);

    var tv = new TV();
    tv.position.set(-45,53,10);
    tv.rotateY(22*DEG_TO_RAD);
    physics.addBox(tv, 3, // visual object, mass
        65, 40, 30,       // dimX, dimY, dimZ
        0, 0, 0,          // offsetX, offsetY, offsetZ
        0, 0, 0,          // eulerX, eulerY, eulerZ
        true);
    scene.add(tv);

    var tvF = new TVFromFile();
    tvF.position.set(50,53, 10);
    tvF.rotateY(-22*DEG_TO_RAD);
    /*
    physics.addBox(tvF, 3, // visual object, mass
        65, 40, 30,       // dimX, dimY, dimZ
        0, 0, 0,          // offsetX, offsetY, offsetZ
        0, 0, 0,          // eulerX, eulerY, eulerZ
        true);*/
    //scene.add(tvF);


    var tv2 = new TV();
    tv2.position.set(50,53, 10);
    tv2.rotateY(-22*DEG_TO_RAD);
    physics.addBox(tv2, 3, // visual object, mass
        65, 40, 30,       // dimX, dimY, dimZ
        0, 0, 0,          // offsetX, offsetY, offsetZ
        0, 0, 0,          // eulerX, eulerY, eulerZ
        true);
    //scene.add(tv2);

    var table = new Table2FromFile();
    table.position.set(0,-21,0);
    table.rotateY(90*DEG_TO_RAD);
    //table.scale.set(0.9,0.9,0.9);
    //physics.addBox(table, 0, 130, 3, 70, 0, 71.5, 0);
    physics.addBox(table, 0, // visual object, mass
        138, 222, 2,         // dimX, dimY, dimZ
        0, 52, 0,             // offsetX, offsetY, offsetZ
        90*DEG_TO_RAD, 0, 0, // eulerX, eulerY, eulerZ
        true);
    //scene.add(table);

    var lamp = new LampFromFile();
    lamp.position.set(-75,35,-33);
    //lamp.scale.set(0.8,0.8,0.8);
    //let test = lamp.getChildByName()
    //console.log("yo   "+test);
    //test.object.material.color.setHex(0xffffff);
    scene.add(lamp);

    floor = new Floor(200, 200, 8);
    scene.add(floor);


    var armchair = new ArmchairFromFile();
    armchair.position.set(-30,-50,175);
    armchair.rotateY(185*DEG_TO_RAD);
    //armchair.scale.set(0.7,0.7,0.7);
    scene.add(armchair);

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    var clock = new THREE.Clock();

    function mainLoop() {

        stats.begin();
        var delta = clock.getDelta();

        physics.update(delta);
        physicsVisualDebugger.update();

        //einschalterAnimation.update(delta);
        //antennenAnimation.update(delta);

        aniAntennaPart34Retract.update(delta);
        aniAntennaPart234Retract.update(delta);
        aniAntennaFullRotation90Degrees.update(delta);
        aniAdjusterChannelRotate.update(delta);
        aniAdjusterVolumeRotate.update(delta);
        aniButtonInnerPushed.update(delta);

        //if (radioAnimationMixer != null)
        //   radioAnimationMixer.update(delta);

        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;

        // Causes the renderer to redraw the scene every time the screen is refreshed
        renderer.render(scene, camera);
        stats.end();
        /*  Jedes Mal, wenn der Bildschirm aktualisiert wird, soll die Szene erneuert werden / neu gerendert werden
        *   requestAnimationFrame pausiert, wenn der Benutzer zu einem anderen Tab wechselt. */
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    //window.onclick = onDocumentMouseDown;
    window.onclick = executeRaycast; //#co siehe auch mouseposition und meine gammelfunktion
    window.onkeydown = keyDownAction;
}


window.onload = main;
