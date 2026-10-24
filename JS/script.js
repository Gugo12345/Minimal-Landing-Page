const container = document.getElementById('three-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 4.5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(2, 0); 
const material = new THREE.MeshStandardMaterial({
    color: 0x4CAF4F,
    roughness: 0.4,
    metalness: 0.7
});
 const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
scene.add(mesh);

const shadowPlaneGeometry = new THREE.PlaneGeometry(10, 10);
const shadowPlaneMaterial = new THREE.ShadowMaterial({ opacity: 0.25 }); 
const shadowPlane = new THREE.Mesh(shadowPlaneGeometry, shadowPlaneMaterial);
shadowPlane.rotation.x = -Math.PI / 2; 
shadowPlane.position.y = -2.3;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 8, 5);
dirLight.castShadow = true; 
dirLight.shadow.mapSize.width = 1024;  
dirLight.shadow.mapSize.height = 1024;
scene.add(dirLight);

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.004;
    mesh.rotation.y += 0.006;

    mesh.rotation.x += mouseY * 0.1;
    mesh.rotation.y += mouseX * 0.1;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});