// Cena principal do jogo.
export class GameScene extends Phaser.Scene {
    // Definição de dimensões.
    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];

    constructor() {
        super("MainScene");
    }

    // Adicionando as imagens.
    preload() {
        this.load.image("paisagem2", "./assets/paisagemInicio.jpeg");
        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.spritesheet("dogsprite", "./assets/Doguinho.png", { frameWidth: 32, frameHeight: 30 });
        this.load.image("moto", "./assets/motinha.png");
        this.load.audio("musicaFundo", "./assets/CerolNaMao.mp3");
        this.load.spritesheet("pastorsprite", "./assets/pastorSprite.png", { frameWidth: 32, frameHeight: 28.8 });
    }

    create() {
        // Efeito de fade-in na câmera
        this.cameras.main.fadeIn(1000, 0, 0);
        this.pontuacao = 0;

        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem2").setScale(0.6);

        // Verifica se é desktop ou mobile e escolhe o personagem correto
        if (this.sys.game.device.os.desktop) {
            this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'dogsprite').setScale(3);
        } else {
            this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'pastorsprite').setScale(3);
        }

        this.player.setCollideWorldBounds(true);

        // Criação das plataformas
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma').setScale(0.72);
        this.plataformas[0].body.setSize(128, 84, true);
        
        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma').setScale(0.72);
        this.plataformas[1].body.setSize(128, 84, true);

        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        // Adicionando controle do jogo.
        this.cursors = this.input.keyboard.createCursorKeys();

        // Criando animações separadas para cada personagem
        this.anims.create({
            key: 'direita_dog',
            frames: this.anims.generateFrameNumbers('dogsprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda_dog',
            frames: this.anims.generateFrameNumbers('dogsprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada_dog',
            frames: [{ key: 'dogsprite', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'direita_pastor',
            frames: this.anims.generateFrameNumbers('pastorsprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda_pastor',
            frames: this.anims.generateFrameNumbers('pastorsprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada_pastor',
            frames: [{ key: 'pastorsprite', frame: 4 }],
            frameRate: 20
        });

        // Adicionando a moto.
        this.moto = this.physics.add.sprite(this.larguraJogo / 3, 0, 'moto').setScale(0.3);
        this.moto.setCollideWorldBounds(true);

        this.physics.add.collider(this.moto, this.plataformas[0]);
        this.physics.add.collider(this.moto, this.plataformas[1]);

        // Adicionando placar
        this.placar = this.add.text(50, 50, 'Pontuação: ' + this.pontuacao, { fontSize: '51px', fill: '#ffffff', fontStyle: "bold" });

        // Evento de coleta da moto
        this.physics.add.overlap(this.player, this.moto, () => {
            this.moto.setVisible(false);

            var posicaoMoto_Y = Phaser.Math.RND.between(50, 650);
            this.moto.setPosition(posicaoMoto_Y, 100);

            this.pontuacao += 1;
            this.placar.setText('Pontuação: ' + this.pontuacao);

            this.moto.setVisible(true);
        });
    }

    update() {
        // Determina o tipo de sprite para escolher a animação correta
        let isDog = this.player.texture.key === "dogsprite";

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play(isDog ? 'esquerda_dog' : 'esquerda_pastor', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play(isDog ? 'direita_dog' : 'direita_pastor', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play(isDog ? 'parada_dog' : 'parada_pastor', true);
        }

        // Lógica de pulo (somente se estiver no chão)
        if (this.cursors.up.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
            this.player.setVelocityY(-420);
        }

        // Acelera a descida, sem remover a gravidade
        if (this.cursors.down.isDown && !this.player.body.blocked.down) {
            this.player.setVelocityY(this.player.body.velocity.y + 20);
        }

        // Lógica para vencer o jogo
        if (this.pontuacao >= 5) {
            this.scene.stop('MainScene');
            this.scene.start('EndScene', "ganhou");
        }
    }
}
