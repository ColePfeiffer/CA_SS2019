/*function onDocumentMouseDown( event ) {
    var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   //x
        -( event.clientY / window.innerHeight ) * 2 + 1,  //y
        0.5 );                                            //z
    projector.unprojectVector( mouse3D, camera );
    mouse3D.sub( camera.position );
    mouse3D.normalize();
    var raycaster = new THREE.Raycaster( camera.position, mouse3D );
    var intersects = raycaster.intersectObjects( objects );
    // Change color if hit block
    if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
    }
}

function onDocumentMouseDown(evt) {
    evt.preventDefault();

    mousePosition.x = ((evt.clientX - canvasPosition.left) / canvas.width) * 2 - 1;
    mousePosition.y = -((evt.clientY - canvasPosition.top) / canvas.height) * 2 + 1;

    rayCaster.setFromCamera(mousePosition, camera);
    var intersects = rayCaster.intersectObjects(scene.getObjectByName('MyObj_s').children, true);

    if (intersects.length > 0)
        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
        return intersects[0].point;
};*/

function onDocumentMouseDown(event) {
    event.preventDefault();
    var vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse

    vec.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );

    vec.unproject( camera );

    vec.sub( camera.position ).normalize();

    var distance = - camera.position.z / vec.z;

    pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
    console.log(pos);
};


function onDocumentMouseDown(event) {
    event.preventDefault();

    event.preventDefault();
    var vec = new THREE.Vector3(); // create once and reuse
    var pos = new THREE.Vector3(); // create once and reuse

    vec.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
        0.5 );

    vec.unproject( camera );

    vec.sub( camera.position ).normalize();

    // vec = mouse3D
    var distance = - camera.position.z / vec.z;
    pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
    console.log(event);

    var raycaster = new THREE.Raycaster( camera.position, vec);
    var intersects = raycaster.intersectObjects(scene.children, true);
    // Change color if hit block
    if ( intersects.length > 0 ) {
        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
    }


};