// ******************************************************************************
// 
// Project Windfall: index.js
//
// Copyright © 2021
//
// ******************************************************************************
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({ antialias: true})
 
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor("#222222")
document.body.appendChild( renderer.domElement )
camera.position.z = 5
 
// resize canvas on resize window
window.addEventListener( 'resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize( width, height )
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})
 
// basic cube
var geometry = new THREE.BoxGeometry( 1, 1, 1)
var material = new THREE.MeshStandardMaterial( { color: 0xff0051, flatShading: true, metalness: 0, roughness: 1 })
var cube = new THREE.Mesh ( geometry, material )
scene.add( cube )

// Plane
//const geometry = new THREE.PlaneGeometry( 1, 1 );
//const texture = new THREE.TextureLoader().load( 'textures/treant.png' );
//const material = new THREE.MeshBasicMaterial( { map: texture } );
//const plane = new THREE.Mesh( geometry, material );
//scene.add( plane )

//

// Plane
//const geometry = new THREE.PlaneGeometry( 1, 1 );
//const texture = new THREE.TextureLoader().load( 'textures/treant.png' );
//const material = new THREE.MeshBasicMaterial( { map: texture } );
//const plane = new THREE.Mesh( geometry, material );
//scene.add( plane );
 


;
 
// ambient light
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
scene.add( ambientLight )
 
// point light
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight ); 
 
function animate() {
    requestAnimationFrame( animate )
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    renderer.render( scene, camera )
}
animate()