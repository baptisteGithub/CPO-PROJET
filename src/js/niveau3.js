
export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu3", "src/assets/manor.png");
    this.load.image("Block_Font","src/assets/BlockFont.png");
    this.load.image("Phaser_tuilesdeciel", "src/assets/fond_manoir.png");
    
    // chargement de la carte
    this.load.tilemapTiledJSON("carte3", "src/assets/map_niveau3.tmj");
  }

  create() {
    /*this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 3", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });*/
    this.physics.world.setBounds(0, 0, 1600, 640);
    



    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1600, 640);
    // ancrage de la caméra sur le joueur
    //this.cameras.main.startFollow(this.player);
    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte3");
    
    // chargement du jeu de tuiles
    const ts1 = carteDuNiveau.addTilesetImage(
       "manor",
       "Phaser_tuilesdejeu3"
       
     );  
    
    // chargement du jeu de tuiles
    const ts2 = carteDuNiveau.addTilesetImage(
      "Block Font",
      "Block_Font"
    
    );  
    const ts3 = carteDuNiveau.addTilesetImage(
      "fond_manoir",
      "Phaser_tuilesdeciel"
      
    ); 
    
    // chargement du calque calque_background
    const calque_ciel= carteDuNiveau.createLayer(
    "calque_ciel3",
    [ts1,ts2,ts3]
    );
    
    
    // chargement du calque calque_plateformes
    const calque_plateformes3 = carteDuNiveau.createLayer(
    "calque_plateformes3",
    [ts1,ts2,ts3]
    );
    this.porte_retour = this.physics.add.staticSprite(220, 400, "img_porte3");
    this.porte_retour.setVisible(false);

    this.player = this.physics.add.sprite(75, 420, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player, this.groupe_plateformes);

    calque_plateformes3.setCollisionByProperty({ estSolide: true }); 
    this.physics.add.collider(this.player, calque_plateformes3); 
    this.cameras.main.startFollow(this.player);

    this.player.body.setSize(30,45,-20,+10);
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
      this.player.setVelocityY(-170);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
