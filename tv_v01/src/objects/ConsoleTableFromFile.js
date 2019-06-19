ConsoleTableFromFile = function () {

    var table = new THREE.Group();

    var mtlLoader = new THREE.MTLLoader();

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    var onError = function ( xhr ) { };

    var path = 'src/models/Table/Nightstand/';
    var objname = 'eb_nightstand_01.obj';
    var mtlname = 'eb_nightstand_01.mtl';

    var path = 'src/models/Table/console/';
    var objname = 'console_table.obj';
    var mtlname = 'console_table.mtl';

    var path = 'src/models/Lamp_A/';
    var objname = 'eb_lamp_01.obj';
    var mtlname = 'eb_lamp_01.mtl';

    mtlLoader.setPath(path);

    mtlLoader.load(mtlname, function(materials) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();

        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load(objname, function(object) {
            table.add(object);

            object.traverse(function(child) {
                if(child.isMesh) {
                    child.material.map.anisotropy = 8;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });


        }, onProgress, onError);
    });


    return table;

}