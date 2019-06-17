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
document.write('<script type="text/javascript" src="src/objects/TV.js"></script>');
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

    // #co
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0); // Rotates the object to face a point in world space.

    camera.position.set(0, 150, 150);
    camera.lookAt(0, 83, 0);


    /* Renderer
    *
    * */
    // Anti-Alias rundet quasi ab, weichere Kanten...
    renderer = new THREE.WebGLRenderer({antialias: true});

    /*  Wir müssen die Größe des Renderers festlegen, alles außerhalb wird nicht gerendert
        Typischerweise wird die Größe auf die Fenstergröße des Browsers gesetzt.
        Bei Perfomance-Problemen sollte eine kleinere Größe gewählt werden, z.B. Width/2 und Height/2 */
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Hintergrundfarbe
    renderer.setClearColor("#efefef"); // alternativ: (new THREE.Color(0xefefef))
    //renderer.shadowMap.enabled = true;

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

    ////// OBJEKTE



    // Enthält Verticles und Faces
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    // #c
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // Kombiniert Geoemtry und Material zu einem Mesh, das auf der Szene bewegt werden kann
    let cube = new THREE.Mesh(geometry, material);

    //scene.add(cube);

    let tv = new THREE.Object3D();

    let metallMaterial = new THREE.MeshStandardMaterial({color: 0xe7e7e7, roughness: 0.2, metalness: 0.4});


    let baseGeo = new THREE.BoxGeometry(65, 40, 30);
    //let baseMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    let baseMat = new THREE.MeshLambertMaterial({color: 0xc9a2d3});
    let base = new THREE.Mesh(baseGeo, baseMat);
    base.position.set(0,0,0);
    tv.add(base);

    let bildschirmGeo = new THREE.BoxGeometry(45, 33, 5);
    let bildschirmMat = new THREE.MeshLambertMaterial({color: 0x302f30});
    let bildschirm = new THREE.Mesh(bildschirmGeo, bildschirmMat);
    bildschirm.position.x = -6;
    bildschirm.position.y = 0;
    bildschirm.position.z = 15;
    bildschirm.name = "Bildschirm";
    //screen.castShadow(true);
    tv.add(bildschirm);

    let panelGeo = new THREE.BoxGeometry(10, 30, 1.5);
    let panelMat = new THREE.MeshLambertMaterial({color: 0xcea25a});
    let panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.x = 24;
    panel.position.y = 0;
    panel.position.z = 15
    panel.name = "Panel";
    tv.add(panel);

    let channelGeo = new THREE.CylinderGeometry(2.5, 2.5, 5, 32, 1, false);
    //let channelMat = new THREE.MeshLambertMaterial({color: 0x302f30});
    let channel = new THREE.Mesh(channelGeo, metallMaterial);
    channel.position.x = 24;
    channel.position.y = 10;
    channel.position.z = 15;
    channel.rotation.x = 90 * DEG_TO_RAD;
    channel.name = "Channel";
    tv.add(channel);

    var markerGeometry = new THREE.BoxGeometry(4, 0.8, 1.5);
    var markerMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0000
    });
    var marker1 = new THREE.Mesh(markerGeometry, markerMaterial);
    marker1.position.x = 24;
    marker1.position.y = 10;
    marker1.position.z = 17.5;
    marker1.name = "Marker_Channel";
    tv.add(marker1);

    var volumeGeo = new THREE.CylinderGeometry(2.5, 2.5, 5, 32, 1, false);
    var volume = new THREE.Mesh(volumeGeo, metallMaterial);
    volume.position.x = 24;
    volume.position.y = 3.5;
    volume.position.z = 15;
    volume.rotation.x = 90 * DEG_TO_RAD;
    volume.name = "Volume";
    tv.add(volume);

    //var markerGeometry = new THREE.BoxGeometry(4, 0.8, 1.5);
    //var markerMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
    var marker2 = new THREE.Mesh(markerGeometry, markerMaterial);
    marker2.position.x = 24;
    marker2.position.y = 3.5;
    marker2.position.z = 17.5;
    marker2.name = "Marker_Volume";
    tv.add(marker2);

    var muteButtonGeo = new THREE.CylinderGeometry(2, 2, 4, 32, 1, false);
    var muteButton = new THREE.Mesh(muteButtonGeo, metallMaterial);
    muteButton.position.x = 24;
    muteButton.position.y = -2;
    muteButton.position.z = 15;
    muteButton.rotation.x = 90 * DEG_TO_RAD;
    muteButton.name = "Mute_Button";
    tv.add(muteButton);

    var muteButtonInnerGeo = new THREE.SphereGeometry(1.7,10, 10);
    var muteButtonInnerMat = new THREE.MeshLambertMaterial({
        color: 0xFF0000
    });
    var muteButtonInner = new THREE.Mesh(muteButtonInnerGeo, muteButtonInnerMat);
    muteButtonInner.position.x = 24;
    muteButtonInner.position.y = -2;
    muteButtonInner.position.z = 16;
    muteButtonInner.name = "Mute_Button_Inner";
    tv.add(muteButtonInner);

    var onOffButtonGeo = new THREE.CylinderGeometry(2, 2, 4, 32, 1, false);
    var onOffButton = new THREE.Mesh(onOffButtonGeo, metallMaterial);
    onOffButton.position.x = 24;
    onOffButton.position.y = -7;
    onOffButton.position.z = 15;
    onOffButton.rotation.x = 90 * DEG_TO_RAD;
    onOffButton.name = "OnOff_Button";
    tv.add(onOffButton);


    var onOffButtonInnerGeo = new THREE.SphereGeometry(1.7,10, 10);
    var onOffButtonInnerMat = new THREE.MeshLambertMaterial({
        color: 0xFF0000
    });
    var onOffButtonInner = new THREE.Mesh(onOffButtonInnerGeo, onOffButtonInnerMat);
    onOffButtonInner.position.x = 24;
    onOffButtonInner.position.y = -7;
    onOffButtonInner.position.z = 16;
    onOffButtonInner.name = "OnOff_Button_Inner";
    tv.add(onOffButtonInner);

    //let panelGeo = new THREE.BoxGeometry(10, 30, 1.5);


    let freqGeo = new THREE.BoxGeometry(6, 0.8, 0.6);
    let freqMat = new THREE.MeshLambertMaterial({
        color: 0xc00FF00
        //transparent: false,
        //opacity: 0.3
    });
    let freq = new THREE.Mesh(freqGeo, freqMat);
    freq.position.x = 24; // <--->
    freq.position.y = -10.5; // Höhe
    freq.position.z = 16; // tiefe
    tv.add(freq);

    var markerFreqGeo = new THREE.BoxGeometry(0.5, 0.8, 1);
    var markerFreqMat = new THREE.MeshLambertMaterial({
        color: 0xFF0000
    });
    var markerFreq = new THREE.Mesh(markerFreqGeo, markerFreqMat);
    markerFreq.position.x = 24;
    markerFreq.position.y = -10.5;
    markerFreq.position.z = 16;
    tv.add(markerFreq);

    let freq2 = new THREE.Mesh(freqGeo, freqMat);
    freq2.position.x = 24; // <--->
    freq2.position.y = -12.5; // Höhe
    freq2.position.z = 16; // tiefe
    tv.add(freq2);

    var markerFreq2 = new THREE.Mesh(markerFreqGeo, markerFreqMat);
    markerFreq2.position.x = 24;
    markerFreq2.position.y = -12.5;
    markerFreq2.position.z = 16;
    tv.add(markerFreq2);

    var antennaPlateGeo = new THREE.CylinderGeometry(5, 5, 1.5, 32, 1, false);
    var antennaPlate = new THREE.Mesh(antennaPlateGeo, metallMaterial);
    antennaPlate.position.x = -25;
    antennaPlate.position.y = 20;
    antennaPlate.position.z = 8;
    //antennaPlate.rotation.x = 90 * DEG_TO_RAD;
    antennaPlate.name = "antenna_Plate";
    tv.add(antennaPlate);

    var antennaBaseGeo = new THREE.SphereGeometry(2,10, 10);
    var antennaBase = new THREE.Mesh(antennaBaseGeo, metallMaterial);
    antennaBase.position.x = -25;
    antennaBase.position.y = 20;
    antennaBase.position.z = 8;
    antennaBase.name = "antenna_Base";
    tv.add(antennaBase);

    var antennaPart1Geo = new THREE.CylinderGeometry(0.5, 0.5, 33, 32, 1, false);
    var antennaPart1 = new THREE.Mesh(antennaPart1Geo, metallMaterial);
    antennaPart1.position.x = -25;
    antennaPart1.position.y = 38;
    antennaPart1.position.z = 8;
    //antennaPlate.rotation.x = 90 * DEG_TO_RAD;
    antennaPart1.name = "antenna_Plate";
    tv.add(antennaPart1);

    var antennaPart2Geo = new THREE.CylinderGeometry(0.3, 0.3, 20, 32, 1, false);
    var antennaPart2 = new THREE.Mesh(antennaPart2Geo, metallMaterial);
    antennaPart2.position.x = -25;
    antennaPart2.position.y = 64;
    antennaPart2.position.z = 8;
    antennaPart2.name = "antenna_Plate";
    tv.add(antennaPart2);

    var antennaPart3Geo = new THREE.CylinderGeometry(0.125, 0.125, 12, 32, 1, false);
    var antennaPart3 = new THREE.Mesh(antennaPart3Geo, metallMaterial);
    antennaPart3.position.x = -25;
    antennaPart3.position.y = 80;
    antennaPart3.position.z = 8;
    antennaPart3.name = "antenna_Plate";
    tv.add(antennaPart3);

    var antennaPart4Geo = new THREE.CylinderGeometry(0.35, 0.35, 1.5, 32, 1, false);
    var antennaPart4 = new THREE.Mesh(antennaPart4Geo, metallMaterial);
    antennaPart4.position.x = -25;
    antennaPart4.position.y = 86;
    antennaPart4.position.z = 8;
    antennaPart4.name = "antenna_Plate";
    tv.add(antennaPart4);





    //var union = threecsg.union(marker, sphere , cubeMaterial );
    //scene.add(union);

    //var subtract = threecsg. subtract cube , sphere , cubeMaterial );
    //scene.add(subtract);
    //var intersect = threecsg. intersect cube , sphere , cubeMaterial
    //scene.add(intersect);



    tv.position.set(0,55,0);
    scene.add(tv);

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

        // Causes the renderer to redraw the scene every time the screen is refreshed
        renderer.render(scene, camera);

        /*  Jedes Mal, wenn der Bildschirm aktualisiert wird, soll die Szene erneuert werden / neu gerendert werden
        *   requestAnimationFrame pausiert, wenn der Benutzer zu einem anderen Tab wechselt. */
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    //window.onclick = onDocumentMouseDown;
    window.onclick = executeRaycast; //#co siehe auch mouseposition und meine gammelfunktion
}


window.onload = main;
