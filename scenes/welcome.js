export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("WelcomeScene");
    }

    preload() {
        this.load.image("paisagem", "../assets/paisagem.jpeg");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("dogTitulo", "../assets/dogTitulo.png");
        this.load.image("play", "../assets/botao_play.png");
        this.load.image("descricao", "../assets/descricao.png");
    }

    create() {
        this.add.image(this.larguraJogo/2, 397,"computador").setScale(1.9);
        this.add.image(this.larguraJogo/2, 230, "dogTitulo").setScale(0.6);
        this.botaoJogar = this.add.image(this.larguraJogo/2, 375, "play").setScale(0.3).setInteractive();
        this.add.image(this.larguraJogo/2, 500, "descricao").setScale(1);

        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0);
            
        })
        this.botaoJogar.on("pointerdown", () => {
        this.cameras.main.fadeOut(1000, 0, 0);

        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.scene.start("MainScene");
        });
    });

    }

    update() {

    }
}