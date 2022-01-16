namespace Script {
  import ƒ = FudgeCore;

  

  enum Name {
    Lille,      // (   0, 0.5, -100 )
    Lyon,       // ( 100, 0.5, -100 )
    Toulouse,   // (   0, 0.5,  100 )
    Bordeaux    // (-100, 0.5, -100 )
  }

  export class SpawnPoint extends ƒ.Node {

    public Name: Name;
    public coordonates : ƒ.Vector3;
    public orientation : ƒ.Vector3;
    public direction : SpawnPoint.Directions ; 
      

      constructor() {
          super("SpawnPoint");

          // this.addComponent(new ƒ.ComponentTransform);
          // this.addComponent(new ƒ.ComponentMesh(new ƒ.MeshCube("MeshBikeWall")));
          // this.addComponent(new ƒ.ComponentMaterial(
          //    new ƒ.Material("mtrBikeWall", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 1, 1))))
          // );
          
          
          // this.mtxLocal.scale(new ƒ.Vector3(1, 0.75 ,0.2));
          // this.mtxLocal.translate(new ƒ.Vector3(0, 0.5, 0));
      }
  }
  export namespace SpawnPoint
  {
      export enum Directions
      {
          North,
          South,
          East,
          West
      }
  }
  

  export let Lille : SpawnPoint;
  Lille = new SpawnPoint();
  Lille.coordonates = new ƒ.Vector3(0, 0.5, -100);
  Lille.orientation = new ƒ.Vector3(0, 0, 0);
  Lille.direction = SpawnPoint.Directions.North;

  
  

  export let Toulouse : SpawnPoint;
  Toulouse = new SpawnPoint();
  Toulouse.coordonates = new ƒ.Vector3(0, 0.5, 100);
  Toulouse.orientation = new ƒ.Vector3(0, 180, 0);
  Toulouse.direction = SpawnPoint.Directions.South;

  export let Lyon : SpawnPoint;
  Lyon = new SpawnPoint();
  Lyon.coordonates = new ƒ.Vector3(100, 0.5, 100);
  Lyon.orientation = new ƒ.Vector3(0, 90, 0);
  Lyon.direction = SpawnPoint.Directions.East;

  export let Bordeaux : SpawnPoint;
  Bordeaux = new SpawnPoint();
  Bordeaux.coordonates = new ƒ.Vector3(-100, 0.5, -100);
  Bordeaux.orientation = new ƒ.Vector3(0, -90, 0);
  Bordeaux.direction = SpawnPoint.Directions.West;

  export function SetSpawnPoint(_bike : Bike , _spawnpoint : SpawnPoint ):void {

    _bike.mtxLocal.translation = _spawnpoint.coordonates ; 
    _bike.mtxLocal.rotation = _spawnpoint.orientation ; 
    _bike.Direction = _spawnpoint.direction ;
  }

  

}