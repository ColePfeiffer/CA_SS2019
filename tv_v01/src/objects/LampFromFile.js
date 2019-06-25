LampFromFile = function () {

    var lamp = new THREE.Group();
    var objLoader = new THREE.OBJLoader();

    var path = 'src/models/Lamp_A/';
    var objname = 'eb_lamp_01.obj';
    var mtlname = 'eb_lamp_01.mtl';
    //radioAnimationMixer = null;

    objLoader.load(path+objname, function (object) {
        lamp.add(object),


            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }

        object.traverse(function(child) {
            if(child.isMesh) {
                if(child.id === 75){ // Lampenschirm
                    child.material.color.setHex(0x63A18B);
                }else if(child.id === 74){ // Lampensockel
                    child.material.color.setHex(0x48382A);
                }

                child.castShadow = true;
                child.receiveShadow = true;

            }else if(child.isLight){
                child.visible = true;
            }
        });
    });

    return lamp;
}

