raycaster = new THREE.Raycaster();

function executeRaycast(event) {


    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    //console.log(mousePosition);
    if (intersects.length > 0) {

        var firstHit = intersects[0].object;
        console.log(firstHit);

        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );


        if (firstHit.name === "antenna_Part_2" || firstHit.name === "antenna_Part_1"){
            console.log("Starte Animation")
            firstHit.userData.toggleAnimationEndPosition();

        } else if (firstHit.name === "Tuner") {
            firstHit.userData.forward = !firstHit.userData.forward;
            if(firstHit.userData.forward) {
                firstHit.userData.backwardTween.stop();
                firstHit.userData.forwardTween.start();
            } else {
                firstHit.userData.forwardTween.stop();
                firstHit.userData.backwardTween.start();
            }
        } else if (firstHit.name === "antenna_Part_3" || firstHit.name === "antenna_Part_4"){
            console.log("Starte animation")
            aniAntennaPart34Retract.toggleAnimationEndPosition();

        }

        if (firstHit.name === "EinschalterFBX") {
            radioState.powerOn = !radioState.powerOn;
            if (radioState.powerOn && !radioAnimationMixer.existingAction("Einschalter_Action_aus").isRunning()) {
                radioAnimationMixer.existingAction("Einschalter_Action_aus").stop();
                radioAnimationMixer.existingAction("Einschalter_Action_ein").play();
            } else if (!radioState.powerOn && !radioAnimationMixer.existingAction("Einschalter_Action_ein").isRunning()) {
                radioAnimationMixer.existingAction("Einschalter_Action_ein").stop();
                radioAnimationMixer.existingAction("Einschalter_Action_aus").play();
            }
        } else if (firstHit.name === "AntenneFBX") {
            radioState.antennaOut = !radioState.antennaOut;
            if (radioState.antennaOut && !radioAnimationMixer.existingAction("Antenne_Action_einfahren").isRunning()) {
                radioAnimationMixer.existingAction("Antenne_Action_einfahren").stop();
                radioAnimationMixer.existingAction("Antenne_Action_ausfahren").play();
            } else if (!radioState.antennaOut && !radioAnimationMixer.existingAction("Antenne_Action_ausfahren").isRunning()) {
                radioAnimationMixer.existingAction("Antenne_Action_ausfahren").stop();
                radioAnimationMixer.existingAction("Antenne_Action_einfahren").play();
            }
        } else if (firstHit.name === "TunerFBX") {
            radioState.markerRight = !radioState.markerRight;
            if (radioState.markerRight && !radioAnimationMixer.existingAction("Marker_Action_zurueck").isRunning()) {
                radioAnimationMixer.existingAction("Marker_Action_zurueck").stop();
                radioAnimationMixer.existingAction("Marker_Action_vor").play();
            } else if (!radioState.markerRight && !radioAnimationMixer.existingAction("Marker_Action_vor").isRunning()) {
                radioAnimationMixer.existingAction("Marker_Action_vor").stop();
                radioAnimationMixer.existingAction("Marker_Action_zurueck").play();
            }
        }
    }
}