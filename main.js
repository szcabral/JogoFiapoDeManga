//Importando as cenas que iremos utilizar.
import { GameScene } from "./scenes/game.js";
import { WelcomeScene } from "./scenes/welcome.js";
import { EndScene } from "./scenes/end.js";

const config = {
    type: Phaser.AUTO,//Definindo o tipo de renderização
    //Adicionando largura e altura para nossa tela.
    width: 800,
    height: 600,
    backgroundColor: "#febf34",//Cor de fundo.
    pixelArt: true,
    roundPixel: false,
    //Ajustando medidas para a tela do navegador.
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //Definindo o sistema de física que utilizaremos no jogo e com a gravidade que será aplicada.
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },
    //Definindo a ordem de cenas para o nosso usuário.
    scene: [WelcomeScene, GameScene, EndScene]
};
//Criação de uma instancia para configuração acima.
const game = new Phaser.Game(config);