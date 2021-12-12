// ******************************************************************************
// 
// Project Windfall: index.js
//
// Copyright © 2021
//
// ******************************************************************************

class CardSlot {
    #meshes;
    #cardIsFocused;
    #cardIsSelected;
    static BLANK_CARD_TEXTURE = new THREE.TextureLoader().load( 'textures/treant.png' );
    constructor() {
        this.#cardIsFocused = false;
        this.#cardIsSelected = false;
        this.#meshes = [];
    }
    addToThreeJSScene(threeJSScene, xPosition, yPosition, zPosition, tiltInRadians, width, height) {
        const size = Math.min(width, height);
        const geometry = new THREE.PlaneGeometry( size, size );
        const material = new THREE.MeshBasicMaterial( { map: CardSlot.BLANK_CARD_TEXTURE } );
        //var material = new THREE.MeshStandardMaterial( { color: 0x00ff00, flatShading: true, metalness: 0, roughness: 1 });
        const cardPlane = new THREE.Mesh( geometry, material );
        this.#meshes.push(cardPlane);
        geometry.translate( xPosition - ((width - size)/2), yPosition - ((height - size)/2), zPosition );
        cardPlane.rotation.x = tiltInRadians;
        threeJSScene.add( cardPlane );
    }
    #doMeshAction(meshAction) {
        for (let i = 0; i < this.#meshes.length; i++) {
            meshAction(this.#meshes[i]);
        }
    }
    meshIsOwnedByCardSlot(mesh) {
        for (let i = 0; i < this.#meshes.length; i++) {
            if (this.#meshes[i] == mesh) {
                return true;
            }
        }
        return false;
    }
    setCardFocus(isFocused) {
        if (this.#cardIsFocused != isFocused) {
            this.#cardIsFocused = isFocused;
            if (isFocused) {
                this.#doMeshAction((mesh) => {
                    mesh.position.z += 0.3;
                    mesh.position.y += 0.17;
                });
            } else {
                this.#doMeshAction((mesh) => {
                    mesh.position.z -= 0.3;
                    mesh.position.y -= 0.17;
                });
            }
        }
    }
    cardIsSelected() {
        return this.#cardIsSelected;
    }
    setCardSelected(isSelected) {
        if (this.#cardIsSelected != isSelected) {
            this.#cardIsSelected = isSelected;
            if (isSelected) {
                this.#doMeshAction((mesh) => {
                    //mesh.material = new THREE.MeshStandardMaterial( { color: 0x00ff00, flatShading: true, metalness: 0, roughness: 1 });
                    mesh.material = new THREE.MeshBasicMaterial( { color: 0xffffff00 , map: CardSlot.BLANK_CARD_TEXTURE } );
                });
            } else {
                this.#doMeshAction((mesh) => {
                    mesh.material = new THREE.MeshBasicMaterial( { map: CardSlot.BLANK_CARD_TEXTURE } );
                });
            }
        }
    }
}

class ActionHandler {
    #cardSlotsToHandle;
    #onCardSlotWasMousedOver;
    #onCardSlotWasClicked;
    #mostRecentMouseOverCardSlot;
    #onCardSlotWasMousedleaved;
    constructor(cardSlotsToHandle, onCardSlotWasMousedOver, onCardSlotWasMousedleaved, onCardSlotWasClicked) {
        this.#cardSlotsToHandle = cardSlotsToHandle;
        this.#onCardSlotWasClicked = onCardSlotWasClicked;
        this.#onCardSlotWasMousedOver = onCardSlotWasMousedOver;
        this.#onCardSlotWasMousedleaved = onCardSlotWasMousedleaved;
        this.#mostRecentMouseOverCardSlot = null;
    }
    #cardSlotWasClicked(cardSlot) {
        this.#onCardSlotWasClicked(cardSlot);
    }
    #cardSlotWasMousedOver(cardSlot) {
        this.#onCardSlotWasMousedOver(cardSlot);
    }
    #cardSlotWasMouseLeaved(cardSlot) {
        this.#onCardSlotWasMousedleaved(cardSlot);
    }
    mouseClickOccured() {
        if (this.#mostRecentMouseOverCardSlot != null) {
            this.#cardSlotWasClicked(this.#mostRecentMouseOverCardSlot);
        }
    }
    clearMouseOverHistory() {
        //if ()
        this.#mostRecentMouseOverCardSlot = null;
    }
    meshWasMousedOver(mesh) {
        for (let i = 0; i < this.#cardSlotsToHandle.length; i++) {
            let cardSlot = this.#cardSlotsToHandle[i];
            if (cardSlot.meshIsOwnedByCardSlot(mesh)) {
                this.#mostRecentMouseOverCardSlot = cardSlot;
                this.#cardSlotWasMousedOver(cardSlot);
            }
        }
    }
    meshWasMouseLeaved(mesh) {
        for (let i = 0; i < this.#cardSlotsToHandle.length; i++) {
            let cardSlot = this.#cardSlotsToHandle[i];
            if (cardSlot.meshIsOwnedByCardSlot(mesh)) {
                this.#cardSlotWasMouseLeaved(cardSlot);
            }
        }
    }
}

class Table {
    static tableTiltRadians = -0.6;
    static tableWidth = 4;
    static tableHeight = 4;
    static tableDepth = 1;
    #cardSlots;
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
                this.#addCardSlotOnTableToThreeJSScene(cardSlot, threeJSScene, cardSlotRowIndex, cardSlotColumnIndex, cardSlotColumns, cardSlotRows);
                cardSlotIndex++;
            }
        }
    }
    #addCardSlotOnTableToThreeJSScene(cardSlot, threeJSScene, cardSlotRowIndex, cardSlotColumnIndex, cardSlotColumns, cardSlotRows) {
        const tableEdgePadding = 0.2;
        const cardWidth = (Table.tableWidth - (tableEdgePadding*2)) / cardSlotColumns;
        const cardHeight = (Table.tableHeight - (tableEdgePadding*2)) / cardSlotRows;
        const xPosition = (cardSlotColumnIndex*cardWidth) + tableEdgePadding - (Table.tableWidth / 2) + (cardWidth / 2);
        const yPosition = (cardSlotRowIndex*cardHeight) + tableEdgePadding - (Table.tableHeight / 2) + (cardHeight / 2);
        cardSlot.addToThreeJSScene(threeJSScene, xPosition, yPosition, (Table.tableDepth/2)+0.001, Table.tableTiltRadians, cardWidth, cardHeight);
    }
    actionHandler() {
        return new ActionHandler(this.#cardSlots, 
            (cardSlotMousedOver) => {
            console.log('handler mouse over');
            // Raise the card
            //cardSlotMousedOver.setCardFocus(true);
        }, (cardSlotMouseLeaved) => {
            console.log('handler mouse leaved');
            // Raise the card
            //cardSlotMouseLeaved.setCardFocus(false);
        }, (cardSlotWasClicked) => {
            console.log('handler clicked');
        });
    }
}

class Hand {
    #cardSlots;
    #selectedCard;
    constructor(numberOfCardSlotsInHand) {
        this.#cardSlots = [];
        this.#selectedCard = null;
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
            let cardSlot = this.#cardSlots[cardSlotIndex];
            let xPositionOfCard = (leftMostXPositionOfCards) + (cardSlotIndex * (cardSize + paddingBetweenCards)) + (cardSize/2);
            cardSlot.addToThreeJSScene(threeJSScene, xPositionOfCard, yPositionOfCards, 0, 0, cardSize, cardSize);
        }
    }
    actionHandler() {
        return new ActionHandler(this.#cardSlots, 
            (cardSlotMousedOver) => {
            console.log('handler mouse over');
            cardSlotMousedOver.setCardFocus(true);
            // Raise the card
        }, (cardSlotMouseLeaved) => {
            console.log('handler mouse leaved');
            // lower the card
            cardSlotMouseLeaved.setCardFocus(false);
        }, (cardSlotWasClicked) => {
            console.log('handler clicked');
            if(cardSlotWasClicked.cardIsSelected()) {
                cardSlotWasClicked.setCardSelected(false);
                this.#selectedCard = null;
            } else {
                cardSlotWasClicked.setCardSelected(true);
                if (this.#selectedCard != null) {
                    this.#selectedCard.setCardSelected(false);
                }
                this.#selectedCard = cardSlotWasClicked;
            }
        });
    }
}



class GameScene {
    #threeJSScene;
    #threeJScamera;
    #threeJSRenderer;
    #actionHandlers;
    #previousMouseOverList;
    constructor() {
        this.#threeJSScene = new THREE.Scene();
        this.#threeJScamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.#threeJSRenderer = new THREE.WebGLRenderer({ antialias: true});
        this.#actionHandlers = [];
        this.#previousMouseOverList = [];
        this.#addSceneToWindow();
        this.#addLightToScene();
        this.#startListeningToMouseEvents();
    }

    #addSceneToWindow() {
        this.#threeJSRenderer.setSize( window.innerWidth, window.innerHeight );
        this.#threeJSRenderer.setClearColor("#222222");
        document.body.appendChild( this.#threeJSRenderer.domElement );
        this.#threeJScamera.position.z = 5;
        window.addEventListener( 'resize', () => {
            let width = window.innerWidth;
            let height = window.innerHeight;
            this.#threeJSRenderer.setSize( width, height );
            this.#threeJScamera.aspect = width / height;
            this.#threeJScamera.updateProjectionMatrix();
        });
    }

    #addLightToScene() {
        // ambient light
        var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2);
        this.#threeJSScene.add( ambientLight );
 
        // point light
        var pointLight = new THREE.PointLight( 0xffffff, 1 );
        pointLight.position.set( 25, 50, 25 );
        this.#threeJSScene.add( pointLight ); 
    }

    addTable(table) {
        table.addToThreeJSScene(this.#threeJSScene);
        this.#actionHandlers.push(table.actionHandler());
    }

    addHand(hand) {
        hand.addToThreeJSScene(this.#threeJSScene);
        this.#actionHandlers.push(hand.actionHandler());
    }

    startRendering() {
        requestAnimationFrame( () => { 
            this.startRendering();
        } );
        this.#threeJSRenderer.render( this.#threeJSScene, this.#threeJScamera );
    }

    
    #startListeningToMouseEvents() {
        window.addEventListener( 'mousemove', (event) => {
            for (const actionHandler of this.#actionHandlers) {
                actionHandler.clearMouseOverHistory();
            }
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse, this.#threeJScamera );
            const intersects = raycaster.intersectObjects( this.#threeJSScene.children );
            
            // Mouse leave events
            for (const previousMouseOverObject of this.#previousMouseOverList) {
                let found = false;
                for ( let i = 0; i < intersects.length; i ++ ) {
                    if(intersects[i].object == previousMouseOverObject.object) {
                        found = true;
                    }
                }
                if(!found) {
                    for (const actionHandler of this.#actionHandlers) {
                        actionHandler.meshWasMouseLeaved(previousMouseOverObject.object);
                    }
                }
            }
            
            // Mouse enter events
            for ( let i = 0; i < intersects.length; i ++ ) {
                for (const actionHandler of this.#actionHandlers) {
                    actionHandler.meshWasMousedOver(intersects[i].object);
                }
            }

            // Set new previous
            this.#previousMouseOverList = intersects;
        }, false );
        window.addEventListener( 'mousedown', (event) => {
            for (const actionHandler of this.#actionHandlers) {
                actionHandler.mouseClickOccured();
            }
        }, false );
    }

}

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
 


