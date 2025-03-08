//Definição de fim de jogo.
export class EndScene extends Phaser.Scene {
// Define as dimensões do jogo (largura e altura).
    alturaJogo = 600;
    larguraJogo = 800;
//Parametros para a cena dentro da função Phaser.
    constructor() {
        super("EndScene");
    }

    init(data) {
        this.resultado = data;//Armazenamento de resultado.
    }

    //Carregamento das imagens na cena final.
    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("dog", "../assets/fiapinho.png");
        this.load.image("ganhou", "../assets/ganhou.png");
        this.load.image("menu", "../assets/botao_menu.png");
        this.load.image("restart", "../assets/botao_restart.png");
    }

    create() {
        // Exibe a imagem de fundo (computador) no centro da tela
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "computador").setScale(1.4);

        // Exibe a imagem do cachorro no topo da tela
        this.add.image(this.larguraJogo / 2, 190, "dog").setScale(0.35);

        // Criação do botão "Menu", posicionado à esquerda
        this.botaoMenu = this.add.image(this.larguraJogo / 2 - 100, 260, "menu").setScale(0.17).setInteractive();

        // Criação do botão "Restart", posicionado à direita
        this.botaoRestart = this.add.image(this.larguraJogo / 2 + 100, 260, "restart").setScale(0.17).setInteractive();

        // Eventos para o botão "Menu"
        this.botaoMenu.on("pointerover", () => {
            // Quando o mouse passa sobre o botão, o mouse muda para o formato de ponteiro
            this.input.setDefaultCursor("pointer");
        });

        this.botaoMenu.on("pointerout", () => {
            // Quando o mouse sai do botão, o cursor volta ao formato padrão
            this.input.setDefaultCursor("default");
        });

        this.botaoMenu.on("pointerdown", () => {
            // Quando o botão é clicado, a cena "WelcomeScene" é iniciada
            this.scene.start("WelcomeScene");
        });

        this.botaoRestart.on("pointerover", () => {
            // Quando o mouse passa sobre o botão, o mouse muda para o formato de ponteiro
            this.input.setDefaultCursor("pointer");
        });

        this.botaoRestart.on("pointerout", () => {
            // Quando o mouse sai do botão, o cursor volta ao formato padrão
            this.input.setDefaultCursor("default");
        });

        this.botaoRestart.on("pointerdown", () => {
            // Quando o botão é clicado, a cena "MainScene" é iniciada, e a cena atual (EndScene) para.
            this.scene.stop("EndScene");
            this.scene.start("MainScene");
        });

        // Se o resultado for "ganhou", exibe uma imagem de vitória na tela
        if (this.resultado === "ganhou") {
            this.add.image(this.larguraJogo / 2, 120, "ganhou").setScale(0.65);
        }
    }

    update() {
                
       
        
    }
}