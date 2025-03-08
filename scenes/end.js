export class EndScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("EndScene");
    }

    init(data) {
        this.resultado = data;
    }

    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("dog", "../assets/fiapinho.png");
        this.load.image("ganhou", "../assets/ganhou.png");
        this.load.image("menu", "../assets/botao_menu.png");
        this.load.image("restart", "../assets/botao_restart.png");
    }

    create() {
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "computador").setScale(1.4);
        this.add.image(this.larguraJogo/2, 190, "dog").setScale(0.35);
        this.botaoMenu = this.add.image(this.larguraJogo/2 - 100, 260, "menu").setScale(0.17).setInteractive();
        this.botaoRestart = this.add.image(this.larguraJogo/2 + 100, 260, "restart").setScale(0.17).setInteractive();

        this.botaoMenu.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoMenu.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoMenu.on("pointerdown", () => {
            this.scene.start("WelcomeScene")
        })

        this.botaoRestart.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoRestart.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoRestart.on("pointerdown", () => {
            this.scene.stop("EndScene");
            this.scene.start("MainScene");
        })

        if (this.resultado === "ganhou"){
            this.add.image(this.larguraJogo/2, 120, "ganhou").setScale(0.65);
        }

    }

    update() {
                
       
        
    }
}