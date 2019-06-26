TVFromFile = function () {

    var tv = new THREE.Group();
    var fbxloader = new THREE.FBXLoader();

    tvAnimationMixer = null;

    fbxloader.load('src/models/BlenderTV/tv.fbx', function (object) {

        tv.add(object);

         object.traverse(function(child) {
             if(child.isMesh){
                 child.castShadow = true;
             }
         });

        // Speichert alle Animationen in einen AnimationMixer
        tvAnimationMixer = new THREE.AnimationMixer(object);

        //tvAnimationMixer.clipAction( gltf.animations[0] ).play();

        for (var i = 0; i < object.animations.length; i++) {
            var action = tvAnimationMixer.clipAction(object.animations[i]);
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
        }

        console.log(tvAnimationMixer);
    });

    tvState = {
        powerOn: false,
        channel1: false,
        antennaOut: false,
        markerRight: false,
        currentVideoPlaying: null
    };

    return tv;
}

