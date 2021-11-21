import Bootloader from './Bootloader.js';
import Menu from './scenes/Menu.js';

const config = {
    title: "TOM",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1280,
        height: 720,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 2000
            },
            debug:true,
        }
    },
    scene: [        
        Bootloader,
        Menu
    ]
};

new Phaser.Game(config);