class Item extends Phaser.Physics.Arcade.StaticGroup{
    constructor(config){
        super(config.physicsWorld,config.scene);
        this.addTomatoItem();

    }
    addTomatoItem(){
        this.create(
            Phaser.Math.Between(50,this.scene.scale.width-50),
            Phaser.Math.Between(150,this.scene.scale.height-70),
            'item'
        );
    }
    destroyItem(){
        this.children.entries[0].destroy();
        this.addTomatoItem();//Una vez que colisiona el itema agrega otro en la pantalla
    }
}
export default Item;