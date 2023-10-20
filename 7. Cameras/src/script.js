import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "rebeccapurple" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(mesh.position);
scene.add(camera);

const render = new THREE.WebGLRenderer({
  canvas,
});
render.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const frame = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.x = elapsedTime;
  mesh.rotation.y = elapsedTime;
  render.render(scene, camera);
  window.requestAnimationFrame(frame);
};

frame();
