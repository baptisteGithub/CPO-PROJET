import * as fct from "/src/js/fonctions.js";
var calque_plateformes1;
var plateforme_mobile; 
var tween_mouvement; 
export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu", "src/assets/nestle.png");
    this.load.image("Block_Font","src/assets/BlockFont.png");

// chargement de la carte
this.load.tilemapTiledJSON("carte1", "src/assets/map_niveau1.tmj");

this.load.image("img_plateforme_mobile", "src/assets/rondin1.png");
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();
    plateforme_mobile = this.physics.add.sprite(
      2925,
      350,
      "img_plateforme_mobile"
    ); 
    plateforme_mobile.body.allowGravity = false;
    plateforme_mobile.body.immovable = true; 
    plateforme_mobile.setVisible(true);
    plateforme_mobile.setDepth(100);

    tween_mouvement = this.tweens.add({
      targets: [plateforme_mobile],  // on applique le tween sur platefprme_mobile
      paused: true, // de base le tween est en pause
      ease: "Linear",  // concerne la vitesse de mouvement : linéaire ici 
      duration: 10000,  // durée de l'animation pour monter 
      yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
      y: "-=100",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
      delay: 0,     // délai avant le début du tween une fois ce dernier activé
      hold: 1000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
      repeatDelay: 1000, // deléi avant la répétition : temps que la plate-forme reste en bas
      repeat: -1 // répétition infinie 
       
    });
   

    /*this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");*/
    // redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 3200, 640);



//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 3200, 640);
// ancrage de la caméra sur le joueur
//this.cameras.main.startFollow(this.player);
// chargement de la carte
const carteDuNiveau = this.add.tilemap("carte1");

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
"calque_ciel1",
[ts1,ts2]
);



// chargement du calque calque_plateformes
const calque_plateformes1 = carteDuNiveau.createLayer(
"calque_plateformes1",
[ts1,ts2]
);
const calque_decor1 = carteDuNiveau.createLayer(
  "calque_decor1",
  [ts1,ts2]
  );
/*
const calque_decor = carteDuNiveau.createLayer(
"calque_decor",
[ts1,ts2]
);*/
    // ajout d'un texte distintcif  du niveau
    /*this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });
*/
    this.porte_retour = this.physics.add.staticSprite(50, 500, "img_porte1");
    this.porte_retour2 = this.physics.add.staticSprite(3125,210,"img_porte4");
    this.porte_retour.setVisible(false);
    this.porte_retour2.setVisible(false);
    this.player = this.physics.add.sprite(2800, 0, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player, this.groupe_plateformes);

    calque_plateformes1.setCollisionByProperty({ estSolide: true }); 
    this.physics.add.collider(this.player, calque_plateformes1); 
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, plateforme_mobile); 
    tween_mouvement.play();
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
      this.player.setVelocityY(-150);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour2)) {
        this.scene.switch("selection");
      }
    }
  }
}
