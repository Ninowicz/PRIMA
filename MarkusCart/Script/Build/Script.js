"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let cart;
    let mtxTerrain;
    let meshTerrain;
    let ctrForward = new ƒ.Control("Forward", 10, ƒ.CONTROL_TYPE.PROPORTIONAL);
    ctrForward.setDelay(200);
    let ctrTurn = new ƒ.Control("Turn", 100, ƒ.CONTROL_TYPE.PROPORTIONAL);
    ctrForward.setDelay(50);
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        viewport = _event.detail;
        viewport.calculateTransforms();
        let cmpMeshTerrain = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
        meshTerrain = cmpMeshTerrain.mesh;
        mtxTerrain = cmpMeshTerrain.mtxWorld;
        cart = viewport.getBranch().getChildrenByName("Cart")[0];
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.world.simulate();  // if physics is included and used
        let deltaTime = ƒ.Loop.timeFrameReal / 1000;
        let turn = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
        ctrTurn.setInput(turn);
        cart.mtxLocal.rotateY(ctrTurn.getOutput() * deltaTime);
        let forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
        ctrForward.setInput(forward);
        cart.mtxLocal.translateZ(ctrForward.getOutput() * deltaTime);
        let terrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
        cart.mtxLocal.translation = terrainInfo.position;
        cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map