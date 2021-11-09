//Importar Scenas
import { Game } from "./scenes/Game.js";
import {Bootloader} from "./scenes/Bootloader.js";
const config = {
    title: 'Curso Phaser',
    url: 'www.google.com',
    version: '0.0.1',

    type: Phaser.AUTO,
    width: 950,
    height: 600,
    parent:'contenedor',
    pixelArt:true,
    backgroundColor:'#34495e',
    physics: {
        default:'arcade',
        arcade:{/*
            gravity:{
                y:800                
            },*/
            debug:true
        }
    },
    banner:{
        hidePhaser:true,
        text:'#fff00f',
        backgraund:[
            '#16a085',
            '#2acc71',
            '#000000'
        ],
    },
    scene:[Bootloader,Game]
};

const game =new Phaser.Game(config);