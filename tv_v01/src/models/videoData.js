video1 = document.createElement("video");
video1.loop = true;
video1.src = "src/videofiles/video1.mp4";
videoTexture1 = new THREE.VideoTexture(video1);
videoTexture1.minFilter = THREE.LinearFilter;
videoTexture1.magFilter = THREE.LinearFilter;
videoTexture1.format = THREE.RGBFormat;
videoTexture1.needsUpdate = true;

blackVideoScreen = new THREE.TextureLoader().load('src/models/TV/backgroundScreen.png');

video2 = document.createElement("video");
video2.loop = true;
video2.src = "src/videofiles/video2.mp4";
videoTexture2 = new THREE.VideoTexture(video2);
videoTexture2.minFilter = THREE.LinearFilter;
videoTexture2.magFilter = THREE.LinearFilter;
videoTexture2.format = THREE.RGBFormat;
videoTexture2.needsUpdate = true;
