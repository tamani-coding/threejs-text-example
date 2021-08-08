import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// INIT CAMERA
camera.position.z = 60;
camera.position.x = 3;
camera.position.y = 20;
camera.lookAt(0, 0, -50)

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
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.x += 20
// directionalLight.position.y += 20
// directionalLight.position.z += 20
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.width = 4096;
// directionalLight.shadow.mapSize.height = 4096;
// const d = 25;
// directionalLight.shadow.camera.left = - d;
// directionalLight.shadow.camera.right = d;
// directionalLight.shadow.camera.top = d;
// directionalLight.shadow.camera.bottom = - d;
// scene.add(directionalLight);

// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// POINT LIGHT
const light1 = new THREE.PointLight( 0xff6666, 1, 100 );
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add( light1 );

const light2 = new THREE.PointLight( 0x33ff33, 1, 100 );
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add( light2 );

// TEXT

const loader = new THREE.FontLoader();

loader.load('./fonts/optimer_bold.typeface.json', function (font) {
    const geometry = new THREE.TextGeometry('three.js', {
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
    textMesh1.position.y += 10
    textMesh1.position.x -= 6
    textMesh1.rotation.y = 0.25    
    scene.add(textMesh1)
});

loader.load('./fonts/Teko_Medium_Regular.json', function (font) {
    const geometry = new THREE.TextGeometry('3D TEXT', {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 10,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness:1
    });
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xa8325c}), // front
        new THREE.MeshPhongMaterial({ color: 0x540722}) // side
    ];
    const textMesh2 = new THREE.Mesh(geometry, materials);
    textMesh2.castShadow = true
    textMesh2.position.y += 5
    textMesh2.position.x -= 6
    textMesh2.rotation.y = -0.25    
    scene.add(textMesh2)
});

loader.load( 'fonts/Teko_Medium_Regular.json', function ( font ) {

    const color = 0xffb8fb;

    const matLite = new THREE.MeshBasicMaterial( {
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    } );

    const message = "(´°_°`)";

    const shapes = font.generateShapes( message, 20 );

    const geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    const text = new THREE.Mesh( geometry, matLite );
    text.position.z = -40
    text.position.y = 5
    scene.add( text );

} ); //end load function

// ANIMATE
function animate() {
    const now = Date.now() / 1000;
    light1.position.y = 15;
    light1.position.x = Math.cos(now) * 20;
    light1.position.z = Math.sin(now) * 20;

    light2.position.y = 15;
    light2.position.x = Math.sin(now) * 20;
    light2.position.z = Math.cos(now) * 20;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();