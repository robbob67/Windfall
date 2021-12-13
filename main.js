// ******************************************************************************
// 
// Project Windfall: index.js
//
// Copyright © 2021
//
// ******************************************************************************
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

// ------------------------------------------------------------------------------
// MAIN
// ------------------------------------------------------------------------------
function main() {
    const gameScene = new GameScene();
    const table = new Table(100);
    const hand = new Hand(5);
    
    gameScene.startRendering();
    gameScene.addTable(table);
    gameScene.addHand(hand);
}

// ------------------------------------------------------------------------------
// SCRIPT
// ------------------------------------------------------------------------------
main();