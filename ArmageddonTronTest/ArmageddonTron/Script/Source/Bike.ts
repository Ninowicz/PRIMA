namespace Script {
  import ƒ = FudgeCore;

 


  export class Bike extends ƒ.Node {

    public State: Bike.state;
    
    public BikeAppearance : ƒ.Node;
    // Walls from the bike
    public ReadyToSetWall : boolean = true; // Will allow walls to be build 
    public NumberOfWall : number = 0;

    public PositionAgentTempX : number;
    public PositionAgentTempZ : number;

    public PostionForNextWall_X : number = 0;
    public PostionForNextWall_Z : number = 0;

    public StartNewWallOnZ : boolean = true; // Replace truc pair. Permet de fermer la boucle qui met a jour la coordeonnée de debut de virage
    public StartNewWallOnX : boolean = false;

    public OffsetForWalls : number = 0.5;



    // Controls of the Bike

    public Direction : SpawnPoint.Directions;
    public DirectionNumber : number ;

    public StartKey : boolean = false;
    public KeyStatus_LeftTurn : boolean;
    public KeyStatus_RightTurn : boolean;

    // Camera Agent

    public RotationCameraTest_Left : number = 0;
    public TheChosenOne_Left : number = 1;
    public RotationCameraTest_Right : number = 0;
    public TheChosenOne_Right : number = -1;

      constructor() {
          super("Bike");

          this.addComponent(new ƒ.ComponentTransform);
          //this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshAgent")));
          //this.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1)))));

          this.mtxLocal.scale(ƒ.Vector3.ONE(0.75));
      }
  }
  export namespace Bike
  {
      export enum state
      {
          Dead,
          Alive
      }
  }
  export let CartGraph: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources["Graph|2021-12-26T12:21:36.268Z|87935"];
}

// Graph for the bike : 
//
//
// Graph|2021-12-26T12:21:36.268Z|87935