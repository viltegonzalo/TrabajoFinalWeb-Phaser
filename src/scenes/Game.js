export class Game extends Phaser.Scene {
    constructor(){
        super({key:"Game"});
    }
    init(){
        this.wBox=30;
        this.hBox=30;
        this.wPortal=78;
        this.hPortal=169;
        this.vObjMov=-700;

        this.box=null;
        this.groundBotton=null;
        this.groundTop=null;
        this.jumpCount=0;        
        this.spikes=null;
        this.brikes=null;
        this.portalesGravity=null;
        this.portalFlap=null;
        this.portalBox=null;
        this.portalGravity=null;
        this.rotateAnim=null;
        this.grupo=null;
        this.isFlapMode=false;
        this.isGravityInverted=false;  
    }

    create(){
//==================================================================================================
//=========================CREACION DE OBJETOS======================================================
//================================================================================================== 
        this.backgroundAudio=this.sound.add('background');
        this.gameoverAudio=this.sound.add('gameover');
        this.jumpAudio=this.sound.add('jump');
        this.msgStartAudio=this.sound.add('msgStart');
        this.portalAudio=this.sound.add('portal');
        this.portalEndLevelAudio=this.sound.add('portalEndLevel');
        this.portalFlapAudio=this.sound.add('portalFlap');
        this.portalGravityAudio=this.sound.add('portalGravity');

        this.backgroundAudio.play();
        this.msgStartAudio.play();

        this.backgroundImage = this.add.tileSprite(500,270,1600,400,'background');        
        this.groundBotton=this.physics.add.sprite(0,600,"groundBottom")
        .setImmovable(true)    
        .setOrigin(0,1);        
        this.groundTop=this.physics.add.sprite(0,0,"groundTop")
        .setImmovable(true)
        .setOrigin(0,0);

        
        this.box=this.physics.add.sprite(950*(3/8),300,'box');
        //this.box=this.add.image(950*(3/8),300,'box');
        this.box.setSize(this.wBox,this.hBox);
        this.box.body.gravity.y=4000;

        this.physics.add.collider(this.box,this.groundBotton,()=>{
            this.resetJumpCount();
        });
        this.physics.add.collider(this.box,this.groundTop,()=>{
            this.resetJumpCount();
        });
        
        this.portalesGravity=this.physics.add.group();
        this.portalesFinal=this.physics.add.group();
        this.portalesFlap=this.physics.add.group();
        this.portalesBox=this.physics.add.group();
        this.spikes = this.physics.add.group();
        this.brikes = this.physics.add.group();
        //this.brikesSide=this.physics.add.group();
        
        //this.crearObstaculoV(this.brikesSide,brickListSide,'brick',0,1);
        this.crearObstaculoH(this.spikes,spikeBottomList,'spikeBottom',0,1);
        this.crearObstaculoH(this.spikes,spikeTopList,'spikeTop',0,0);
        this.crearObstaculoH(this.brikes,brickList,'brick',0,1);
        this.crearObstaculoH(this.portalesGravity,portalGravityList,'portalGravity',0,1);
        this.crearObstaculoH(this.portalesFinal,portalFinal,'portalFinal',0,1);
        this.crearObstaculoH(this.portalesFlap,portalFlapList,'portalFlap',0,1);        
        this.crearObstaculoH(this.portalesBox,portalBoxList,'portal',0,1);



        this.brikes.children.iterate((brike)=>{
           brike.setImmovable(true);
        });
        
        this.spikes.children.iterate((spike)=>{
            spike.setImmovable(true);
            spike.setTintFill(0x000000, 0x000000, 0x00ff00, 0x00ff00);
        });
        this.portalesGravity.children.iterate((portal)=>{
            portal.setSize(this.wPortal,this.hPortal);
        });
        this.portalesFlap.children.iterate((portal)=>{            
            portal.setSize(this.wPortal,this.hPortal);
        });
        this.portalesBox.children.iterate((portal)=>{            
            portal.setSize(this.wPortal,this.hPortal);
        });

        this.portalesGravity.setVelocityX(this.vObjMov);
        this.portalesFlap.setVelocityX(this.vObjMov);
        this.portalesBox.setVelocityX(this.vObjMov);
        this.portalesFinal.setVelocityX(this.vObjMov);
        //this.brikesSide.setVelocityX(this.vObjMov);
        this.spikes.setVelocityX(this.vObjMov);
        this.brikes.setVelocityX(this.vObjMov);


//==================================================================================================
//=========================CREACION DE COLISIONES===================================================
//==================================================================================================
        this.physics.add.collider(this.box,this.spikes,()=>{
            this.gamerover();
        });
        this.physics.add.collider(this.box,this.brikes,()=>{
            this.onTouchBrick();
        });

        this.physics.add.overlap(this.box,this.portalesGravity,()=>{
            this.portalGravityAudio.play();
            this.invertGravity();
        });
        this.physics.add.overlap(this.box,this.portalesFinal,()=>{            
            this.finishin();
        });
        this.physics.add.overlap(this.box,this.portalesFlap,()=>{            
            this.portalFlapAudio.play();
            this.onChangeToFlap();                       
        });
        this.physics.add.overlap(this.box,this.portalesBox,()=>{
            this.portalAudio.play();
            this.onChangeToBox();
        });

        this.input.on('pointerdown',()=>{
            this.onAction();            
        });
    }
    update(){
        if(this.isFlapMode&&this.input.activePointer.isDown){
            this.onAction();
        }
        this.backgroundImage.tilePositionX+=1;
    }
    onAction(){     
        if(this.isFlapMode){
            this.box.body.velocity.y=-400;
            return;
        }
        if(this.jumpCount>=2){
            return;
        }
        this.jumpCount++;
        if(this.isGravityInverted){
            this.jumpAudio.play();
            this.box.body.velocity.y=900;
            this.rotate(-360);
        }else{
            this.jumpAudio.play();
            this.box.body.velocity.y=-900;            
            this.rotate(360);
        }        
    }   
    resetJumpCount(){
        this.jumpCount=0;
    }
    gamerover(){
        this.backgroundAudio.stop();
        this.gameoverAudio.play();
        this.physics.pause();
        this.box.visible=false;
        this.time.addEvent({
            delay:1000,
            callback:()=>{
                this.scene.restart();
            },
            loop:false
        });
    }
    finishin(){
        this.portalEndLevelAudio.play();
        this.backgroundAudio.stop();        
        this.physics.pause();
        this.box.visible=false;
        this.time.addEvent({
            delay:1000,
            callback:()=>{
                this.scene.pause();
            },
            loop:false
        });  
    }
    invertGravity(){
        if(this.isGravityInverted){
            this.isGravityInverted=false;
            this.box.body.gravity.y=4000;
        }else{
            this.isGravityInverted=true;
            this.box.body.gravity.y=-4000;
        }
    }
    onChangeToFlap(){               
        this.isFlapMode=true;
        this.box.setTexture('rocket').setOrigin(0.5,0.5);    
        this.box.setSize(60,34);        
        this.box.body.gravity.y=2000;
        this.tweens.add({
            targets:this.box,
            angle:0,
            duration:500,
            ease:'Linear'
        });         
    }
    onChangeToBox(){        
        this.isFlapMode=false;
        this.box.setTexture('box').setOrigin(0.5,0.5);    
        this.box.setSize(this.wBox,this.hBox);
        this.isGravityInverted=false;    
        this.box.body.gravity.y=4000;
        this.box.body.velocity.y=900
        this.tweens.add({
            targets:this.box,
            angle:0,
            duration:500,
            ease:'Linear'
        });
    }
    rotate(angleValue){
        if(!this.isFlapMode){
            if(!this.rotateAnim){
                this.rotateAnim=this.tweens.add({
                    targets:this.box,
                    angle:angleValue,
                    duration:700,
                    ease:'Linear'
                });
            }else{
                this.rotateAnim.play();
            }
        }
    }
    crearObstaculoH(grupo,listaObj,obj,oX,oY){
        for(let spike of listaObj){
            let positionX=0;
            for(let i=0;i<spike.quantity;i++){       
                let spikeAux=grupo.create((spike.seconds*700)+positionX,spike.y,obj)
                    .setOrigin(oX,oY);                
                positionX+=spikeAux.width;
            }
        }
    }
    crearObstaculoV(grupo,listaObj,obj,oX,oY){
        for(let spike of listaObj){
            let positionY=0;
            for(let i=0;i<spike.quantity;i++){                              
                let spikeAux=grupo.create((spike.seconds*700),spike.y+positionY,obj)
                    .setOrigin(oX,oY);                
                positionY+=spikeAux.height;
            }
        }
    }
    onTouchBrick(){
        if(this.box.body.touching.right){
            this.gamerover();
        }else if(this.box.body.touching.up||this.box.body.touching.down){
            this.resetJumpCount();
        }
    }
}
export default Game;