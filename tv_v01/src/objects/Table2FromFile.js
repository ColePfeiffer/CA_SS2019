Table2FromFile = function () {

    var table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    var path = 'src/models/Lamp_A/eb_lamp_01.fbx';
    //path = 'src/models/Table/console/console_table.obj';
    // Nachttisch
    //path = 'src/models/Table/Nightstand/eb_nightstand_01.fbx';
    // Sessel
    //path = 'src/models/Table/1.FBX';
    path = 'src/models/Table/table0.fbx';


    fbxloader.load(path, function (object) {
        table.add(object);
        console.log("geladen")

        object.traverse(function(child) {
            if(child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.color.setHex(0x5A3517);

            }else if(child.isLight){
                child.visible = false;
            }
        });
    });

    return table;
}

