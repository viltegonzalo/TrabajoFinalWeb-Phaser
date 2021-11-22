import Bootloader from './Bootloader.js';
import Menu from './scenes/Menu.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';

import UI from './scenes/UI.js';

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
        UI,      
        Level2,
        Level3,
        Menu        
    ]
};

const game =new Phaser.Game(config);