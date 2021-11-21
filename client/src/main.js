import Bootloader from './Bootloader.js';
import Menu from './scenes/Menu.js';
import Level2 from './scenes/Level2.js';

const config = {
    title: "TOM",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 950,
        height: 600,
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
        Menu,
        //Level1,
        Level2
        //Level3
    ]
};

new Phaser.Game(config);