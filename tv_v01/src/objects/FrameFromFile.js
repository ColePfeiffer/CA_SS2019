FrameFromFile = function () {

    var table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    var path = 'src/models/frame.fbx';
    //let texpath = 'src/images/wood02.jpg';

    fbxloader.load(path, function (object) {
        table.add(object);

        object.traverse(function(child) {
            if(child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.color.setHex(0xff0000);

            }else if(child.isLight){
                child.visible = false;
            }
        });
    });

    return table;
}

