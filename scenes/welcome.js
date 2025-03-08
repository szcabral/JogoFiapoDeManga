//Tela inicial do jogo.
export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("WelcomeScene");
    }
//Carregando imagens.
    preload() {
        this.load.image("paisagem", "../assets/paisagem.jpeg");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("dogTitulo", "../assets/dogTitulo.png");
        this.load.image("play", "../assets/botao_play.png");
        this.load.image("descricao", "../assets/descricao.png");
    }

    create() {
      
        // Exibe a imagem de fundo com a paisagem.
        this.add.image(this.larguraJogo / 2, 397, "computador").setScale(1.9);

        // Exibe o título com a imagem do cachorro no centro da tela.
        this.add.image(this.larguraJogo / 2, 230, "dogTitulo").setScale(0.6);

        // Cria o botão de "Jogar" e o coloca no centro da tela.
        this.botaoJogar = this.add.image(this.larguraJogo / 2, 375, "play").setScale(0.3).setInteractive();

        // Exibe a descrição do jogo abaixo do botão de jogar.
        this.add.image(this.larguraJogo / 2, 500, "descricao").setScale(1);

        // Adiciona interatividade ao botão de "Jogar".

        // Quando o mouse passa sobre o botão, o cursor muda para um ponteiro, indicando que o botão é clicável.
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        // Quando o mouse sai do botão, o cursor volta ao padrão.
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Quando o botão é pressionado, começa a animação de fade-out da câmera.
        this.botaoJogar.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0);  // Animação de fade-out (desaparece lentamente) com duração de 1 segundo.
        });

        // Quando a animação de fade-out termina, troca para a cena principal do jogo.
        this.botaoJogar.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0);

            // Após o fade-out terminar, a cena principal (MainScene) é iniciada.
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start("MainScene");
            });
        });
    }

    // O método update é chamado a cada quadro, mas nesta cena ele não está fazendo nada específico.
    update() {
    }
}