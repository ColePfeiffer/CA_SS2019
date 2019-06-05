TVFromFile = function () {

    var tv = new THREE.Group();
    var objLoader = new THREE.OBJLoader();

    //radioAnimationMixer = null;

    objLoader.load('src/models/TV_A/Old_TV.obj', function (object) {

        tv.add(object),
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }

        // object.traverse(function(child) {
        //     if(child.name === "KorpusFBX" || child.name === "AntenneFBX" || child.name === "GriffFBX") {
        //         child.castShadow = true;
        //     }
        // });
        //
        // radioAnimationMixer = new THREE.AnimationMixer(object);
        //
        // for (var i = 0; i < object.animations.length; i++) {
        //
        //     var action = radioAnimationMixer.clipAction(object.animations[i]);
        //     action.clampWhenFinished = true;
        //     action.setLoop(THREE.LoopOnce);
        // }
    });

    tvState = {
        powerOn: false,
        antennaOut: false,
        markerRight: false
    };

    return tv;
}

