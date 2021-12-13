// ******************************************************************************
// 
// Project Windfall: main.js
//
// Copyright © 2021
//
// ******************************************************************************
import { Table } from './classes/Table.js';
import { Hand } from './classes/Hand.js';
import { GameScene } from './classes/GameScene.js';

class CardSpace {
    constructor() {
    }
}

class Board {
    constructor() {
    }
}

// ------------------------------------------------------------------------------
// MAIN
// ------------------------------------------------------------------------------
function main() {
    const numberOfTableCards = 100;
    const numberOfHandCards = 5;

    const gameScene = new GameScene();
    const table = new Table(numberOfTableCards);
    const hand = new Hand(numberOfHandCards);
    
    gameScene.startRendering();
    gameScene.addTable(table);
    gameScene.addHand(hand);
}

// ------------------------------------------------------------------------------
// SCRIPT
// ------------------------------------------------------------------------------
main();