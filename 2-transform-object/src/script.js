import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const group = new THREE.Group();

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "rgb(234,143,25)" })
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "rgb(100,143,250)" })
);

cube1.rotation.reorder("YXZ");
cube1.rotation.x = Math.PI * 0.25;

group.add(cube1);
scene.add(group);

// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 0.2;

// Axis helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const sizes = {
  width: 800,
  height: 600,
};

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.set(2, 1, 4);
scene.add(camera);

// console.log(mesh.position.distanceTo(camera.position));

// console.log(camera.position);

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time = Date.now();

const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // Update camera
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(new THREE.Vector3());

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
