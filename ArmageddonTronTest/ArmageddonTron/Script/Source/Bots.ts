namespace Script {
  import ƒ = FudgeCore;

  export class Bot extends ƒ.Node{

    public bike : Bike;
    public color : ƒ.Color;
    public BotNode : ƒ.Node= new ƒ.Node("BotNode");
    public bikeWall : BikeWall;
    public bikeWallOutlook : BikeWallOutlook;
    public bikeWallExcel : BikeWallExcel;
    public bikeWallWord : BikeWallWord;
    public name : string = "Unamed";
    public LeftTurnAvailable : boolean = true;
    public LeftTurnAvailableCount = 0;
    public RightTurnAvailable : boolean = true;
    public RightTurnAvailableCount = 0;
    public StartingBug = 0;

    constructor() {
      super("Bot");
    }

  }

  export let OutlookBot: Bot;
  OutlookBot = new Bot();
  OutlookBot.color = new ƒ.Color(1,1,0,0.5);
  OutlookBot.name = "Outlook";

  export let Excel: Bot;
  Excel = new Bot();
  Excel.color = new ƒ.Color(0,1,0,0.5);
  Excel.name = "Excel";

  export let Word: Bot;
  Word = new Bot();
  Word.color = new ƒ.Color(0,0,1,0.5);
  Word.name = "Word";

  export let AgentBot: Bot;
  AgentBot = new Bot();
  AgentBot.color = new ƒ.Color(1,0,0,0.5);
  
  export function SetBikeBot(_bot : Bot, _spawnpoint : SpawnPoint){
    _bot = new Bot();
    graph.getChildrenByName("PlayerList")[0].addChild(_bot);
    //_bot.bike = new Bike();
    //_bot.addChild(_bot.bike);
    
    //SetSpawnPoint(_bot.bike, _spawnpoint);

    //_bot.bike.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("mtrAgent", ƒ.ShaderUniColor, new ƒ.CoatColored(_bot.color))));
  }
  
  export function BehaviorBot(_bot : Bot){
    if (_bot.bike.StartKey == true){

      if(_bot.bike.AllesGutX == false && _bot.bike.AllesGutZ == false){
        _bot.bike.AllesGutX = true;
        _bot.bike.AllesGutZ = true;
      }
      
      if((_bot.bike.mtxWorld.translation.x <= 235 && _bot.bike.mtxWorld.translation.x > 15) && _bot.bike.AllesGutX == false){
        _bot.bike.AllesGutX = true;
      }

      if((_bot.bike.mtxWorld.translation.z <= 235 && _bot.bike.mtxWorld.translation.z > 15) && _bot.bike.AllesGutZ == false){
        _bot.bike.AllesGutZ = true;
      }

      if((_bot.bike.mtxWorld.translation.x >= 240 || _bot.bike.mtxWorld.translation.x < 10)&&_bot.bike.AllesGutX == true){
        let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
        if(OutlookOddsToLive > 80 || 1){
          _bot.bike.EmergencyTurnX = true;
          _bot.bike.AllesGutX = false;
        }
      }
      if((_bot.bike.mtxWorld.translation.z >= 240 || _bot.bike.mtxWorld.translation.z < 10) && _bot.bike.AllesGutZ == true){
        let OutlookOddsToLive = Math.floor(Math.random() * 100) + 1;
        if(OutlookOddsToLive > 80 || 1){
          _bot.bike.EmergencyTurnZ = true;
          _bot.bike.AllesGutZ = false;
        
        }
      }

      _bot.bike.Odds = Math.floor(Math.random() * 10000) + 1;

      if(_bot.bike.EmergencyTurnZ == true){
        _bot.bike.Odds = 1;
        _bot.bike.EmergencyTurnZ = false;
      }
      if(_bot.bike.EmergencyTurnX == true){
        _bot.bike.Odds = 1;
        _bot.bike.EmergencyTurnX = false;
      }

      if(_bot.bike.Odds < 50 && _bot.LeftTurnAvailable == true && _bot.bike.AllesGutX == true){
        turnLeft(_bot.bike);
        _bot.bike.ReadyToSetWall = false;
        _bot.LeftTurnAvailableCount = _bot.LeftTurnAvailableCount +1;
        if(_bot.LeftTurnAvailableCount >= 2){
          _bot.LeftTurnAvailable = false;
          _bot.LeftTurnAvailableCount = 0;
        }
        if(_bot.RightTurnAvailable == false){
          _bot.RightTurnAvailable = true;
        }
      }

      else if(_bot.bike.Odds > 9950 && _bot.RightTurnAvailable == true && _bot.bike.AllesGutZ == true){
        turnRight(_bot.bike);
        _bot.bike.ReadyToSetWall = false;
        _bot.RightTurnAvailableCount = _bot.RightTurnAvailableCount +1;
        if(_bot.RightTurnAvailableCount >= 2){
          _bot.RightTurnAvailable = false;
          _bot.RightTurnAvailableCount = 0;
        }
        if(_bot.LeftTurnAvailable == false){
          _bot.LeftTurnAvailable = true;
        }
      }

      
      

      
    }
  }
}



  // let Outlook: Bike;
  // let PowerPoint: Bike;
  // let Word: Bike;
  // let Excel: Bike;