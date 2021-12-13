// ******************************************************************************
// 
// Project Windfall: action_handler.js
//
// Copyright© 2021
//
// ******************************************************************************
import { CardSlot } from './CardSlot.js';
import { CardSlotActionHandler } from './CardSlotActionHandler.js';

export class Table {

    // ------------------------------------------------------------------------------
    // PUBLIC
    // ------------------------------------------------------------------------------

    static tableTiltRadians = -0.6;
    static tableWidth = 4;
    static tableHeight = 4;
    static tableDepth = 1;
    
    constructor(numberOfCardSlots) {
        this.#cardSlots = [];
        for (let cardSlotIndex = 0; cardSlotIndex < numberOfCardSlots; cardSlotIndex++) {
            this.#cardSlots.push(new CardSlot());
        }
    }
    
    addToThreeJSScene(threeJSScene) {
        var geometry = new THREE.BoxGeometry( Table.tableWidth, Table.tableHeight, Table.tableDepth);
        var material = new THREE.MeshStandardMaterial( { color: 0xff0051, flatShading: true, metalness: 0, roughness: 1 });
        var tableBox = new THREE.Mesh ( geometry, material );
        tableBox.rotation.x = Table.tableTiltRadians;
        threeJSScene.add( tableBox );
        this.#addCardSlotsToThreeJSScene(threeJSScene);
    }
    
    cardSlotActionHandler() {
        return new CardSlotActionHandler(this.#cardSlots, 
            (cardSlotMousedOver) => {

        },  (cardSlotMouseLeaved) => {

        },  (cardSlotWasClicked) => {

        });
    }

    // ------------------------------------------------------------------------------
    // PRIVATE
    // ------------------------------------------------------------------------------

    #cardSlots;

    #addCardSlotsToThreeJSScene(threeJSScene) {
        let numberOfCardSlots = this.#cardSlots.length;
        var cardSlotColumns = Math.round(Math.sqrt(numberOfCardSlots));
        var cardSlotRows = cardSlotColumns;
        
        if (cardSlotColumns*cardSlotColumns != numberOfCardSlots) {
            throw 'Number of card slots must be square.';
        }
        
        var cardSlotIndex = 0;
        for (let cardSlotColumnIndex = 0; cardSlotColumnIndex < cardSlotColumns; cardSlotColumnIndex++) {
            for (let cardSlotRowIndex = 0; cardSlotRowIndex < cardSlotRows; cardSlotRowIndex++) {
                let cardSlot = this.#cardSlots[cardSlotIndex];
                this.#addCardSlotToThreeJSScene(cardSlot, threeJSScene, cardSlotRowIndex, cardSlotColumnIndex, cardSlotColumns, cardSlotRows);
                cardSlotIndex++;
            }
        }
    }
    
    #addCardSlotToThreeJSScene(cardSlot, threeJSScene, cardSlotRowIndex, cardSlotColumnIndex, cardSlotColumns, cardSlotRows) {
        const tableEdgePadding = 0.2;
        const cardWidth = (Table.tableWidth - (tableEdgePadding*2)) / cardSlotColumns;
        const cardHeight = (Table.tableHeight - (tableEdgePadding*2)) / cardSlotRows;
        const xPosition = (cardSlotColumnIndex*cardWidth) + tableEdgePadding - (Table.tableWidth / 2) + (cardWidth / 2);
        const yPosition = (cardSlotRowIndex*cardHeight) + tableEdgePadding - (Table.tableHeight / 2) + (cardHeight / 2);
        cardSlot.addToThreeJSScene(threeJSScene, xPosition, yPosition, (Table.tableDepth/2)+0.001, Table.tableTiltRadians, cardWidth, cardHeight);
    }

}