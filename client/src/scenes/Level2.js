import Player from '../Object/Player.js';

class Level2 extends Phaser.Scene {
    constructor(){
        super({key:"Level2"});
    }
    init(){
 
    }

    create(){
//==================================================================================================
//=========================CREACION DE OBJETOS======================================================
//================================================================================================== 
       
        this.backgroundImage = this.add.tileSprite(500,270,1600,400,'background_level2');        
        
        this.groundGroup=this.physics.add.staticGroup();
        this.groundGroup.create(0,this.scale.height,"groundTop")
            .setOrigin(0,1)
            .setFlipY(true);

        this.groundGroup.refresh();

        //Jugador
        this.Player=new Player({
            scene:this,
            x:100,
            y:100
        });
        this.Player.setScale(2);
        this.Player.anims.play('tomato_walk');

//==================================================================================================
//=========================CREACION DE COLISIONES===================================================
//==================================================================================================
        this.physics.add.collider([this.Player],this.groundGroup);
    }
    update(){
        this.Player.updateLevel2();
        this.backgroundImage.tilePositionX+=1;
    }


}
export default Level2;