TV = function () {

    let tv = new THREE.Object3D();

    // ____ Materials ____
    let metallMaterial = new THREE.MeshStandardMaterial({color: 0xe7e7e7, roughness: 0.2, metalness: 0.4});

    // ____ Elements _____
    let corpusGeo = new THREE.BoxGeometry(65, 40, 30);
    let corpusMat = new THREE.MeshLambertMaterial({color: 0xDF9136});
    let corpus = new THREE.Mesh(corpusGeo, corpusMat);
    corpus.position.set(0,0,0);
    tv.add(corpus);

    let screenGeo = new THREE.BoxGeometry(45, 33, 5);
    let screenMat = new THREE.MeshLambertMaterial({color: 0x302f30});
    let screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.x = -6;
    screen.position.y = 0;
    screen.position.z = 15;
    screen.name = "Screen";
    //screen.castShadow(true);
    tv.add(screen);

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

    var adjusterGeo = new THREE.BoxGeometry(4, 0.8, 1.5);
    var adjusterMat = new THREE.MeshLambertMaterial({
        color: 0xFF0000
    });

    var adjusterChannel = new THREE.Mesh(adjusterGeo, adjusterMat);
    adjusterChannel.position.x = 24;
    adjusterChannel.position.y = 10;
    adjusterChannel.position.z = 17.5;
    adjusterChannel.name = "Adjuster_Channel";
    tv.add(adjusterChannel);

    var adjusterExtrapieceGeo = new THREE.BoxGeometry(1, 0.9, 1);
    var adjusterExtrapieceMat = new THREE.MeshLambertMaterial({
        color: 0x000000
    });
    var adjusterExtrapieceChannel = new THREE.Mesh(adjusterExtrapieceGeo, adjusterExtrapieceMat);

    adjusterExtrapieceChannel.position.x = -1.4;
    adjusterExtrapieceChannel.position.z = 0.5;
    adjusterChannel.add(adjusterExtrapieceChannel);

    aniAdjusterChannelRotate = new Animation(adjusterChannel, AnimationType.ROTATION, AnimationAxis.Z);
    aniAdjusterChannelRotate.setAmount(-180 * DEG_TO_RAD);
    aniAdjusterChannelRotate.setSpeed(70 * DEG_TO_RAD);
    adjusterChannel.userData = aniAdjusterChannelRotate;

    var volumeGeo = new THREE.CylinderGeometry(2.5, 2.5, 5, 32, 1, false);
    var volume = new THREE.Mesh(volumeGeo, metallMaterial);
    volume.position.x = 24;
    volume.position.y = 3.5;
    volume.position.z = 15;
    volume.rotation.x = 90 * DEG_TO_RAD;
    volume.name = "Volume";
    tv.add(volume);

    //var adjusterGeo = new THREE.BoxGeometry(4, 0.8, 1.5);
    //var adjusterMat = new THREE.MeshLambertMaterial({color: 0xFF0000});
    var adjusterVolume = new THREE.Mesh(adjusterGeo, adjusterMat);
    adjusterVolume.position.x = 24;
    adjusterVolume.position.y = 3.5;
    adjusterVolume.position.z = 17.5;
    adjusterVolume.name = "Adjuster_Volume";
    tv.add(adjusterVolume);

    var adjusterExtrapieceVolume = new THREE.Mesh(adjusterExtrapieceGeo, adjusterExtrapieceMat);

    adjusterExtrapieceVolume.position.x = -1.4;
    adjusterExtrapieceVolume.position.z = 0.5;
    adjusterVolume.add(adjusterExtrapieceVolume);

    aniAdjusterVolumeRotate = new Animation(adjusterVolume, AnimationType.ROTATION, AnimationAxis.Z);
    aniAdjusterVolumeRotate.setAmount(-180 * DEG_TO_RAD);
    aniAdjusterVolumeRotate.setSpeed(70 * DEG_TO_RAD);
    adjusterVolume.userData = aniAdjusterVolumeRotate;

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

    // Animation für Part 2
    aniButtonInnerPushed = new Animation(muteButtonInner, AnimationType.TRANSLATION, AnimationAxis.Z);
    aniButtonInnerPushed.setAmount(-0.15);
    aniButtonInnerPushed.setSpeed(3);
    aniButtonInnerPushed.IsExecuteAnimationThenRevert = true;
    muteButtonInner.userData = aniButtonInnerPushed;

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

    var antennaPart1Geo = new THREE.CylinderGeometry(0.5, 0.5, 33, 20, 1, false);
    /*  Folgendes ist erforderlich, um den Drehpunkt des Objekts zu verschieben.
        Normalerweise sitzt der nämlich genau in der Mitte, wir wollen aber um unteren Ende rotieren...
        aus diesem Grund teilen wir die Höhe des Elements durch 2 und setzen unsere y-Position auf diesen Punkt.
     */
    antennaPart1Geo.applyMatrix(new THREE.Matrix4().makeTranslation(0, 16.5, 0));
    var antennaPart1 = new THREE.Mesh(antennaPart1Geo, metallMaterial);
    antennaPart1.position.x = -25;
    antennaPart1.position.y = 21.5; //38
    antennaPart1.position.z = 8;
    antennaPart1.name = "antenna_Part_1";


    var antennaPart2Geo = new THREE.CylinderGeometry(0.3, 0.3, 20, 32, 1, false);
    var antennaPart2 = new THREE.Mesh(antennaPart2Geo, metallMaterial);
    /*  Da wir alle weiteren Antennen-Teile zu antennaPart1 hinzufügen,
        brauchen wir die x und y-Position nicht weiter zu beachten. Die Grundposition wird auf die vom Hauptobjekt gesetzt.
        Siehe Zeile 229. */
    antennaPart2.position.y = 43;
    antennaPart2.name = "antenna_Part_2";

    // Mergen von Meshes in ein einziges Geometry-Objekt, in diesem Fall Antennenpart 3 und 4
    var antennaPart3Geo = new THREE.CylinderGeometry(0.125, 0.125, 12, 32, 1, false);
    var antennaPart4Geo = new THREE.CylinderGeometry(0.35, 0.35, 1.5, 32, 1, false);
    var antenna34MergedGeo = new THREE.Geometry();

    // Erzeugen eines Meshs für jede Geometry, die gemerged werden soll
    var antennaPart3Mesh = new THREE.Mesh(antennaPart3Geo);
    var antennaPart4Mesh = new THREE.Mesh(antennaPart4Geo);

    // Y-Position des einen Meshes anpassen, sodass es nach dem Mergen richtig positioniert ist, sonst sitzt es zentriert
    antennaPart4Mesh.position.y = 6;

    // then call the merge method of the single geometry for each, passing the geometry and matrix of each into the method:
    antennaPart3Mesh.updateMatrix(); // as needed
    antenna34MergedGeo.merge(antennaPart3Mesh.geometry, antennaPart3Mesh.matrix);

    antennaPart4Mesh.updateMatrix(); // as needed
    antenna34MergedGeo.merge(antennaPart4Mesh.geometry, antennaPart4Mesh.matrix);

    //Once merged, create a mesh from the single geometry and add to the scene:
    var antenna34Merged = new THREE.Mesh(antenna34MergedGeo, metallMaterial);
    antenna34Merged.position.y = 59;
    antenna34Merged.name = "antenna_Part_3";

    // Animation für Part 3 und 4, die zu einem Mesh zusammengebündelt sind und beide bewegt werden
    aniAntennaPart34Retract = new Animation(antenna34Merged, AnimationType.TRANSLATION, AnimationAxis.Y);
    aniAntennaPart34Retract.setAmount(-11.5);
    aniAntennaPart34Retract.setSpeed(7);
    antenna34Merged.userData = aniAntennaPart34Retract;

    /*  Bündeln von allen Antennen Elementen, die mitbewegt werden müssen,
        wenn Part 2 ein- oder ausgezogen wird */
    antenna234Merged = new THREE.Object3D();
    antenna234Merged.add(antenna34Merged);
    antenna234Merged.add(antennaPart2);
    // Animation für Part 2
    aniAntennaPart234Retract = new Animation(antenna234Merged, AnimationType.TRANSLATION, AnimationAxis.Y);
    aniAntennaPart234Retract.setAmount(-18.5);
    aniAntennaPart234Retract.setSpeed(10);
    antennaPart2.userData = aniAntennaPart234Retract;

    /*  Wir fügen alle bewegbaren Antennen-Elemente zu antennaPart1 hinzu,
        weil anhand dieses Teils gedreht werden soll und sich alle übrigen Elemente mitbewegen müssen. */
    antennaPart1.add(antenna234Merged);
    tv.add(antennaPart1);
    // Animation für Part 1 der Antenne, die die gesamte Antenne rotieren lässt
    aniAntennaFullRotation90Degrees = new Animation(antennaPart1, AnimationType.ROTATION, AnimationAxis.Z);
    aniAntennaFullRotation90Degrees.setAmount(-90 * DEG_TO_RAD);
    aniAntennaFullRotation90Degrees.setSpeed(50 * DEG_TO_RAD);
    antennaPart1.userData = aniAntennaFullRotation90Degrees;
    
    return tv;
}