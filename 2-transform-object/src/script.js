import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Texture
const loaderManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loaderManager);
const chromeTexture = textureLoader.load(
  "https://t4.ftcdn.net/jpg/06/13/22/73/360_F_613227360_SJOYFdjVbXYbcgkjhEp4ZiRnvQEMygDj.jpg"
);
const matcapTexture = textureLoader.load("/textures/stone.jpg");
const rockTexture = textureLoader.load("/textures/rock.jpg");
const goldTexture = textureLoader.load("/textures/gold.jpg");
const doorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAmbientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// matcapTexture.colorSpace = THREE.SRGBColorSpace;

const group = new THREE.Group();
/**
 * Object
 */

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// ENVIRONEMENT MAP
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "https://thumbs.dreamstime.com/b/paysage-de-lune-degr%C3%A9s-projection-equirectangular-carte-d-environnement-panorama-sph-rique-hdri-fond-l-espace-illustration-148886747.jpg",
  (env) => {
    env.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = env;
    scene.environment = env;
  }
);

const material = new THREE.MeshPhysicalMaterial();
material.roughness = 1;
material.metalness = 1;
// material.map = doorTexture;
// material.aoMap = doorAmbientTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// doorTexture.colorSpace = THREE.SRGBColorSpace;
// material.normalMap = doorNormalTexture;
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;
// material.side = THREE.DoubleSide;
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);
gui.add(material, "roughness").min(0.1).max(1).step(0.001);
gui.add(material, "metalness").min(0.1).max(1).step(0.001);
gui.add(material, "aoMapIntensity");
// scene.add(gui)

// material.sheen = 1;
// material.sheenRoughness = 0.25;

// Iridescence
material.iridescence = 1;
material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// Transmission

material.transmission = 1;
material.ior = 1.5;
gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(0).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.35, 0.15, 64, 128),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
group.add(sphere, plane, torus);

scene.add(group);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;

  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;
  sphere.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
