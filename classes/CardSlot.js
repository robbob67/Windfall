// ******************************************************************************
// 
// Project Windfall: CardSlot.js
//
// Copyright© 2021
//
// ******************************************************************************
export class CardSlot {

    // ------------------------------------------------------------------------------
    // PUBLIC
    // ------------------------------------------------------------------------------

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
    
    meshIsOwned(mesh) {
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
                this.#performMeshAction((mesh) => {
                    mesh.position.z += 0.3;
                    mesh.position.y += 0.17;
                });
            } else {
                this.#performMeshAction((mesh) => {
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
                this.#performMeshAction((mesh) => {
                    //mesh.material = new THREE.MeshStandardMaterial( { color: 0x00ff00, flatShading: true, metalness: 0, roughness: 1 });
                    mesh.material = new THREE.MeshBasicMaterial( { color: 0xffffff00 , map: CardSlot.BLANK_CARD_TEXTURE } );
                });
            } else {
                this.#performMeshAction((mesh) => {
                    mesh.material = new THREE.MeshBasicMaterial( { map: CardSlot.BLANK_CARD_TEXTURE } );
                });
            }
        }
    }

    // ------------------------------------------------------------------------------
    // PRIVATE
    // ------------------------------------------------------------------------------
    
    #meshes;
    #cardIsFocused;
    #cardIsSelected;

    #performMeshAction(action) {
        for (let i = 0; i < this.#meshes.length; i++) {
            action(this.#meshes[i]);
        }
    }
}