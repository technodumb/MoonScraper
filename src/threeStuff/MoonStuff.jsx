import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import '../process/getcoords.js'
import './MoonViewer.scss'
import GetData from '../process/getcoords.js';



function MoonStuff(){
    const scene = new THREE.Scene();
    // background colour
    scene.background = new THREE.Color(0xff0000);
    const threeCanvas = useRef(null);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    const textureLoader = new THREE.TextureLoader();
    const moonTexture  = textureLoader.load('./lroc_color_poles_4k.png');
    const moonGroup = new THREE.Group();
    const raycaster = new THREE.Raycaster();

    camera.position.z = 100;


    // const moonDisplacement = textureLoader.load('./ldem_4.png');
    // // const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff })
    // const sphereMaterial = new THREE.MeshStandardMaterial({ 
    //     map: moonTexture, 
    //     displacementMap:moonDisplacement, 
    //     displacementScale:-0.01 
    // });
    // const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    // const moon = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // import moon model
    let radius;

    const loader = new GLTFLoader();
    loader.load('./moon2.glb', (gltf) => {
        const moon = gltf.scene;
        const modelContainer = new THREE.Box3().setFromObject(moon);
        const width = modelContainer.max.x - modelContainer.min.x;
        const height = modelContainer.max.y - modelContainer.min.y;
        const depth = modelContainer.max.z - modelContainer.min.z;
        // camera.position.z = depth;
        console.log(width, height, depth);
        moon.scale.set(0.1, 0.1, 0.1);
        radius = width/2;
        
        // Add the marker to the scene
        moonGroup.add(moon);
        scene.add(moonGroup);
    });

    // console.log(moon);
    
    
    // give the moon a displacement map


    // const modelContainer = new THREE.Box3().setFromObject(moon);

    // const width = modelContainer.max.x - modelContainer.min.x;
    // const height = modelContainer.max.y - modelContainer.min.y;
    // const depth = modelContainer.max.z - modelContainer.min.z;
    // // camera.position.z = depth;

    const backgroundGeometry = new THREE.SphereGeometry( 200, 100,100);
    backgroundGeometry.scale( - 1, 1, 1 );
    const backgroundTexture = textureLoader.load('./starmap_4k.jpg');
    backgroundTexture.wrapS = THREE.ClampToEdgeWrapping;
    backgroundTexture.wrapT = THREE.ClampToEdgeWrapping;

    const backgroundMaterial = new THREE.MeshBasicMaterial( {
        map: backgroundTexture,
        // side: THREE.BackSide

    } );
    const backgroundMesh = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
    scene.add( backgroundMesh );

    // console.log(width, height, depth);
    // scene.add(moon);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(300, 0, 200);
    scene.add(directionalLight);
    // controller
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    // rotate the moon less compared to the default while draging
    controls.rotateSpeed = 0.3;

    controls.minDistance = 80;
    controls.maxDistance = 120;

//     var intersects = raycaster.intersectObject(moonGroup, true);

// if (intersects.length > 0) {
	
//     var object = intersects[0].object;

//     object.material.color.set( Math.random() * 0xffffff );

// }

    // make it rotate
    const rotationSpeed = 0.0001;
    const updateRotation = () => {
        moonGroup.rotation.y += rotationSpeed;
        // model.rotation.x += rotationSpeed;
    }
    const rotationInterval = setInterval(updateRotation, 2);
    const stopRotationOnUserInteraction = () => {
        clearInterval(rotationInterval);
        window.removeEventListener('click', stopRotationOnUserInteraction);
    }
    window.addEventListener('click', stopRotationOnUserInteraction);

    // 

    // Calculate the 3D position on the Moon's surface based on latitude and longitude
    // const position = calculatePosition(latitude, longitude, 50);
    
    // // Create a sphere marker
    // const markerGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Adjust the size as needed
    // const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    // const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    // moonGroup.add(marker);

    // // Set the position of the marker
    // marker.position.copy(position);
    


      
    useEffect(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeCanvas.current.appendChild(renderer.domElement);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
        const csvs = ['nakamura_1979.csv', 'nakamura_1983.csv', 'nakamura_2005.csv']
        let quakeDetails = [];

        // csvs.forEach((csv, j) => {
        // GetData(csv).then((data) => {
        //     let val = data.data;
        //     for(let i = 1; i<val.length; i++){
        //         const quakeDetail = new Quake(val[i][7], val[i][5], val[i][6], `${val[i][2]}:${val[i][3]}:${val[i][4]}`, val[i][0], val[i][1]);
        //         quakeDetails.push(quakeDetail);
        //         const position = calculatePosition(quakeDetails[i].lat, quakeDetails[i].lon, 50);
        //         const markerGeometry = new THREE.SphereGeometry(1, 32, 32); // Adjust the size as needed
        //         const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
        //         const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        //         moonGroup.add(marker);
        //         marker.position.copy(position);
        //         console.log(position);
        //     }
        //     });
        //  });
            // console.log(data.data);
            // let quakeDetails = [];
        //     data.data.forEach((quake) => {
        //         const quakeDetail = new Quake(quake[7], quake[5], quake[6], `${quake[2]}:${quake[3]}:${quake[4]}`, quake[0], quake[1]);
        //         quakeDetails.push(quakeDetail);
        //     });

        //     console.log(quakeDetails);

            for(let i=0; i<quakeDetails.length; i++){
                const position = calculatePosition(quakeDetails[i].lat, quakeDetails[i].lon, 50);
                const markerGeometry = new THREE.SphereGeometry(1, 32, 32); // Adjust the size as needed
                const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
                const marker = new THREE.Mesh(markerGeometry, markerMaterial);
                moonGroup.add(marker);
                marker.position.copy(position);
                console.log(position);
            }

        //     // const position = calculatePosition(latitude, longitude, radius);
        //     // const markerGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Adjust the size as needed
        //     // const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
        //     // const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        //     // moonGroup.add(marker);
        //     // marker.position.copy(position);
        //     // console.log(position);
        // });

        // resize canvas on resize window
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div ref={threeCanvas}></div>
    )
}


function calculatePosition(latitude, longitude, rad) {
    // Convert latitude and longitude from degrees to radians
    const latRad = latitude * (Math.PI / 180);
    const lonRad = -longitude * (Math.PI / 180);

    // Calculate the 3D position of the marker based on the latitude and longitude
    const x = rad * Math.cos(latRad) * Math.cos(lonRad);
    const y = rad * Math.sin(latRad);
    const z = rad * Math.cos(latRad) * Math.sin(lonRad);

    let pos =  new THREE.Vector3(x, y, z);
    return pos;
}

export default MoonStuff;


class Quake{
    constructor(mag, lat, lon, time, year, date){
        this.mag = mag;
        this.lat = lat;
        this.lon = lon;
        this.time = time;
        this.year = year;
        this.date = date;
    }
}