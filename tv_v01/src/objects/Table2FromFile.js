Table2FromFile = function () {

    var table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    var path = 'src/models/Lamp_A/eb_lamp_01.fbx';
    path = 'src/models/Table/1';

    fbxloader.load(path, function (object) {
        table.add(object);
        console.log("geladen")

        object.traverse(function(child) {
            if(child.isMesh) {
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    });

    return table;
}

