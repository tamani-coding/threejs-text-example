import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function startStarWarsScene() {
    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // INIT CAMERA
    // camera.position.z = 45;
    // camera.position.x = 3;
    // camera.position.y = 20;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -40);
    controls.update();

    // RESIZE HAMDLER
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // SCENE
    scene.background = new THREE.Color(0x000000);

    // TEXT
    const loader = new THREE.FontLoader();

    var starWarsText: THREE.Mesh;
    loader.load('./fonts/Star_Jedi_Regular.json', function (font) {

        const lorem = 'three.js\n3D Text Example\n{ - } - $ - *\n% - # - 12\n....\n...\n..\n.'

        const geometry = new THREE.TextGeometry(lorem, {
            font: font,
            size: 4,
            height: 1,
            curveSegments: 10,
            bevelEnabled: false,
            bevelOffset: 0,
            bevelSegments: 1,
            bevelSize: 0.3,
            bevelThickness: 1
        });
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xffffff }), // front
            new THREE.MeshPhongMaterial({ color: 0x999999 }) // side
        ];
        starWarsText = new THREE.Mesh(geometry, materials);
        starWarsText.castShadow = true
        starWarsText.position.z = -50
        starWarsText.position.y = -10
        starWarsText.position.x = -30
        starWarsText.rotation.x = - Math.PI / 4
        scene.add(starWarsText)
    });


    // ANIMATE
    function animate() {
        if (starWarsText) {
            starWarsText.position.y += 0.05;
            starWarsText.position.z -= 0.05;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    document.body.appendChild(renderer.domElement);
    animate();

}