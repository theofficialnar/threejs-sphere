import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

import "./style.css";

// Create scene
const scene = new THREE.Scene();

// Create sphere
const sphere = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.4,
});
const mesh = new THREE.Mesh(sphere, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Set light
const light = new THREE.PointLight(0xffffff, 90, 150);
light.position.set(0, 10, 10);

scene.add(light);

// Set camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;

scene.add(camera);

// Render
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

// Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};

renderLoop();

// Gsap timeline animations
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// Mouse color animation
let isMouseDown = false;

window.addEventListener("mousedown", () => (isMouseDown = true));
window.addEventListener("mouseup", () => (isMouseDown = false));
window.addEventListener("mousemove", (evt) => {
  if (isMouseDown) {
    const rgb = {
      r: evt.clientX / sizes.width,
      g: evt.clientY / sizes.height,
      b: 0.6,
    };

    gsap.to(mesh.material.color, rgb);
  }
});
