TVFromFileGlTF = function () {

    gltfStore = {};

    var tv = new THREE.Group();
    var loader = new THREE.GLTFLoader();

    tvAnimationMixer = null;

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    //THREE.DRACOLoader.setDecoderPath( '../../lib/three.js-r103/examples/js/libs/draco' );
    //loader.setDRACOLoader( new THREE.DRACOLoader() );

    // Optional: Pre-fetch Draco WASM/JS module, to save time while parsing.
    //THREE.DRACOLoader.getDecoderModule();

    path = "src/models/BlenderTV/tv1.gltf";

    loader.load(path, function (gltf) {

            tv.add(gltf.scene);

            gltfStore.animations = gltf.animations; // Array<THREE.AnimationClip>
            gltfStore.scene = gltf.scene; // THREE.Scene
            gltfStore.scenes = gltf.scenes; // Array<THREE.Scene>
            gltfStore.cameras = gltf.cameras; // Array<THREE.Camera>
            gltfStore.asset = gltf.asset; // Object

        // Zeigt mir alle verfügbaren Animationen
        console.log(gltf.animations);

        //tvAnimationMixer = new THREE.AnimationMixer(gltf.animations);
        //tvAnimationMixer.clipAction(gltf.animations[0]).play();

        // Speichert alle Animationen in einen AnimationMixer
        tvAnimationMixer = new THREE.AnimationMixer(gltf.scene);
        //tvAnimationMixer.clipAction( gltf.animations[0] ).play();

        for (var i = 0; i < gltf.animations.length; i++) {
            var action = tvAnimationMixer.clipAction(gltf.animations[i]);
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
        }

        console.log(tvAnimationMixer);

        },
        // called while loading is progressing
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );

    tvState = {
        powerOn: false,
        antennaOut: false,
        antennaRotated: false,
        markerRight: false
    };

    return tv;
}

