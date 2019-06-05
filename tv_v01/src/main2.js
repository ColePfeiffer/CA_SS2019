// External libraries
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/libs/tween.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/libs/inflate.min.js"></script>');

document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/OBJLoader.js"></script>');
//document.write('<script type="text/javascript" src="../../lib/three.js-r103/examples/js/loaders/OBJLoader2.js"></script>');

document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/tools/threejs/CannonDebugRenderer.js"></script>');

// Own modules
document.write('<script type="text/javascript" src="src/objects/Radio.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Floor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/RadioFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TableFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TVFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/BowlFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    let scene = new THREE.Scene();

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
    let camera = new THREE.PerspectiveCamera(45,
        window.innerWidth / window.innerHeight,
        0.1, 1000);

    // #co
    //camera.position.set(0, 150, 150);
    //camera.lookAt(0, 83, 0);


    /* Renderer
    *
    *
    * */
    // #co antialias, why?
    let renderer = new THREE.WebGLRenderer({antialias: true});

    /*  Wir müssen die Größe des Renderers festlegen, alles außerhalb wird nicht gerendert
        Typischerweise wird die Größe auf die Fenstergröße des Browsers gesetzt.
        Bei Perfomance-Problemen sollte eine kleinere Größe gewählt werden, z.B. Width/2 und Height/2 */
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor(new THREE.Color(0x000000));

    //renderer.shadowMap.enabled = true;

    // #c mal testen ob das auch geht
    //document.body.appendChild( renderer.domElement );

    // Wir fügen den Renderer zum HTML Dokument hinzu
    document.getElementById("3d_content").appendChild(renderer.domElement);

    // Enthält Verticles und Faces
    let geometry = new THREE.BoxGeometry(1, 1, 1);

    // #c
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    // Kombiniert Geoemtry und Material zu einem Mesh, das auf der Szene bewegt werden kann
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    function mainLoop() {

        //stats.begin();

        //var delta = clock.getDelta();

        //physics.update(delta);
        //physicsVisualDebugger.update();

        //einschalterAnimation.update(delta);
        //antennenAnimation.update(delta);

        //TWEEN.update();

        //if (radioAnimationMixer != null)
        //   radioAnimationMixer.update(delta);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);

        //stats.end();


        /*  Jedes Mal, wenn der Bildschirm aktualisiert wird, soll die Szene erneuert werden / neu gerendert werden
        *   requestAnimationFrame pausiert, wenn der Benutzer zu einem anderen Tab wechselt. */
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;
};


window.onload = main;


    /*
        physics = new Physics();
    physics.initialize(0, -200, 0, 1 / 120, true);
    physicsVisualDebugger = new THREE.CannonDebugRenderer(scene, physics.getWorld());

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);


    var radio = new Radio();
    radio.position.set(-30.0, 83.0, 10.0);
    radio.rotation.y = 20 * DEG_TO_RAD;
    physics.addBox(radio, 3, 30, 20, 8);
    scene.add(radio);

    var radioFromFile = new RadioFromFile();
    radioFromFile.position.set(30.0, 83.0, 10.0);
    radioFromFile.rotation.y = -20 * DEG_TO_RAD;
    physics.addBox(radioFromFile, 3, 30, 20, 8);
    scene.add(radioFromFile);

    var TvFromFile = new TVFromFile();
    TvFromFile.position.set(30.0, 83.0, 10.0);
    //TvFromFile.rotation.y = -20 * DEG_TO_RAD;
    //physics.addBox(TvFromFile, 3, 30, 20, 8);
    scene.add(TvFromFile);

    var table = new TableFromFile();
    physics.addBox(table, 0, 130, 3, 70, 0, 71.5, 0);
    scene.add(table);

    var bowl = new BowlFromFile();
    bowl.position.set(0, 73, -15);
    physics.addCylinder(bowl, 1, 20, 11, 13, 32, 0, 13 / 2, 0, -90 * DEG_TO_RAD, 0, 0);
    scene.add(bowl);

    scene.add(new Floor(200, 200, 8));

    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var directionalLight = lights.createDirectionalLight(-30, 200, 100);
    scene.add(directionalLight);



    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 83, 0);
    orbitControls.update();

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

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);


    var clock = new THREE.Clock();

    function mainLoop() {

        stats.begin();

        var delta = clock.getDelta();

        physics.update(delta);
        //physicsVisualDebugger.update();

        einschalterAnimation.update(delta);
        antennenAnimation.update(delta);

        TWEEN.update();

        if (radioAnimationMixer != null)
            radioAnimationMixer.update(delta);

        renderer.render(scene, camera);

        stats.end();

        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;
}*/
