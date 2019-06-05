Primitives = function () {

    // Private Members

    // Public Methods
    this.createCube = function () {

        var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(-5, 3, 5);
        cube.castShadow = true;
        return cube;
    }

    this.createSphere = function () {

        var sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(10, 5, -5);
        sphere.castShadow = true;
        return sphere;
    }

    this.createPlane = function () {

        var planeGeometry = new THREE.PlaneGeometry(40, 40);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa, wireframe: false});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, 0, 0);
        plane.rotation.x = -90 * DEG_TO_RAD;
        plane.receiveShadow = true;
        return plane;
    }
}

