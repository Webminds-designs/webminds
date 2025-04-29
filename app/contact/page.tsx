"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import Nav from "../Components/Nav";

const ContactTV3D = () => {
  const mountRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const mount = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(-5, 3, 15);

    // Renderer with shadows and transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 50;
    scene.add(dirLight);

    // Floor to receive shadow
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.3 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // TV body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(9, 9, 2.5),
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.5,
        roughness: 0.4,
      })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    scene.add(body);

    // Screen plane (inside TV)
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    screenMesh.position.set(0, 0, 1.26);
    scene.add(screenMesh);

    // Load realistic icon textures
    const loader = new TextureLoader();
    const iconData = [
      { url: "/phone-call.png", x: -2.4, y: 0.5, type: "phone" },
      { url: "/icons/email.png", x: -0.4, y: 0.5, type: "email" },
      { url: "/icons/message.png", x: 1.6, y: 0.5, type: "message" },
    ];

    const iconMeshes = [];
    iconData.forEach(({ url, x, y, type }) => {
      loader.load(url, (texture) => {
        const mat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        const aspect = texture.image.width / texture.image.height;
        const h = 0.8;
        const w = h * aspect;
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
        mesh.position.set(x, y, 1.27);
        mesh.castShadow = true;
        mesh.userData.type = type;
        scene.add(mesh);
        iconMeshes.push(mesh);
      });
    });

    // Canvas for detail view
    let detailMesh = null;
    const detailCanvas = document.createElement("canvas");
    detailCanvas.width = 1024;
    detailCanvas.height = 614;
    const dctx = detailCanvas.getContext("2d");

    // Raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mode = "icons";

    function drawIcons() {
      // show icons set mode
      mode = "icons";
      iconMeshes.forEach((m) => (m.visible = true));
      if (detailMesh) {
        scene.remove(detailMesh);
        detailMesh = null;
      }
    }

    function drawDetail(type) {
      mode = "detail";
      iconMeshes.forEach((m) => (m.visible = false));
      dctx.clearRect(0, 0, detailCanvas.width, detailCanvas.height);
      dctx.fillStyle = "#fff";
      dctx.fillRect(0, 0, detailCanvas.width, detailCanvas.height);
      dctx.fillStyle = "#000";
      dctx.font = "60px Arial";
      if (type === "phone") {
        dctx.fillText("Call Us:", 380, 200);
        dctx.font = "50px Arial";
        dctx.fillText("+94 77 123 4567", 250, 300);
      } else if (type === "email") {
        dctx.fillText("Email Us:", 360, 200);
        dctx.font = "50px Arial";
        dctx.fillText("info@webminds.lk", 230, 300);
      } else {
        dctx.fillText("Message Us:", 330, 200);
        dctx.font = "50px Arial";
        dctx.fillText("@webminds_support", 200, 300);
      }
      dctx.fillStyle = "#000";
      dctx.font = "40px Arial";
      dctx.fillText("← Back", 50, 50);
      const tex = new THREE.CanvasTexture(detailCanvas);
      detailMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 4.8),
        new THREE.MeshBasicMaterial({ map: tex })
      );
      detailMesh.position.set(0, 0, 1.27);
      scene.add(detailMesh);
    }

    function onClick(e) {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      if (mode === "icons") {
        const hit = raycaster.intersectObjects(iconMeshes)[0];
        if (hit) drawDetail(hit.object.userData.type);
      } else {
        // back click anywhere
        drawIcons();
      }
    }
    window.addEventListener("click", onClick);

    // Controls and animate
    const controls = new OrbitControls(camera, renderer.domElement);
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      // pulse icons
      iconMeshes.forEach((m, i) => {
        const s = 1 + 0.1 * Math.sin(t * 2 + i);
        m.scale.set(s, s, s);
      });
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize
    function onResize() {
      const w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "linear-gradient(135deg,#1A1F5E 0%, #31B0B1  100%)",
        overflow: "hidden",
      }}
    >
      <Nav />
    </div>
  );
};

export default ContactTV3D;
