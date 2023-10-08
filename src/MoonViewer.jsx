import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

function GLBViewer() {
  const containerRef = useRef();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer( { logarithmicDepthBuffer: true });
  const controls = useRef(null);
  
  useEffect(() => {
    // Set up renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xff0000, 0.5);
    containerRef.current.appendChild(renderer.domElement);

    // create sphere geometry

    const backgroundGeometry = new THREE.SphereGeometry( 500, 60, 40 );
    backgroundGeometry.scale( - 1, 1, 1 );
    const backgroundMaterial = new THREE.MeshBasicMaterial( {
      map: new THREE.TextureLoader().load( './starmap.jpg' )
    } );
    const backgroundMesh = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
    scene.add( backgroundMesh );

    // background is too bright, reduce brightness
    


    
    // Load GLB model
    // const loader = new GLTFLoader();
    // // make the model bigger
    // loader.load('./hd_moon.glb', (gltf) => {
    //   const model = gltf.scene;

    //   const modelContainer = new THREE.Box3().setFromObject(model);

    //   const width = modelContainer.max.x - modelContainer.min.x;
    //   const height = modelContainer.max.y - modelContainer.min.y;
    //   const depth = modelContainer.max.z - modelContainer.min.z;
    //   camera.position.z = depth;

    //   console.log(width, height, depth);


    //   scene.add(model);

    //   const rotationSpeed = 0.0001;

    //   const updateRotation = () => {
    //     model.rotation.y += rotationSpeed;
    //     // model.rotation.x += rotationSpeed;
    //   }

    //   const rotationInterval = setInterval(updateRotation, 2);

    //   const stopRotationOnUserInteraction = () => {
    //     clearInterval(rotationInterval);
        
    //     window.removeEventListener('click', stopRotationOnUserInteraction);
    //   }

    //   window.addEventListener('click', stopRotationOnUserInteraction);

    // },
    // (xhr) => {
    //   console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
    // },
    // (error) => {
    //   console.log(error);
    // }
    
    // );

    // const TextureLoader  = new THREE.TextureLoader();
    // TextureLoader.load(
    //   './starmap.jpg', function(texture) {
    //     scene.background = texture;
    //   }
    // );
    
    // Set camera position
    // camera.position.z = 2;
    
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    // scene.add(ambientLight);
  
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(-1050, 0, 400);
    // scene.add(directionalLight);
    
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      if (controls.current) {
        controls.current.update();
      }
    };
    
    animate();

    controls.current = new OrbitControls(camera, renderer.domElement);
    controls.current.target.set(0, 0, 0);

    // min and max disttance zoon
    controls.current.minDistance = 250;
    controls.current.maxDistance = 500;
    // Handle window resize
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    });

    // ambient light
 

    return () => {
      // Cleanup on unmount
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return <div ref={containerRef}></div>;
}

export default GLBViewer;
