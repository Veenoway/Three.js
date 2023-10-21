import * as THREE from "three";

// Cursor

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const sizes = {
  width: 800,
  height: 600,
};

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "orange",
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 4;
// camera.position.y = 2;
// camera.position.x = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const rendered = new THREE.WebGLRenderer({
  canvas,
});

rendered.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime;
  camera.position.x = cursor.x * 5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(new THREE.Vector3());
  // update Camera

  rendered.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
