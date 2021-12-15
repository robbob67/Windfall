// ******************************************************************************
// 
// Project Windfall: GameContext.js
//
// Copyright© 2021
//
// ******************************************************************************
export class GameContext {

    // ------------------------------------------------------------------------------
    // PUBLIC
    // ------------------------------------------------------------------------------

    constructor(hasActiveCard, popActiveCard) {
        this.#hasActiveCard = hasActiveCard;
        this.#popActiveCard = popActiveCard;
    }

    hasActiveCard() {
        return this.#hasActiveCard();
    }

    popActiveCard() {
        return this.#popActiveCard();
    }
    
    // ------------------------------------------------------------------------------
    // PRIVATE
    // ------------------------------------------------------------------------------

    #hasActiveCard;
    #popActiveCard;
    
}