namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;

  //test for camera 
  let camera: ƒ.Node = new ƒ.Node("cameraNode");
  let cmpCamera = new ƒ.ComponentCamera;
  //========

  let root: ƒ.Node;
  let mtxTerrain: ƒ.Matrix4x4;
  let meshTerrain: ƒ.MeshTerrain;
  let Cart: ƒ.Node;
  let Cart_oon: ƒ.Node;
  let cart: ƒ.Node;
  let body: ƒ.ComponentRigidbody;
  let isGrounded: boolean = false;
  let dampTranslation: number;
  let dampRotation: number;




  let ctrForward: ƒ.Control = new ƒ.Control("Forward", 7010, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrForward.setDelay(200);
  let ctrTurn: ƒ.Control = new ƒ.Control("Turn", 1000, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrTurn.setDelay(50);


  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.calculateTransforms();
    root = viewport.getBranch();

    setUpCart();

    let cmpMeshTerrain: ƒ.ComponentMesh = viewport.getBranch().getChildrenByName("Terrain")[0].getComponent(ƒ.ComponentMesh);
    meshTerrain = <ƒ.MeshTerrain>cmpMeshTerrain.mesh;
    mtxTerrain = cmpMeshTerrain.mtxWorld;
    cart = viewport.getBranch().getChildrenByName("Cart")[0];

    body = cart.getComponent(ƒ.ComponentRigidbody);
    dampTranslation = body.dampTranslation;
    dampRotation = body.dampRotation;

    cmpCamera.mtxPivot.translation = new ƒ.Vector3(0,6,-10); // 0 8 -12
    cmpCamera.mtxPivot.rotation = new ƒ.Vector3(18,0,0);
    camera.addComponent(cmpCamera);
    camera.addComponent(new ƒ.ComponentTransform());
    root.addChild(camera);

    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  async function setUpCart(): Promise<void> {
    Cart_oon = root.getChildrenByName("Cart")[0];
    let CartGraph: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-11-24T11:44:00.967Z|63210"];
    Cart = await ƒ.Project.createGraphInstance(CartGraph);
    Cart_oon.appendChild(Cart);

    
  }
 
  


  function update(_event: Event): void {
    // ƒ.Physics.world.simulate();  // if physics is included and used
    //let deltaTime: number = ƒ.Loop.timeFrameReal / 1000;
    //let gear = 1;
    //let PressKeyGear: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.F], [ƒ.KEYBOARD_CODE.V]);

    camera.mtxLocal.translation = cart.mtxWorld.translation;
    camera.mtxLocal.rotation = new ƒ.Vector3(0, cart.mtxWorld.rotation.y+90, 0);

    //let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
    //ctrTurn.setInput(turn);
    //cart.mtxLocal.rotateY(ctrTurn.getOutput() * deltaTime);

    //let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
    //ctrForward.setInput(forward);

    //if(PressKeyGear == 1){
    //  gear = 3;
    //}
   //if(PressKeyGear == -1){
     // gear = 1;
    //}
    //cart.mtxLocal.translateX(ctrForward.getOutput() * deltaTime * gear);

    

    //let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(cart.mtxLocal.translation, mtxTerrain);
    //cart.mtxLocal.translation = terrainInfo.position;
    //cart.mtxLocal.showTo(ƒ.Vector3.SUM(terrainInfo.position, cart.mtxLocal.getZ()), terrainInfo.normal);

    //physics

    let maxHeight: number = 0.3;
    let minHeight: number = 0.2;
    let forceNodes: ƒ.Node[] = cart.getChildren();
    let force: ƒ.Vector3 = ƒ.Vector3.SCALE(ƒ.Physics.world.getGravity(), -body.mass / forceNodes.length);

    isGrounded = true; //false
    for (let forceNode of forceNodes) {
      let posForce: ƒ.Vector3 = forceNode.getComponent(ƒ.ComponentMesh).mtxWorld.translation;
      let terrainInfo: ƒ.TerrainInfo = meshTerrain.getTerrainInfo(posForce, mtxTerrain);
      let height: number = posForce.y - terrainInfo.position.y;

      if (height < maxHeight) {
        body.applyForceAtPoint(ƒ.Vector3.SCALE(force, (maxHeight - height) / (maxHeight - minHeight)), posForce);
        isGrounded = true;
      }
    }

    if (isGrounded) {
      body.dampTranslation = dampTranslation;
      body.dampRotation = dampRotation;
      let turn: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT], [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]);
      ctrTurn.setInput(turn);
      body.applyTorque(ƒ.Vector3.SCALE(cart.mtxLocal.getY(), ctrTurn.getOutput()));

      let forward: number = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
      ctrForward.setInput(forward);
      body.applyForce(ƒ.Vector3.SCALE(cart.mtxLocal.getX(), ctrForward.getOutput()));
    }
    else
      body.dampRotation = body.dampTranslation = 0;

    ƒ.Physics.world.simulate();
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}


// Graph|2021-11-24T11:44:00.967Z|63210   ==> car 
