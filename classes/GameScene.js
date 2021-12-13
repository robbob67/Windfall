// ******************************************************************************
// 
// Project Windfall: GameScene.js
//
// Copyright© 2021
//
// ******************************************************************************
export class GameScene {

    // ------------------------------------------------------------------------------
    // PUBLIC
    // ------------------------------------------------------------------------------
    
    constructor() {
        this.#threeJSScene = new THREE.Scene();
        this.#threeJScamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.#threeJSRenderer = new THREE.WebGLRenderer({ antialias: true});
        this.#cardSlotActionHandlers = [];
        this.#previousMouseOverList = [];
        this.#addSceneToWindow();
        this.#addLightToScene();
        this.#startListeningToMouseEvents();
    }

    addTable(table) {
        table.addToThreeJSScene(this.#threeJSScene);
        this.#cardSlotActionHandlers.push(table.cardSlotActionHandler());
    }

    addHand(hand) {
        hand.addToThreeJSScene(this.#threeJSScene);
        this.#cardSlotActionHandlers.push(hand.cardSlotActionHandler());
    }

    startRendering() {
        requestAnimationFrame( () => { 
            this.startRendering();
        } );
        this.#threeJSRenderer.render( this.#threeJSScene, this.#threeJScamera );
    }

    // ------------------------------------------------------------------------------
    // PRIVATE
    // ------------------------------------------------------------------------------

    #threeJSScene;
    #threeJScamera;
    #threeJSRenderer;
    #cardSlotActionHandlers;
    #previousMouseOverList;

    #startListeningToMouseEvents() {
        window.addEventListener( 'mousemove', (event) => {
            this.#onMouseMove(event);
        }, false );
        window.addEventListener( 'mousedown', (event) => {
            this.#onMouseDown(event);
        }, false );
    }

    #onMouseMove(event) {
        for (const cardSlotActionHandler of this.#cardSlotActionHandlers) {
            cardSlotActionHandler.clearEventHistory();
        }
        let mouseOverList = this.#getMouseOverList(event);
        this.#processMouseLeaveEvents(mouseOverList);
        this.#processMouseEnterEvents(mouseOverList);
        this.#previousMouseOverList = mouseOverList;
    }

    #onMouseDown(event) {
        for (const cardSlotActionHandler of this.#cardSlotActionHandlers) {
            cardSlotActionHandler.notifyMouseClick();
        }
    }

    #getMouseOverList(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, this.#threeJScamera );
        const intersects = raycaster.intersectObjects( this.#threeJSScene.children );
        return intersects;
    }

    #processMouseEnterEvents(mouseOverList) {
        for ( let i = 0; i < mouseOverList.length; i ++ ) {
            for (const cardSlotActionHandler of this.#cardSlotActionHandlers) {
                cardSlotActionHandler.notifyMouseOver(mouseOverList[i].object);
            }
        }
    }

    #processMouseLeaveEvents(mouseOverList) {
        for (const previousMouseOverObject of this.#previousMouseOverList) {
            let found = false;
            for ( let i = 0; i < mouseOverList.length; i ++ ) {
                if(mouseOverList[i].object == previousMouseOverObject.object) {
                    found = true;
                }
            }
            if(!found) {
                for (const cardSlotActionHandler of this.#cardSlotActionHandlers) {
                    cardSlotActionHandler.notifyMouseLeave(previousMouseOverObject.object);
                }
            }
        }    
    }

    #addSceneToWindow() {
        this.#threeJSRenderer.setSize( window.innerWidth, window.innerHeight );
        this.#threeJSRenderer.setClearColor("#222222");
        document.body.appendChild( this.#threeJSRenderer.domElement );
        this.#threeJScamera.position.z = 5;
        window.addEventListener( 'resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.#threeJSRenderer.setSize( width, height );
            this.#threeJScamera.aspect = width / height;
            this.#threeJScamera.updateProjectionMatrix();
        });
    }

    #addLightToScene() {
        const ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2);
        this.#threeJSScene.add( ambientLight );
 
        const pointLight = new THREE.PointLight( 0xffffff, 1 );
        pointLight.position.set( 25, 50, 25 );
        this.#threeJSScene.add( pointLight ); 
    }

}