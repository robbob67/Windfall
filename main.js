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
import { GameContext } from './classes/GameContext.js';
import { Card } from './classes/Card.js';

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
    const numberOfTableCards = 64;
    const numberOfHandCards = 5;

    const gameScene = new GameScene();
    gameScene.startRendering();

    const hand = new Hand(numberOfHandCards);
    gameScene.addHand(hand);

    hand.setCardsInHand([new Card(), new Card()]);
    const gameContext = new GameContext(() => {
        return hand.aSelectedCardExists();
    }, () => {
        return hand.popSelectedCard();
    });

    const table = new Table(gameContext, numberOfTableCards);
    gameScene.addTable(table);
}

// ------------------------------------------------------------------------------
// SCRIPT
// ------------------------------------------------------------------------------
main();