import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// RESIZE HAMDLER
export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// INIT CAMERA
camera.position.z = 25;
camera.position.x = 3;
camera.position.y = 6;
camera.lookAt(0, 0, -20)

// INIT HEMISPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// SCENE
scene.background = new THREE.Color(0xffffff);

// FLOOR
for (var i = -50; i <= 50; i += 5) {
    for (var j = -50; j <= 50; j += 5) {
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 1), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
        plane.position.x = i;
        plane.position.z = j;
        plane.rotation.x = - Math.PI / 2
        plane.receiveShadow = true
        scene.add(plane);
    }
}


// DIRECTIONAL LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
const d = 25;
directionalLight.shadow.camera.left = - d;
directionalLight.shadow.camera.right = d;
directionalLight.shadow.camera.top = d;
directionalLight.shadow.camera.bottom = - d;
scene.add(directionalLight);

// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// SPOT LIGHT
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 20, 15, 20 );
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 4096;
// spotLight.shadow.mapSize.height = 4096;
// scene.add(spotLight)

// POINT LIGHT
// const light1 = new THREE.PointLight( 0xff0000, 1, 100 );
// light1.position.set( 20, 20, 20 );
// light1.castShadow = true;
// light1.shadow.mapSize.width = 4096;
// light1.shadow.mapSize.height = 4096;
// scene.add( light1 );

// const light2 = new THREE.PointLight( 0x00ff00, 1, 100 );
// light2.position.set( 20, 20, 20 );
// light2.castShadow = true;
// light2.shadow.mapSize.width = 4096;
// light2.shadow.mapSize.height = 4096;
// scene.add( light2 );

// TEXT
const loader = new THREE.FontLoader();
loader.load('./fonts/Ming_Imperial_Love.json', function (font) { // './fonts/droid/droid_sans_bold.typeface.json'
    const geometry = new THREE.TextGeometry('hello', {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 10,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness:1
    });
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff6600}), // front
        new THREE.MeshPhongMaterial({ color: 0x0000ff }) // side
    ];
    const textMesh1 = new THREE.Mesh(geometry, materials);
    textMesh1.castShadow = true
    textMesh1.position.y += 2
    textMesh1.position.x -= 3
    scene.add(textMesh1)
});


// ANIMATE
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();