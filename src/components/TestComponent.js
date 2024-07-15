import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

const TestComponent = () => {
  const canvasRef = useRef();
  const router = useRouter();

  // Function to navigate to the about page
  function navigateToAbout() {
    router.push("/about");
  }

  useEffect(() => {
    let camera, scene, renderer, controls;

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / (window.innerHeight * 2),
        0.1,
        100
      );
      camera.position.set(0, 2, 4);

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight * 2);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      const loader = new OBJLoader();
      loader.load("/models/can.obj", (obj) => {
        obj.traverse((child, index) => {
          if (child.isGroup && child?.children[0]?.id === 22) {
            child?.children[0]?.material?.addEventListener(
              "click",
              handleClick
            );
          }

          if (child.isMesh) {
            child.material = new THREE.MeshNormalMaterial();
          }
        });
        obj.scale.set(0.5, 0.5, 0.5);
        scene.add(obj);

        // Scroll-triggered animation using gsap
        gsap.to(obj.rotation, {
          scrollTrigger: {
            trigger: "#trigger",
            start: "top top",
            end: "bottom top",
            scrub: true,
            toggleActions: "restart pause resume pause",
          },
          y: Math.PI,
        });
      });

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Resize handling
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
        return needResize;
      }

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
      }

      // Render scene
      function render() {
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
      }

      // Event listener for resizing
      window.addEventListener("resize", () => {
        resizeRendererToDisplaySize(renderer);
        render();
      });

      // Start animation loop
      animate();
    }

    // Click handler for the object
    const handleClick = (event) => {
      console.log("Object clicked!", event.target);
      navigateToAbout();
    };

    // Initialize the scene
    init();

    // Cleanup
    return () => {
      window.removeEventListener("resize", () => {
        resizeRendererToDisplaySize(renderer);
        render();
      });
    };
  }, [router]);

  const handleButtonClick = () => {
    navigateToAbout();
  };

  const buttonStyle = {
    position: "absolute",
    top: "46%",
    left: "56%",
    width: "50px",
    height: "50px",
    opacity: 0,
    zIndex: 9999,
  };

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <canvas id="c" ref={canvasRef} />
        <button style={buttonStyle} onClick={handleButtonClick}>
          Invisible Button
        </button>
      </div>
    </>
  );
};

export default TestComponent;
