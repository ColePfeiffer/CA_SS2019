ArmchairFromFile = function () {

    var chair = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    var path = 'src/models/Table/1.FBX';
    path = 'src/models/Table/leatherSessel2.fbx';


    fbxloader.load(path, function (object) {
        chair.add(object);
        console.log("geladen")

        object.traverse(function(child) {
            if(child.isMesh) {
                if(child.id === 330564314){
                    child.material.color.setHex(0x9D5821);
                }
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;

            }else if(child.isLight) {
                child.visible = false;
            }
        });
    });

    return chair;
}

