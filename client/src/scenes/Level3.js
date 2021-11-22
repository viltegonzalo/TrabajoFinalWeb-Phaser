import Player from "../Object/Player.js";
import Bombs from "../Object/Bombs.js";
import Item from "../Object/Item.js";

class Level3 extends Phaser.Scene{
    constructor(){
        super({key:'Level3'});        
    }

    init(){
        console.log('Se ha iniciado la escena Play');
        //La ecena UI se carga en paralelo para mostrar informacion en 
        //la pantalla mientra se juega
        this.scene.launch('UI');
    }
    create(){
                //this.add.bitmapText(100,100,'pixelFont','PRUEBA');

                this.add.image(0,0,'background_level3')
                .setOrigin(0);
    
            this.wall_floor=this.physics.add.staticGroup();
            //Se crea las páredes
            this.wall_floor.create(0,0,'wall')
                .setOrigin(0);
            this.wall_floor.create(this.scale.width,0,'wall')
                .setOrigin(1,0)
                .setFlipX(true);
            this.wall_floor.create(0,this.scale.height,'groundTop')
            .setOrigin(0,1);
            //actualiza las colisiones de las figuras
            this.wall_floor.refresh();
            //achica el alto de la colision del suelo
            this.wall_floor.getChildren()[2].setOffset(0,15);
    
    
            //Bombs
            this.bombsGroup=new Bombs({
                physicsWorld:this.physics.world,
                scene:this
            });
    
            //Items
            this.itemsGroup=new Item({
                physicsWorld:this.physics.world,
                scene:this
            });
    
            //Personaje
            //this.jugador=this.physics.add.sprite(100,100,'jugador');
            this.jugador=new Player({
                scene:this,
                x:100,
                y:100,
            });
            this.jugador.setScale(2);
            this.physics.add.collider([this.jugador,this.bombsGroup],this.wall_floor);
            this.physics.add.overlap(this.jugador,this.bombsGroup,()=>{
                this.jugador.bombCollision();
            });
    
            this.physics.add.overlap(this.jugador,this.itemsGroup,()=>{
                this.sound.play('pop');
                this.registry.events.emit('update_points');
                this.itemsGroup.destroyItem();
                this.bombsGroup.addBomb();
            });
    }
    update(){
        this.jugador.updateLevel3();
        //this.bombsGroup.update();
    }
}
export default Level3;