//Importar Scenas
import {Bootloader} from "./scenes/Bootloader.js";
const config = {
    title: 'Curso Phaser',
    url: 'www.google.com',
    version: '0.0.1',

    type: Phaser.AUTO,
    width: 640,
    height: 360,
    parent:'contenedor',
    pixelArt:true,
    backgroundColor:'#34495e',
    banner:{
        hidePhaser:true,
        text:'#fff00f',
        backgraund:[
            '#16a085',
            '#2acc71',
            '#000000'
        ],
    },
    scene:[Bootloader]
};

const game =new Phaser.Game(config);