export class Bootloader extends Phaser.Scene {
    constructor(){
        super({ key:"Bootloader"});
    }
    init(){
        console.log("Scene Bootloader");
    }
    preload(){
        this.load.path="./assets/";

    }
    create(){

    }
    update(time,delta){

    }
}
export default Bootloader;