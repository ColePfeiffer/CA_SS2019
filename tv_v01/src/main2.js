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

    // #co
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0); // Rotates the object to face a point in world space.




    /* Renderer
    *
    *
    * */
    // #co antialias, why?
    renderer = new THREE.WebGLRenderer({antialias: true});

    /*  Wir müssen die Größe des Renderers festlegen, alles außerhalb wird nicht gerendert
        Typischerweise wird die Größe auf die Fenstergröße des Browsers gesetzt.
        Bei Perfomance-Problemen sollte eine kleinere Größe gewählt werden, z.B. Width/2 und Height/2 */
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));

    //renderer.shadowMap.enabled = true;

    // Wir fügen den Renderer zum HTML Dokument hinzu
    //document.body.appendChild( renderer.domElement );
    // Alternativ:
    document.getElementById("3d_content").appendChild(renderer.domElement);

    // Enthält Verticles und Faces
    let geometry = new THREE.BoxGeometry(1, 1, 1);

    // #c
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    // Kombiniert Geoemtry und Material zu einem Mesh, das auf der Szene bewegt werden kann
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    /*
    // https://threejs.org/docs/#manual/en/introduction/Drawing-lines
    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

    var line = new THREE.Line( geometry, material );
    line.position.z = -25;
    scene.add( line );
    */

    function mainLoop() {

        //stats.begin();


        //physics.update(delta);
        //physicsVisualDebugger.update();

        //einschalterAnimation.update(delta);
        //antennenAnimation.update(delta);



        //if (radioAnimationMixer != null)
        //   radioAnimationMixer.update(delta);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);

        /*  Jedes Mal, wenn der Bildschirm aktualisiert wird, soll die Szene erneuert werden / neu gerendert werden
        *   requestAnimationFrame pausiert, wenn der Benutzer zu einem anderen Tab wechselt. */
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
}


window.onload = main;
