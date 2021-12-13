// ******************************************************************************
// 
// Project Windfall: index.js
//
// Copyright © 2021
//
// ******************************************************************************

import { CardSlotActionHandler } from './classes/CardSlotActionHandler.js';
import { CardSlot } from './classes/CardSlot.js';
import { Table } from './classes/Table.js';
import { Hand } from './classes/Hand.js';
import { GameScene } from './classes/GameScene.js';

class CardSpace {
    constructor() {
      //this.height = height;
      //this.width = width;
    }
}

//
class Board {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
}


var gameScene = new GameScene();
gameScene.startRendering();
var table = new Table(100);
var hand = new Hand(5);
gameScene.addTable(table);
gameScene.addHand(hand);

//

// Plane
//const geometry = new THREE.PlaneGeometry( 1, 1 );
//const texture = new THREE.TextureLoader().load( 'textures/treant.png' );
//const material = new THREE.MeshBasicMaterial( { map: texture } );
//const plane = new THREE.Mesh( geometry, material );
//scene.add( plane );
 


