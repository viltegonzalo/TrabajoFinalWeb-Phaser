export class Bootloader extends Phaser.Scene {
    constructor(){
        super({ key:"Bootloader"});
    }
    init(){
        console.log("Scene Bootloader");
    }
    preload(){
        this.load.path="./assets/";
        this.load.image([
            'box',
            'groundBottom',
            'groundTop',
            'spikeBottom',
            'spikeSide',
            'spikeTop',
            'portal',
            'portalFinal',
            'portalFlap',
            'portalGravity',
            'rocket',
            'brick',
            'background'
        ]);
        this.load.audio('background','sound/background.ogg');
        this.load.audio('gameover','sound/gameover.ogg');
        this.load.audio('jump','sound/jump.ogg');
        this.load.audio('msgStart','sound/msgStart.ogg');
        this.load.audio('portal','sound/portal.ogg');
        this.load.audio('portalEndLevel','sound/portalEndLevel.ogg');
        this.load.audio('portalFlap','sound/portalFlap.ogg');
        this.load.audio('portalGravity','sound/portalGravity.ogg');
        this.load.audio('','sound/');
    }
    create(){
        this.scene.start('Game');
    }
}
export default Bootloader;