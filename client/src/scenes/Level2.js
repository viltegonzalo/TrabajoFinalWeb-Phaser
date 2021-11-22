import Player from '../Object/Player.js';

class Level2 extends Phaser.Scene {
    constructor(){
        super({key:"Level2"});
    }
    init(){
        this.obsJSON=null;
        this.spikes=null;
 
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
        this.groundGroup.create(0,0,"groundTop")
            .setOrigin(0,0);
        this.groundGroup.refresh();        

        //Jugador
        this.Player=new Player({
            scene:this,
            x:100,
            y:100
        });
        this.Player.setScale(3);
        this.Player.anims.play('tomato_walk');

        //Obstaculos
        //Obtenemos el JSON con los obstaculos
        //this.obsJSON=JSON.parse(localStorage.getItem('obstaculo_level_2'));        
        //console.log(this.obsJSON);
        this.spikes=this.physics.add.group();
        this.spikes.create(this.scale.width/2,this.scale.height/2,"spikeBottom")
            .setImmovable(true);
        console.log(spikeBottomList);
        this.crearObstaculoH(this.spikes,spikeBottomList,'spikeBottom',0,1);
        this.spikes.children.iterate((spike)=>{
            spike.setImmovable(true);
            spike.setTintFill(0x000000, 0x000000, 0x00ff00, 0x00ff00);
        });
        this.spikes.setVelocityX(-700);

        this.physics.add.collider(this.Player,this.spikes,()=>{
            console.log("Hizo colision");
        });
//==================================================================================================
//=========================CREACION DE COLISIONES===================================================
//==================================================================================================
        this.physics.add.collider([this.Player,this.spikes],this.groundGroup);
    }
    update(){
        this.Player.updateLevel2();
        this.backgroundImage.tilePositionX+=1;
    }

    crearObstaculoH(grupo,listaObj,obj,oX,oY){
        for(let spike of listaObj){    
            let positionX=0;
            for(let i=0;i<spike.quantity;i++){ 
                console.log("se creo una nueva espina");      
                let spikeAux=grupo.create((spike.seconds*700)+positionX,spike.y,obj)
                    .setOrigin(oX,oY);                
                positionX+=spikeAux.width;
            }
        }
    }
}
export default Level2;