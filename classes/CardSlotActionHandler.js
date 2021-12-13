// ******************************************************************************
// 
// Project Windfall: CardSlotActionHandler.js
//
// Copyright© 2021
//
// ******************************************************************************
import { CardSlot } from './CardSlot.js';

export class CardSlotActionHandler {

    // ------------------------------------------------------------------------------
    // PUBLIC
    // ------------------------------------------------------------------------------

    constructor(cardSlots, onMouseOver, onMousedLeave, onClick) {

        // Type Check
        for (let i = 0; i < cardSlots.length; i++) {
            if(!(cardSlots[i] instanceof CardSlot)) {
                throw 'Action handler requires card slots.';
            }
        }

        this.#cardSlots = cardSlots;
        this.#onClick = onClick;
        this.#onMouseOver = onMouseOver;
        this.#onMousedLeave = onMousedLeave;
        this.#lastMouseOverCardSlot = null;
    }

    notifyMouseClick() {
        if (this.#lastMouseOverCardSlot != null) {
            this.#onClick(this.#lastMouseOverCardSlot);
        }
    }
    
    clearEventHistory() {
        this.#lastMouseOverCardSlot = null;
    }
    
    notifyMouseOver(mesh) {
        for (let i = 0; i < this.#cardSlots.length; i++) {
            const cardSlot = this.#cardSlots[i];
            if (cardSlot.meshIsOwned(mesh)) {
                this.#lastMouseOverCardSlot = cardSlot;
                this.#onMouseOver(cardSlot);
            }
        }
    }
    
    notifyMouseLeave(mesh) {
        for (let i = 0; i < this.#cardSlots.length; i++) {
            const cardSlot = this.#cardSlots[i];
            if (cardSlot.meshIsOwned(mesh)) {
                this.#onMousedLeave(cardSlot);
            }
        }
    }

    // ------------------------------------------------------------------------------
    // PRIVATE
    // ------------------------------------------------------------------------------
    
    #cardSlots;
    #onMouseOver;
    #onClick;
    #lastMouseOverCardSlot;
    #onMousedLeave;

}