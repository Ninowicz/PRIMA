namespace Script {
  import ƒ = FudgeCore;

  export class Bot extends ƒ.Node{

    public bike : Bike;
    public color : ƒ.Color;

    constructor() {
      super("Bot");
    }

  }

  export let OutlookBot: Bot;
  OutlookBot = new Bot();
  OutlookBot.color = new ƒ.Color(0,1,1,1);
  
  export function SetBikeBot(_bot : Bot, _spawnpoint : SpawnPoint){
    _bot.bike = new Bike();
    graph.getChildrenByName("Bike")[0].addChild(_bot.bike);
    
    SetSpawnPoint(_bot.bike, _spawnpoint);

    _bot.bike.addComponent(new ƒ.ComponentMaterial(
      new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(_bot.color))));
  }

  function AgentChangedQuadrant(_bot : Bot){
    let tempXneg : Boolean =_bot.bike.JustChangeSignXneg ;
    let tempXpos : Boolean =_bot.bike.JustChangeSignXpos;
    let tempZpos : Boolean =_bot.bike.JustChangeSignZpos;
    let tempZneg : Boolean =_bot.bike.JustChangeSignZneg;

    if(_bot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z > 0){
      _bot.bike.JustChangeSignZpos = true;
      _bot.bike.JustChangeSignZneg = false;
    }
    if(_bot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.z < 0){
      _bot.bike.JustChangeSignZpos = false;
      _bot.bike.JustChangeSignZneg = true;
    }
    if(_bot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x < 0){
      _bot.bike.JustChangeSignXpos = false;
      _bot.bike.JustChangeSignXneg = true;
    }
    if(_bot.bike.getComponent(ƒ.ComponentTransform).mtxLocal.translation.x > 0){
      _bot.bike.JustChangeSignXpos = true;
      _bot.bike.JustChangeSignXneg = false;
    }
    if(tempXneg != _bot.bike.JustChangeSignXneg || tempXpos != _bot.bike.JustChangeSignXpos || tempZneg != _bot.bike.JustChangeSignZneg || tempZpos != _bot.bike.JustChangeSignZpos){
      _bot.bike.JustChangeSign = true;
    }
   }
}
