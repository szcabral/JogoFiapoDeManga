//Cena principal do jogo.
export class GameScene extends Phaser.Scene {
//Definição de dimensões.
    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];

    constructor() {
        super("MainScene");
    }

    //Adicionando as imagens.
    preload() {
        this.load.image("paisagem2", "../assets/paisagemInicio.jpeg");
        this.load.image("plataforma", "../assets/plataforma.png");
        this.load.spritesheet("dogsprite", "../assets/Doguinho.png", { frameWidth: 32, frameHeight: 30 });
        this.load.image("moto", "../assets/motinha.png");
        this.load.audio("musicaFundo", "../assets/CerolNaMao.mp3");
    }

    
    create() {
         // Faz a câmera desaparecer lentamente
        this.cameras.main.fadeIn(1000, 0, 0);
        this.pontuacao = 0;
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem2").setScale(0.6);
        // Cria o personagem do jogador (cachorro) e adiciona ao jogo
        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'dogsprite').setScale(3);
        this.player.setCollideWorldBounds(true);
         // Adiciona a colisão entre o personagem e as plataformas
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(128, 84, true);
        this.plataformas[0].setScale(0.72);
        // Configuração dos controles do jogador (teclas de direção)
        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
         this.plataformas[1].body.setSize(128, 84, true);
        this.plataformas[1].setScale(0.72);

        for (let i = 0; i < this.plataformas.length; i++){
            this.physics.add.collider(this.player, this.plataformas[i])

        };
        
        //Adicionando controle do jogo.
        this.cursors = this.input.keyboard.createCursorKeys();

          // Animações da personagem
          this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('dogsprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('dogsprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada',
            frames: [{ key: 'dogsprite', frame: 4 }],
            frameRate: 20
        });

// Adicionando a moto.
    this.moto = this.physics.add.sprite(this.larguraJogo/3, 0, 'moto');
    this.moto.setCollideWorldBounds(true); // "borda no mundo"
       this.moto.setScale(0.3);
        this.physics.add.collider(this.moto, this.plataformas[0]); // faz com que o moto n consiga se sobrepor a plataforma
        this.physics.add.collider(this.moto, this.plataformas[1]);

        // adicionando placar 
       this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, {fontSize:'51px', fill:'#ffffff'}, {fontStyle: "bold"});

       // quando o player encostar na moto
       this.physics.add.overlap(this.player, this.moto, () => { 

        this.moto.setVisible(false); //a moto fica invisível

        //número sorteado entre 50 e 650
       var posicaoMoto_Y = Phaser.Math.RND.between(50, 650);
        //ajusta a posição da moto de acordo com o número sorteado
        this.moto.setPosition(posicaoMoto_Y, 100); 

        this.pontuacao += 1; //soma pontuação
        this.placar.setText('Pontuacao: ' + this.pontuacao); //atualiza o placar

        this.moto.setVisible(true); // torna a moto visível
       });
    }

update() {
 // Lógica para movimento do personagem para a esquerda
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        if (this.player.anims.currentAnim?.key !== 'esquerda') {
            this.player.anims.play('esquerda', true);
        }
         // Lógica para movimento do personagem para a direita
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        if (this.player.anims.currentAnim?.key !== 'direita') {
            this.player.anims.play('direita', true);
        }
        // Lógica para quando o personagem não está se movendo
    } else {
        this.player.setVelocityX(0);
        if (this.player.anims.currentAnim?.key !== 'parada') {
            this.player.anims.play('parada', true);
        }
    }

    // Lógica de pulo (vertical) - só pula se estiver no chão
    if (this.cursors.up.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) { 
        this.player.setVelocityY(-420);
    }

    // Acelera a descida, mas sem remover a gravidade
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

