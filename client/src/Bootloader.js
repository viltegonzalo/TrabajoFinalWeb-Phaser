class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';
        this.load.image([
            'background_menu',
            'btn_star',
            'groundTop',
            'background_level2'
        ]);

        this.load.image('font','font/font.png');
        this.load.json('fontData','font/font.json');

        this.load.atlas('tomato','tomato/tomato.png','tomato/tomato_atlas.json');
        this.load.animation('tomatoAnim','tomato/tomato_anim.json');

        this.load.on('complete', () => {
            //this.sound.play('bongo',{loop:true});
            const fontData=this.cache.json.get('fontData');
            this.cache.bitmapFont.add('pixelFont',Phaser.GameObjects.RetroFont.Parse(this,fontData));
            this.scene.start('Menu');
        });
    }
}
export default Bootloader;