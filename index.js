// import './style/main.css';
// import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

//scene
const scene  = new THREE.Scene();
const canvas = document.querySelector('.canvas');

//texture

const textureLoader = new THREE.TextureLoader();
const colortexture  = textureLoader.load('https://raw.githubusercontent.com/M-Wellerson/experimentationOCool/master/color.jpg');

//object
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh( 
    new THREE.CylinderGeometry( .3, .3, 1.5, 52, 5),
    new THREE.MeshBasicMaterial( { map: colortexture, side: THREE.DoubleSide } )
);
group.add(cube1);

//sizes
const sizes = { 
    width: window.innerWidth, 
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width  = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if( !fullscreenElement ) {
        if( canvas.requestFullscreen ) {
            canvas.requestFullscreen();
        }else if(canvas.webkitFullscreenElement){
            canvas.webkitFullscreenElement();
        }
    }else{
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    }
})

//camera
const camera      = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.01, 100 );
camera.position.z = 3;
scene.add(camera);

//controls
const controls         = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//renderer
const renderer = new THREE.WebGLRenderer( { 
    canvas,
    antialias: true
} );

//cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const clock = new THREE.Clock();
//animation
( function tick() {
    controls.update();
    const elapsedTime = clock.getElapsedTime();
    group.rotation.y  = elapsedTime - 1 * Math.PI * 2;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
} )();