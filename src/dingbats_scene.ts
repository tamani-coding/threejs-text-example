import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function startDingbatsScene() {
    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    scene.background = new THREE.Color('orange');

    // TEXT
    const loader = new THREE.FontLoader();

    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGAIJKLMNOPQRSTUVWXYZ!"§$%&/()=?`{[]}öäüÖÄÜ+#*\'~@<>|,.-;:_'

    const icons: THREE.Object3D[] = [];
    loader.load('./fonts/Journal_Dingbats 1_Regular.json', function (font) {
        var count = 0;
        for (var i = 0; i < letters.length; i++) {
            const character = `${letters.charAt(i)}`
            const geometry = new THREE.TextGeometry(character, {
                font: font,
                size: 4,
                height: 0.5,
                curveSegments: 10,
                bevelEnabled: false,
                bevelOffset: 0,
                bevelSegments: 1,
                bevelSize: 0.3,
                bevelThickness: 1
            });
            const materials = [
                new THREE.MeshPhongMaterial({ color: 0x0356fc }), // front
                new THREE.MeshPhongMaterial({ color: 0x001a4f }) // side
            ];
            const wrapper = new THREE.Object3D();
            wrapper.position.z = -80
            wrapper.position.x = (count % 20) * 10 - 100
            wrapper.position.y = Math.floor(count / 20) * 10 - 20
            wrapper.rotation.y = Math.random() * Math.PI

            const textMesh = new THREE.Mesh(geometry, materials);
            textMesh.position.x -= 3;
            wrapper.add(textMesh);

            scene.add(wrapper)
            icons.push(wrapper)

            count++;
        }
    });

    // ANIMATE
    function animate() {
        icons.forEach(m => {
            m.rotation.y += 0.02
        })

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    document.body.appendChild(renderer.domElement);
    animate();

}