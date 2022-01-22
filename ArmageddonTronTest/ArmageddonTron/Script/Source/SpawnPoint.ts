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
      }
  }

  export namespace SpawnPoint
  {
      export enum Directions
      {
          North, // 0
          South, // 2
          East,  // 1
          West   // 3
      }
  }
  

  export let Lille : SpawnPoint;
  Lille = new SpawnPoint();
  Lille.coordonates = new ƒ.Vector3(125, 0.5, 25); //125 0.5 25
  Lille.orientation = new ƒ.Vector3(0, 0, 0);
  Lille.direction = SpawnPoint.Directions.South;

  export let Toulouse : SpawnPoint;
  Toulouse = new SpawnPoint();
  Toulouse.coordonates = new ƒ.Vector3(125, 0.5, 225);
  Toulouse.orientation = new ƒ.Vector3(0, 180, 0);
  Toulouse.direction = SpawnPoint.Directions.North;

  export let Lyon : SpawnPoint;
  Lyon = new SpawnPoint();
  Lyon.coordonates = new ƒ.Vector3(225, 0.5, 125);
  Lyon.orientation = new ƒ.Vector3(0, 90, 0);
  Lyon.direction = SpawnPoint.Directions.West;

  export let Bordeaux : SpawnPoint;
  Bordeaux = new SpawnPoint();
  Bordeaux.coordonates = new ƒ.Vector3(25, 0.5, 125);
  Bordeaux.orientation = new ƒ.Vector3(0, -90, 0);
  Bordeaux.direction = SpawnPoint.Directions.East;

  export function SetSpawnPoint(_bike : Bike , _spawnpoint : SpawnPoint ):void {

    _bike.mtxLocal.translation = _spawnpoint.coordonates ; 
    _bike.mtxLocal.rotation = _spawnpoint.orientation ; 
    _bike.Direction = _spawnpoint.direction ;
    if(_bike.Direction == SpawnPoint.Directions.North){
      _bike.DirectionNumber = 0
    }
    if(_bike.Direction == SpawnPoint.Directions.South){
      _bike.DirectionNumber = 2
    } 
    if(_bike.Direction == SpawnPoint.Directions.East){
      _bike.DirectionNumber = 1
    } 
    if(_bike.Direction == SpawnPoint.Directions.West){
      _bike.DirectionNumber = 3
    }  
  }

  

}