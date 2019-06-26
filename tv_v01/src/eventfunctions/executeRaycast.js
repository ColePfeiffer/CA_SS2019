raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    //console.log(mousePosition);
    if (intersects.length > 0) {

        var firstHit = intersects[0].object;
        console.log(firstHit);

        if (shiftDown) {
            intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
        }

        if (firstHit.name === "OnOff_Button_Inner") {
            // Animation fehlt noch
            // Wenn Power bereits an ist, dann mach aus
            if (tvState.powerOn && tvState.channel1) {
                video2.pause();
                screenMaterial.map = blackVideoScreen;
                tvState.powerOn = !tvState.powerOn;
            } else if (tvState.powerOn) {
                video1.pause();
                screenMaterial.map = blackVideoScreen;
                tvState.powerOn = !tvState.powerOn;
            }
            // Wenn Power aus ist, dann schalte ein
            else if (!tvState.powerOn) {
                tvState.powerOn = !tvState.powerOn;
                screenMaterial.map = videoTexture1;
                video1.play();
            }
        }

        if (firstHit.name === "Adjuster_Channel") {
            if (tvState.powerOn && !tvState.channel1) {
                video1.pause();
                screenMaterial.map = blackVideoScreen;
                tvState.channel1 = !tvState.channel1;
                screenMaterial.map = videoTexture2;
                video2.play();
                // Wenn Power aus ist, dann schalte ein
            }else if (tvState.powerOn && tvState.channel1){
                video2.pause();
                screenMaterial.map = blackVideoScreen;
                tvState.channel1 = !tvState.channel1;
            }
        } else {
            console.log("turn on tv first");
        }

        if (firstHit.name === "antenna_Part_2" || firstHit.name === "antenna_Part_1" || firstHit.name === "Adjuster_Channel"
            || firstHit.name === "Adjuster_Volume"
            || firstHit.name === "Mute_Button_Inner") {
            firstHit.userData.toggleAnimationEndPosition();


        } else if (firstHit.name === "Tuner") {
            firstHit.userData.forward = !firstHit.userData.forward;
            if (firstHit.userData.forward) {
                firstHit.userData.backwardTween.stop();
                firstHit.userData.forwardTween.start();
            } else {
                firstHit.userData.forwardTween.stop();
                firstHit.userData.backwardTween.start();
            }
        } else if (firstHit.name === "antenna_Part_3" || firstHit.name === "antenna_Part_4") {
            aniAntennaPart34Retract.toggleAnimationEndPosition();

        }

        if (firstHit.name === "TVBildschirm") {

            console.log(tvAnimationMixer);
            //tvState.antennaRotated = !tvState.antennaRotated;

            i = 1;

            //tvAnimationMixer.existingAction("Antenne2Action.002").play();
            //tvAnimationMixer.clipAction(gltfStore.animations[i]).play();
            /*
            if(tvAnimationMixer.clipAction(gltfStore.animations[i]).isRunning()){
                console.log("yoo")
            }


            if (tvState.antennaRotated && !radioAnimationMixer.existingAction("Antenne3Action.007").isRunning()) {
                radioAnimationMixer.existingAction("Antenne_Action_einfahren").stop();
                radioAnimationMixer.existingAction("Antenne_Action_ausfahren").play();
            } else if (!tvState.antennaRotated && !radioAnimationMixer.existingAction("Antenne_Action_ausfahren").isRunning()) {
                radioAnimationMixer.existingAction("Antenne_Action_ausfahren").stop();
                radioAnimationMixer.existingAction("Antenne_Action_einfahren").play();
            }*/
        }
    }

}