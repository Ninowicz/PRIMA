declare namespace MarkusCart {
    import ƒ = FudgeCore;
    class Car extends ƒ.Node {
        health: number;
        name: string;
        constructor();
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace MarkusCart {
}
