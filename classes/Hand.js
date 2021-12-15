// ******************************************************************************
// 
// Project Windfall: Hand.js
//
// Copyright© 2021
//
// ******************************************************************************
import { CardSlot } from './CardSlot.js';
import { CardSlotActionHandler } from './CardSlotActionHandler.js';

export class Hand {

    // ------------------------------------------------------------------------------
    // PUBLIC
    // ------------------------------------------------------------------------------

    constructor(numberOfCardSlotsInHand) {
        this.#cardSlots = [];
        this.#selectedCardSlot = null;
        for (let cardSlotIndex = 0; cardSlotIndex < numberOfCardSlotsInHand; cardSlotIndex++) {
            this.#cardSlots.push(new CardSlot());
        }
    }

    addToThreeJSScene(threeJSScene) {
        const numberOfCards = this.#cardSlots.length;
        const cardSize = 0.6;
        const paddingBetweenCards = 0.16;
        const yPositionOfCards = -2.75;
        const leftMostXPositionOfCards = 0 - ((cardSize * numberOfCards) / 2) - ((paddingBetweenCards * (numberOfCards - 1))/2);
        for (let cardSlotIndex = 0; cardSlotIndex < this.#cardSlots.length; cardSlotIndex++) {
            const cardSlot = this.#cardSlots[cardSlotIndex];
            const xPositionOfCard = (leftMostXPositionOfCards) + (cardSlotIndex * (cardSize + paddingBetweenCards)) + (cardSize/2);
            cardSlot.addToThreeJSScene(threeJSScene, xPositionOfCard, yPositionOfCards, 0, 0, cardSize, cardSize);
        }
    }

    cardSlotActionHandler() {
        return new CardSlotActionHandler(this.#cardSlots, 
            (cardSlotMouseOver) => {
            this.#onMouseOver(cardSlotMouseOver);
        },  (cardSlotMouseLeave) => {
            this.#onMouseLeave(cardSlotMouseLeave);
        },  (cardSlotClicked) => {
            this.#onClick(cardSlotClicked);
        });
    }

    aSelectedCardExists() {
        return (this.#selectedCardSlot != null && !this.#selectedCardSlot.isEmpty());
    }

    popSelectedCard() {
        const selectedCard = this.#selectedCardSlot.card();
        this.#selectedCardSlot.setCard(null);
        this.#selectedCardSlot.setCardSelected(false);
        this.#selectedCardSlot = null;
        return selectedCard;
    }

    setCardsInHand(cards) {
        if (cards.length > this.#cardSlots.length) {
            throw "setCardsInHand was more cards then the size of hand";
        }
        for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
            this.#cardSlots[cardIndex].setCard(cards[cardIndex]);
        }
    }

    // ------------------------------------------------------------------------------
    // PRIVATE
    // ------------------------------------------------------------------------------

    #cardSlots;
    #selectedCardSlot;

    #onClick(cardSlot) {
        if(cardSlot.cardIsSelected()) {
            cardSlot.setCardSelected(false);
            this.#selectedCardSlot = null;
        } else {
            cardSlot.setCardSelected(true);
            if (this.#selectedCardSlot != null) {
                this.#selectedCardSlot.setCardSelected(false);
            }
            this.#selectedCardSlot = cardSlot;
        }
    }

    #onMouseOver(cardSlot) {
        cardSlot.setCardFocus(true);
    }
    
    #onMouseLeave(cardSlot) {
        cardSlot.setCardFocus(false);
    }

}
