"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader, CubeTextureLoader } from "three";
import Nav from "../Components/Nav";

const ContactTV3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // ─── Scene & Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const envMap = new CubeTextureLoader()
      .setPath("/hdr/")
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(-6, 4, 18);

    // ─── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ─── Lights ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    scene.add(dirLight);

    // ─── TV & Stand Dimensions ───────────────────────────────────────────────
    const frontW = 9,
      frontH = 9,
      depth = 4;
    const backW = 7,
      backH = 7;
    const hd = depth / 2;
    const standTh = 0.4;
    const floorY = -frontH / 2;

    // ─── Floor ───────────────────────────────────────────────────────────────
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.ShadowMaterial({ opacity: 0.3 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = floorY;
    floor.receiveShadow = true;
    scene.add(floor);

    // ─── Trapezoidal TV Body ────────────────────────────────────────────────
    const hwF = frontW / 2,
      hhF = frontH / 2,
      hwB = backW / 2,
      hhB = backH / 2;
    const verts = new Float32Array([
      -hwF,
      -hhF,
      hd,
      hwF,
      -hhF,
      hd,
      hwF,
      hhF,
      hd,
      -hwF,
      hhF,
      hd,
      -hwB,
      -hhB,
      -hd,
      hwB,
      -hhB,
      -hd,
      hwB,
      hhB,
      -hd,
      -hwB,
      hhB,
      -hd,
    ]);
    const idx = [
      0, 1, 2, 0, 2, 3, 5, 4, 7, 5, 7, 6, 3, 2, 6, 3, 6, 7, 4, 5, 1, 4, 1, 0, 1,
      5, 6, 1, 6, 2, 4, 0, 3, 4, 3, 7,
    ];
    const bodyGeom = new THREE.BufferGeometry();
    bodyGeom.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    bodyGeom.setIndex(idx);
    bodyGeom.computeVertexNormals();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x707070,
      metalness: 0.7,
      roughness: 0.3,
      envMap,
      envMapIntensity: 0.8,
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = standTh;
    scene.add(body);

    // ─── Screen Canvas (flat inset, centered “Let’s Talk”) ────────────────
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 1024;
    screenCanvas.height = 1024;
    const sc = screenCanvas.getContext("2d")!;
    sc.fillStyle = "#000";
    sc.fillRect(0, 0, 1024, 1024);
    sc.fillStyle = "#fff";
    sc.font = "bold 150px Arial";
    sc.textAlign = "center";
    sc.textBaseline = "middle";
    sc.fillText("Let's Talk", 512, 400);

    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(frontW - 1.2, frontH - 1.2),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    screenMesh.position.z = hd + 0.02;
    body.add(screenMesh);

    // ─── Stand Wedge ───────────────────────────────────────────────────────
    const sd = depth * 0.5,
      sw = frontW * 0.6;
    const fBY = standTh - frontH / 2,
      bBY = standTh - backH / 2;
    const vs = new Float32Array([
      -sw / 2,
      floorY,
      sd / 2,
      sw / 2,
      floorY,
      sd / 2,
      sw / 2,
      fBY,
      sd / 2,
      -sw / 2,
      fBY,
      sd / 2,
      -sw / 2,
      floorY,
      -sd / 2,
      sw / 2,
      floorY,
      -sd / 2,
      sw / 2,
      bBY,
      -sd / 2,
      -sw / 2,
      bBY,
      -sd / 2,
    ]);
    const is = [
      0, 1, 2, 0, 2, 3, 5, 4, 7, 5, 7, 6, 4, 0, 3, 4, 3, 7, 2, 1, 5, 2, 5, 6, 3,
      2, 6, 3, 6, 7, 4, 5, 1, 4, 1, 0,
    ];
    const standGeom = new THREE.BufferGeometry();
    standGeom.setAttribute("position", new THREE.BufferAttribute(vs, 3));
    standGeom.setIndex(is);
    standGeom.computeVertexNormals();

    const standMat = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.3,
      roughness: 0.5,
    });
    const stand = new THREE.Mesh(standGeom, standMat);
    stand.castShadow = true;
    stand.receiveShadow = true;
    scene.add(stand);

    // ─── Icons & Interaction ───────────────────────────────────────────────
    const loader = new TextureLoader();
    const iconData = [
      { url: "/phone-call.png", x: -2.4, y: -1.5, type: "phone" },
      { url: "/email.png", x: -0.4, y: -1.5, type: "email" },
      { url: "/gps.png", x: 1.6, y: -1.5, type: "message" },
    ];
    const icons: THREE.Mesh[] = [];
    iconData.forEach(({ url, x, y, type }) => {
      loader.load(url, (tex) => {
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
        });
        const aspect = tex.image.width / tex.image.height;
        const h = 1.1,
          w = h * aspect;
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
        m.position.set(x, y + standTh, hd + 0.03);
        m.userData.type = type;
        scene.add(m);
        icons.push(m);
      });
    });

    const detailCanvas = document.createElement("canvas");
    detailCanvas.width = 1024;
    detailCanvas.height = 614;
    const dc = detailCanvas.getContext("2d")!;
    let detailMesh: THREE.Mesh | null = null;
    let mode: "icons" | "detail" = "icons";
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function showIcons() {
      mode = "icons";
      icons.forEach((m) => (m.visible = true));
      if (detailMesh) {
        scene.remove(detailMesh);
        detailMesh = null;
      }
    }
    function showDetail(type: string) {
      mode = "detail";
      icons.forEach((m) => (m.visible = false));
      dc.fillStyle = "#000";
      dc.fillRect(0, 0, 1024, 614);
      dc.fillStyle = "#fff";
      dc.font = "60px Arial";
      dc.textAlign = "left";
      dc.textBaseline = "top";
      if (type === "phone") {
        dc.fillText("Call Us:", 50, 50);
        dc.font = "50px Arial";
        dc.fillText("+94 77 123 4567", 50, 130);
      } else if (type === "email") {
        dc.fillText("Email Us:", 50, 50);
        dc.font = "50px Arial";
        dc.fillText("info@webmindsdesigns.com", 50, 130);
      } else {
        dc.fillText("Message Us:", 50, 50);
        dc.font = "50px Arial";
        dc.fillText("@webminds_support", 50, 130);
      }
      dc.font = "40px Arial";
      dc.fillText("← Back", 50, 520);

      const tex = new THREE.CanvasTexture(detailCanvas);
      detailMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(frontW - 1.2, (frontW - 1.2) * (614 / 1024)),
        new THREE.MeshBasicMaterial({ map: tex })
      );
      detailMesh.position.set(0, standTh, hd + 0.03);
      scene.add(detailMesh);
    }

    function onClick(e: MouseEvent) {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      ray.setFromCamera(mouse, camera);
      if (mode === "icons") {
        const hit = ray.intersectObjects(icons)[0];
        if (hit) showDetail(hit.object.userData.type);
      } else {
        showIcons();
      }
    }
    window.addEventListener("click", onClick);

    // ─── Orbit Controls ─────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    // keep default: user can rotate, pan, zoom manually

    // ─── Animation Loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      // icon pulse only
      icons.forEach((m, i) => {
        const s = 1 + 0.1 * Math.sin(t * 2 + i);
        m.scale.set(s, s, s);
      });
      controls.update();
      renderer.render(scene, camera);
    })();

    // ─── Resize Handler ────────────────────────────────────────────────────
    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // ─── Cleanup ───────────────────────────────────────────────────────────
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
        background: "linear-gradient(135deg,#1A1F5E 0%,#31B0B1 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Nav />
    </div>
  );
};

export default ContactTV3D;
