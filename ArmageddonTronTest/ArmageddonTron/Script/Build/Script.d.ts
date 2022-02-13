declare namespace Script {
    import ƒ = FudgeCore;
    class Bike extends ƒ.Node {
        State: Bike.state;
        BikeAppearance: ƒ.Node;
        ReadyToSetWall: boolean;
        NumberOfWall: number;
        PositionAgentTempX: number;
        PositionAgentTempZ: number;
        PostionForNextWall_X: number;
        PostionForNextWall_Z: number;
        StartNewWallOnZ: boolean;
        StartNewWallOnX: boolean;
        OffsetForWalls: number;
        Direction: SpawnPoint.Directions;
        DirectionNumber: number;
        StartKey: boolean;
        KeyStatus_LeftTurn: boolean;
        KeyStatus_RightTurn: boolean;
        RotationCameraTest_Left: number;
        TheChosenOne_Left: number;
        RotationCameraTest_Right: number;
        TheChosenOne_Right: number;
        constructor();
    }
    namespace Bike {
        enum state {
            Dead = 0,
            Alive = 1
        }
    }
    let CartGraph: ƒ.Graph;
}
declare namespace Script {
    import ƒ = FudgeCore;
    enum state {
        Alive = 0,
        Dead = 1
    }
    export class BikeWall extends ƒ.Node {
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
        BotNode: ƒ.Node;
        bikeWall: BikeWall;
        name: string;
        constructor();
    }
    let OutlookBot: Bot;
    let Excel: Bot;
    let Word: Bot;
    let AgentBot: Bot;
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
