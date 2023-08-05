const scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const cube = new THREE.Mesh(geometry, material);
// Add cube to scene
scene.add(cube);
const sizes = {
  w: 800,
  h: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h);
// Change camera position
camera.position.z = 2;
camera.position.x = 2;
camera.position.y = -1;
camera.rotation.x = 0.5;
camera.scale.x = 2;
camera.scale.y = 0.5;

// Add camera to scene
scene.add(camera);

// renderer the canvas
const renderer = new THREE.WebGLRenderer({
  canvas,
});
// Add size to renderer
renderer.setSize(sizes.w, sizes.h);

// Render the scene
renderer.render(scene, camera);

// Train
// const newScene = new THREE.Scene();
// const test = document.querySelector(".test");
// const newGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
// const newMaterial = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// });
// const newMesh = new THREE.Mesh(newGeometry, newMaterial);
// newScene.add(newMesh);
// const sizes = {
//   w: 800,
//   h: 600,
// };
// const newCam = new THREE.PerspectiveCamera(70, sizes.w / sizes.h);
// newCam.position.z = 5;
// newCam.position.x = 2;
// newCam.position.y = 1;
// newScene.add(newCam);

// const newRenderer = new THREE.WebGLRenderer({
//   canvas: test,
// });

// newRenderer.setSize(sizes.w, sizes.h);
// newRenderer.render(newScene, newCam);
