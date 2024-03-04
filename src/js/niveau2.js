var calque_plateformes2;
export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu", "src/assets/nestle.png");
    this.load.image("Block_Font","src/assets/BlockFont.png");
    
    // chargement de la carte
    this.load.tilemapTiledJSON("carte2", "src/assets/map_niveau2.tmj");
  }

  create() {
    /*this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 2", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });*/
    this.physics.world.setBounds(0, 0, 3200, 640);



    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 640);
    // ancrage de la caméra sur le joueur
    //this.cameras.main.startFollow(this.player);
    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte2");
    
    // chargement du jeu de tuiles
    const ts1 = carteDuNiveau.addTilesetImage(
       "nestle",
       "Phaser_tuilesdejeu"
       
     );  
    
    // chargement du jeu de tuiles
    const ts2 = carteDuNiveau.addTilesetImage(
      "Block Font",
      "Block_Font"
    
    );  
    
    // chargement du calque calque_background
    const calque_ciel = carteDuNiveau.createLayer(
    "calque_ciel2",
    [ts1,ts2]
    );
    
    
    
    // chargement du calque calque_plateformes
    const calque_plateformes2 = carteDuNiveau.createLayer(
    "calque_plateformes2",
    [ts1,ts2]
    );

    this.porte_retour = this.physics.add.staticSprite(170, 250, "img_porte2");
    this.porte_retour.setVisible(false);

    this.player = this.physics.add.sprite(215, 215, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player, this.groupe_plateformes);
    calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
    this.physics.add.collider(this.player, calque_plateformes2); 
    this.cameras.main.startFollow(this.player);
  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
