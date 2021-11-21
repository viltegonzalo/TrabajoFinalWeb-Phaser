class Player extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene,config.x,config.y,'tomato');

        this.scene=config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale(2);
        this.body.setSize(14,20);
        this.body.setOffset(2,5);

        this.jumping=false;
        this.anims.play('tomato_idle');
        
        this.preMov='tomato_idle';
        this.preMov2='tomato_walk';
        this.hitDelay=false;
        this.cursor=this.scene.input.keyboard.createCursorKeys();

        this.life=3;
    }

    updateLevel2(){
        if(Phaser.Input.Keyboard.JustDown(this.cursor.up)&&!(this.jumping)){
            this.jumping=true;
            this.body.setVelocityY(-800);

       }else if(this.body.blocked.down){
            this.jumping=false;
       }
       this.body.setVelocityX(0);
       this.body.setSize(14,20);
       this.body.setOffset(2,5);
       //Animacion cuando esta inmovil
       if(this.preMov2!=='tomato_walk'&&!this.jumping){
           this.preMov2='tomato_walk';
           this.anims.play('tomato_walk');
       }
    }

    updateLevel3(){
        if(this.cursor.left.isDown){
            this.body.setVelocityX(-200);
            this.flipX=true;
            //Animacion Derecha
            if(this.preMov!=='left'&&!this.jumping){
                this.preMov='left';
                this.anims.play('tomato_walk');
            }
       } else if(this.cursor.right.isDown){
           this.body.setVelocityX(200);
           this.flipX=false;
           //Animacion Izquierda
            if(this.preMov!=='right'&&!this.jumping){
                this.preMov='right';
                this.anims.play('tomato_walk');
            }
       }else if(this.cursor.down.isDown&&!this.jumping){
            this.body.setVelocityX(0);
            this.body.setSize(14,15);
            this.body.setOffset(2,10);
            //Animacion Abajo
            if(this.preMov!=='down'&&!this.jumping){
                this.preMov='down';
                this.anims.play('tomato_down');
            }
       }else{
            this.body.setVelocityX(0);
            this.body.setSize(14,20);
            this.body.setOffset(2,5);
            //Animacion cuando esta inmovil
            if(this.preMov!=='tomato_idle'&&!this.jumping){
                this.preMov='tomato_idle';
                this.anims.play('tomato_idle');
            }
       }

       if(Phaser.Input.Keyboard.JustDown(this.cursor.up)&&!(this.jumping)){
            this.jumping=true;
            this.body.setVelocityY(-800);

       }else if(this.body.blocked.down){
            this.jumping=false;
       }
    }

}
export default Player;