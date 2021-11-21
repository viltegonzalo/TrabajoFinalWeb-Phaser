class Menu extends Phaser.Scene{
    constructor(){
        super({key:'Menu'});        
    }

    init(data){
        console.log('Se ha iniciado la escena Menu');
        this.points=0;

        if(Object.keys(data).length!==0){
            this.points=data.points;
        }

    }
    create(){
        const width=this.scale.width;
        const height=this.scale.height;


        const pointBD=localStorage.getItem('best_points');


        this.betsPoints=(pointBD!==null)?pointBD:0;

        this.add.image(width*0.5,height*0.5,'background_menu');

        this.logoMenu=this.add.image(
            this.scale.width/2,
            this.scale.height/2,
            'btn_star'
        ).setScale(0.5).setInteractive();

        
        this.pointsText=this.add.bitmapText(
            this.scale.width/2,
            this.scale.height-100,
            'pixelFont',
            'PUNTOS '+this.points
        ).setDepth(2).setOrigin(0.5);

        this.betsPointsText=this.add.bitmapText(
            this.scale.width/2,
            this.scale.height-80,
            'pixelFont',
            'MEJOR PUNTAJE '+this.betsPoints
        ).setDepth(2).setOrigin(0.5);
        //Efecto del movimiento del menu al inicial el Nivel
        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN,()=>{
            this.add.tween({
                targets:this.logoMenu,
                ease:'Bounce.easeIn',
                y:-200,
                duration:1000,
                onComplete:()=>{
                    this.scene.start('Level2')
                }
            });
            this.add.tween({
                targets:[this.pointsText,this.betsPointsText],
                ease:'Bounce.easeIn',
                y:800,
                duration:1000            
            });
        });

        if(this.points>this.betsPoints){
            localStorage.setItem('best_points',this.points);
        }


    }
}
export default Menu;