import './style/main.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//scene
const scene = new THREE.Scene();
const canvas = document.querySelector('.canvas');
//object

const geometry = new THREE.BufferGeometry();

const count = 50;
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 4
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

geometry.setAttribute( 'position', positionAttribute );

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    wireframe: true
})

const cube1 = new THREE.Mesh(geometry, material);
scene.add(cube1);

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitFullscreenElement) {
            canvas.webkitFullscreenElement();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
})

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100);
camera.position.z = 3;
scene.add(camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas
});

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

//animation
(function tick() {
    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
})();