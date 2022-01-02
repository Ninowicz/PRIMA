declare namespace Script {
    import ƒ = FudgeCore;
    enum state {
        Alive = 0,
        Dead = 1
    }
    export class Bike extends ƒ.Node {
        name: string;
        State: state.Alive;
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
        State: state.Alive;
        constructor();
    }
    export {};
}
declare namespace Script {
}
