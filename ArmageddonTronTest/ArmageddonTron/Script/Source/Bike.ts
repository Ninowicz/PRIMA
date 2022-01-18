namespace Script {
  import ƒ = FudgeCore;

 


  export class Bike extends ƒ.Node {

    public State: Bike.state;
    
    // Walls from the bike
    public ReadyToSetWall : boolean = true; // Will allow walls to be build 
    public NumberOfWall : number = 0;

    public PositionAgentTempX : number;
    public PositionAgentTempZ : number;

    public PostionForNextWall_X : number = 0;
    public PostionForNextWall_Z : number = 0;

    public StartNewWallOnZ : boolean = true; // Replace truc pair. Permet de fermer la boucle qui met a jour la coordeonnée de debut de virage
    public StartNewWallOnX : boolean = false;

    public JustChangeSign :boolean = false;
    public JustChangeSignXpos :boolean = false;
    public JustChangeSignXneg :boolean = false;
    public JustChangeSignZpos :boolean = false;
    public JustChangeSignZneg :boolean = false;

    // Controls of the Bike

    public Direction : SpawnPoint.Directions;

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
          //this.addComponent(new ƒ.ComponentLight);

          this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshAgent")));
          // this.addComponent(new ƒ.ComponentMaterial(
          //     new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
          // );

          this.mtxLocal.scale(ƒ.Vector3.ONE(1));
          //this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 1));
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

  export function BikeAgentChangedQuadrant(_bike : Bike){
    let tempXneg : Boolean =_bike.JustChangeSignXneg ;
    let tempXpos : Boolean =_bike.JustChangeSignXpos;
    let tempZpos : Boolean =_bike.JustChangeSignZpos;
    let tempZneg : Boolean =_bike.JustChangeSignZneg;

    if(_bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z > 0){
      _bike.JustChangeSignZpos = true;
      _bike.JustChangeSignZneg = false;
    }
    if(_bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z < 0){
      _bike.JustChangeSignZpos = false;
      _bike.JustChangeSignZneg = true;
    }
    if(_bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x < 0){
      _bike.JustChangeSignXpos = false;
      _bike.JustChangeSignXneg = true;
    }
    if(_bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x > 0){
      _bike.JustChangeSignXpos = true;
      _bike.JustChangeSignXneg = false;
    }
    if(tempXneg != _bike.JustChangeSignXneg || tempXpos != _bike.JustChangeSignXpos || tempZneg != _bike.JustChangeSignZneg || tempZpos != _bike.JustChangeSignZpos){
      _bike.JustChangeSign = true;
    }
   }
}