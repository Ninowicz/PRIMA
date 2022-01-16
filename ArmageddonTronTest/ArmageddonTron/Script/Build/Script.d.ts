declare namespace Script {
    import ƒ = FudgeCore;
    enum state {
        Alive = 0,
        Dead = 1
    }
    export class Bike extends ƒ.Node {
        name: string;
        State: state;
        ReadyToSetWall: boolean;
        NumberOfWall: number;
        PositionAgentTempX: number;
        PositionAgentTempZ: number;
        PostionForNextWall_X: number;
        PostionForNextWall_Z: number;
        StartNewWallOnZ: boolean;
        StartNewWallOnX: boolean;
        Direction: SpawnPoint.Directions;
        StartKey: boolean;
        KeyStatus_LeftTurn: boolean;
        KeyStatus_RightTurn: boolean;
        RotationCameraTest_Left: number;
        TheChosenOne_Left: number;
        RotationCameraTest_Right: number;
        TheChosenOne_Right: number;
        constructor();
    }
    export {};
}
declare namespace Script {
    import ƒ = FudgeCore;
    enum state {
        Alive = 0,
        Dead = 1
    }
    export class BikeWall extends ƒ.Node {
        name: string;
        State: state;
        constructor();
    }
    export {};
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Bot extends ƒ.Node {
        bike: Bike;
        color: ƒ.Color;
    }
    let OutlookBot: Bot;
    function SetBikeBot(_bot: Bot, _spawnpoint: SpawnPoint): void;
}
declare namespace Script {
    import ƒ = FudgeCore;
    let graph: ƒ.Node;
}
declare namespace Script {
    import ƒ = FudgeCore;
    enum Name {
        Lille = 0,
        Lyon = 1,
        Toulouse = 2,
        Bordeaux = 3
    }
    export class SpawnPoint extends ƒ.Node {
        Name: Name;
        coordonates: ƒ.Vector3;
        orientation: ƒ.Vector3;
        direction: SpawnPoint.Directions;
        constructor();
    }
    export namespace SpawnPoint {
        enum Directions {
            North = 0,
            South = 1,
            East = 2,
            West = 3
        }
    }
    export let Lille: SpawnPoint;
    export let Toulouse: SpawnPoint;
    export let Lyon: SpawnPoint;
    export let Bordeaux: SpawnPoint;
    export function SetSpawnPoint(_bike: Bike, _spawnpoint: SpawnPoint): void;
    export {};
}
