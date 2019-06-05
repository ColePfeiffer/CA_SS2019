RadioFromFile = function () {

    var radio = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    radioAnimationMixer = null;

    fbxloader.load('src/models/Radio/Radio.fbx', function (object) {

        radio.add(object);

        object.traverse(function(child) {
            if(child.name === "KorpusFBX" || child.name === "AntenneFBX" || child.name === "GriffFBX") {
                child.castShadow = true;
            }
        });

        radioAnimationMixer = new THREE.AnimationMixer(object);

        for (var i = 0; i < object.animations.length; i++) {

            var action = radioAnimationMixer.clipAction(object.animations[i]);
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
        }
    });

    radioState = {
        powerOn: false,
        antennaOut: false,
        markerRight: false
    };

    return radio;
}

