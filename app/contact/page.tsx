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
    const envMap = new CubeTextureLoader().setPath("/hdr/");

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

    // ─── Dimensions ─────────────────────────────────────────────────────────
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
    floor.castShadow = false;
    scene.add(floor);

    // ─── TV Body ─────────────────────────────────────────────────────────────
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

    const body = new THREE.Mesh(
      bodyGeom,
      new THREE.MeshStandardMaterial({
        color: 0x707070,
        metalness: 0.7,
        roughness: 0.3,
        envMap,
        envMapIntensity: 0.8,
      })
    );
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = standTh;
    scene.add(body);

    // ─── Screen ─────────────────────────────────────────────────────────────
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = screenCanvas.height = 1024;
    const sc = screenCanvas.getContext("2d")!;
    sc.fillStyle = "#000";
    sc.fillRect(0, 0, 1024, 1024);
    sc.fillStyle = "#fff";
    sc.font = "bold 150px Arial";
    sc.textAlign = "center";
    sc.textBaseline = "middle";
    sc.fillText("Let's Talk", 512, 512);

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(frontW - 1.2, frontH - 1.2),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(screenCanvas),
      })
    );
    screenMesh.castShadow = true;
    screenMesh.receiveShadow = true;
    screenMesh.position.z = hd + 0.02;
    body.add(screenMesh);

    // ─── Stand Wedge ────────────────────────────────────────────────────────
    const sd = depth * 0.5,
      sw = frontW * 0.6;
    const fBY = standTh - frontH / 2,
      bBY = standTh - backH / 2;
    const vs2 = new Float32Array([
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
    const is2 = [
      0, 1, 2, 0, 2, 3, 5, 4, 7, 5, 7, 6, 4, 0, 3, 4, 3, 7, 2, 1, 5, 2, 5, 6, 3,
      2, 6, 3, 6, 7, 4, 5, 1, 4, 1, 0,
    ];
    const standGeom = new THREE.BufferGeometry();
    standGeom.setAttribute("position", new THREE.BufferAttribute(vs2, 3));
    standGeom.setIndex(is2);
    standGeom.computeVertexNormals();

    const stand = new THREE.Mesh(
      standGeom,
      new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.3,
        roughness: 0.5,
      })
    );
    stand.castShadow = true;
    stand.receiveShadow = true;
    scene.add(stand);

    // ─── Contact Icons & Interaction ───────────────────────────────────────
    const loader = new TextureLoader();
    const iconData = [
      { url: "/phone-call.png", x: -2.6, y: -1.5, type: "phone" },
      { url: "/email.png", x: -0.6, y: -1.5, type: "email" },
      { url: "/gps.png", x: 1.6, y: -1.5, type: "message" },
    ];
    const icons: THREE.Mesh[] = [];
    iconData.forEach(({ url, x, y, type }) => {
      loader.load(url, (tex) => {
        const aspect = tex.image.width / tex.image.height;
        const h = 1.1,
          w = h * aspect;
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ map: tex, transparent: true })
        );
        m.position.set(x + 0.5, standTh + y, hd + 0.03);
        m.userData.type = type;
        m.castShadow = true;
        m.receiveShadow = true;
        scene.add(m);
        icons.push(m);
      });
    });

    // ─── Detail Overlay ────────────────────────────────────────────────────
    const detailCanvas = document.createElement("canvas");
    detailCanvas.width = 1024;
    detailCanvas.height = 614;
    const dc = detailCanvas.getContext("2d")!;
    let detailMesh: THREE.Mesh | null = null;
    let mode: "icons" | "detail" = "icons";
    const ray = new THREE.Raycaster(),
      mouse = new THREE.Vector2();

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
        dc.fillText("Address:", 50, 50);
        dc.font = "50px Arial";
        dc.fillText("Colombo, Sri Lanka", 50, 130);
      }
      dc.font = "40px Arial";
      dc.fillText("← Back", 50, 520);

      detailMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(frontW - 1.2, (frontW - 1.2) * (614 / 1024)),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(detailCanvas),
        })
      );
      detailMesh.castShadow = true;
      detailMesh.receiveShadow = true;
      detailMesh.position.set(0, standTh + 0.5, hd + 0.03);
      scene.add(detailMesh);
    }

    window.addEventListener("click", (e: MouseEvent) => {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      ray.setFromCamera(mouse, camera);
      if (mode === "icons") {
        const hit = ray.intersectObjects(icons)[0];
        if (hit) showDetail(hit.object.userData.type);
      } else {
        showIcons();
      }
    });

    // ─── Props: Plant, Book, Mug & Smoke ─────────────────────────────────────
    // Plant
    const potH = 1.2,
      potR = 0.6;
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(potR, potR, potH, 32),
      new THREE.MeshStandardMaterial({ color: 0x8b4513 })
    );
    pot.position.set(-6, floorY + potH / 2, 0);
    pot.castShadow = true;
    pot.receiveShadow = true;
    scene.add(pot);

    const foliage = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x228b22 })
    );
    foliage.position.set(-6, floorY + potH + 0.7, 0);
    foliage.castShadow = true;
    foliage.receiveShadow = true;
    scene.add(foliage);

    // Book
    const bookH = 0.5;
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(3, bookH, 6),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    book.position.set(7, floorY + bookH / 2, 0);
    book.rotation.x = -Math.PI / 1;
    book.castShadow = true;
    book.receiveShadow = true;
    scene.add(book);

    // Mug + Handle
    const mugH = 1.5,
      mugR = 0.8;
    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(mugR, mugR, mugH, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    mug.position.set(2, floorY + mugH / 2, 4);
    mug.castShadow = true;
    mug.receiveShadow = true;
    scene.add(mug);

    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.4, 0.08, 16, 150, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x000000 })
    );
    handle.position.set(1.2, floorY + mugH / 2, 4);
    handle.rotation.z = Math.PI / 2;
    handle.castShadow = true;
    handle.receiveShadow = true;
    scene.add(handle);

    // Smoke particle setup
    const smokeTexture = new THREE.TextureLoader().load("/smoke.png");
    const smokeGeo = new THREE.PlaneGeometry(1, 1);
    const smokeMatBase = new THREE.MeshLambertMaterial({
      map: smokeTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const smokeParticles: THREE.Mesh[] = [];
    const numSmoke = 15;
    for (let i = 0; i < numSmoke; i++) {
      const mat = smokeMatBase.clone();
      const p = new THREE.Mesh(smokeGeo, mat);
      p.position.set(
        2 + (Math.random() - 0.5) * 0.2,
        floorY + mugH + Math.random() * 0.2,
        4 + (Math.random() - 0.5) * 0.2
      );
      p.rotation.z = Math.random() * Math.PI * 2;
      p.castShadow = true;
      p.receiveShadow = true;
      scene.add(p);
      smokeParticles.push(p);
    }

    // ─── Controls & Animate ────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    const clock = new THREE.Clock();
    (function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const delta = clock.getDelta();

      // pulse contact icons
      icons.forEach((m, i) => {
        m.scale.setScalar(1 + 0.1 * Math.sin(t * 2 + i));
      });

      // animate smoke
      smokeParticles.forEach((p) => {
        p.position.y += delta * 0.5;
        (p.material as any).opacity -= delta * 0.2;
        if ((p.material as any).opacity <= 0) {
          p.position.y = floorY + mugH;
          (p.material as any).opacity = 0.5 + Math.random() * 0.2;
          p.rotation.z = Math.random() * Math.PI * 2;
        }
      });

      controls.update();
      renderer.render(scene, camera);
    })();

    // ─── Resize & Cleanup ───────────────────────────────────────────────────
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="container" ref={mountRef}>
      <Nav />
      <style jsx global>{`
        /* reset & full-screen gradient on body */
        html,
        body,
        #__next {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        body {
          background: linear-gradient(135deg, #1a1f5e 0%, #31b0b1 100%);
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* ensure the Three.js canvas container fills the viewport */
        .container {
          position: fixed;
          inset: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ContactTV3D;
