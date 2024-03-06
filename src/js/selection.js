import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
var groupe_plateformes;
var calque_plateformes;
var statut_saut;


// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre le meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    /*this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");*/
    this.load.image("img_porte1", "src/assets/door1.png");
    this.load.image("img_porte2", "src/assets/door2.png");
    this.load.image("img_porte3", "src/assets/door3.png");
    this.load.image("img_porte4","src/assets/door4.png");
   /*this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });*/
    this.load.spritesheet("img_perso", "src/assets/ogre.png", {
      frameWidth: 48,
      frameHeight: 48
    });

    // chargement tuiles de jeu
this.load.image("Phaser_tuilesdejeu", "src/assets/nestle.png");
this.load.image("Block_Font","src/assets/BlockFont.png");

// chargement de la carte
this.load.tilemapTiledJSON("carte", "src/assets/map1.tmj");

this.load.spritesheet("img_perso_court", "src/assets/BOY COURT.png", {
  frameWidth: 32,
  frameHeight: 50
});

this.load.spritesheet("img_perso_courtgauche", "src/assets/BOY COURT GAUCHE.png", {
  frameWidth: 32,
  frameHeight: 50
});

this.load.spritesheet("img_perso_sautdroite", "src/assets/BOY JETPACK DROITE.png", {
  frameWidth: 42,
  frameHeight: 36
});

this.load.spritesheet("img_perso_sautgauche", "src/assets/BOY JETPACK GAUCHE.png", {
  frameWidth: 42,
  frameHeight: 33
});	

this.load.spritesheet("img_perso_tire", "src/assets/BOY SHOT.png", {
  frameWidth: 40,
  frameHeight: 50
});	

this.load.spritesheet("img_perso_tire2", "src/assets/BOY SHOT2.png", {
  frameWidth: 40,
  frameHeight: 50
});	

this.load.spritesheet("img_coin", "src/assets/coins.png", {
  frameWidth: 44,
  frameHeight: 40
});
    
  }

  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {
      fct.doNothing();
      fct.doAlsoNothing();



// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 800, 640);
       // chargement de la carte
const carteDuNiveau = this.add.tilemap("carte");

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
  "calque_ciel",
  [ts1,ts2]
);



// chargement du calque calque_plateformes
const calque_plateformes = carteDuNiveau.createLayer(
  "calque_plateformes",
  [ts1,ts2]
);

const calque_decor = carteDuNiveau.createLayer(
  "calque_decor",
  [ts1,ts2]
);

// On créée un nouveeau personnage : player
player = this.physics.add.sprite(90, 360, "img_perso_court");


 this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso_courtgauche", {
        start: 0,
        end: 6
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 5, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    /*this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso_court", frame: 0 }],
      frameRate: 20
    });*/
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso_tire", frame: 0 }],
      frameRate: 20
    });
    this.anims.create({
      key: "anim_face2",
      frames: [{ key: "img_perso_tire2", frame: 3 }],
      frameRate: 20
    });

    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso_court", {
        start: 0,
        end: 6
      }),
      frameRate: 5,
      repeat: -1
    });

    // creation de l'animation saut droit qui sera jouée sur le player lorsque ce dernier tourne à droite et saute
    this.anims.create({
      key: "anim_saute_droite",
      frames: this.anims.generateFrameNumbers("img_perso_sautdroite", {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1
    });

    // creation de l'animation saut GAUCHE qui sera jouée sur le player lorsque ce dernier tourne à GAUCHE et saute
    this.anims.create({
      key: "anim_saute_gauche",
      frames: this.anims.generateFrameNumbers("img_perso_sautgauche", {
        start: 2,
        end: 0
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: "anim_tire",
      frames: this.anims.generateFrameNumbers("img_perso_tire", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: "anim_coin",
      frames: this.anims.generateFrameNumbers("img_coin", {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1
    });


    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/

    
    this.porte1 = this.physics.add.staticSprite(278, 370, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(458, 496, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(667, 365, "img_porte3");

    this.porte1.setVisible(false);
    this.porte2.setVisible(false);
    this.porte3.setVisible(false);

    

    //  propriétées physiqyes de l'objet player :
    //player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche

    /////////////////////////ANIM DUDE////////////////////
    this.anims.create({
      key: "anim_tourn_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 5,
        end: 3
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_fac",
      frames: [{ key: "img_perso", frame: 1 }],
      frameRate: 20
    });

    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourn_droite",
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 6,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
////////////////////////////////////////////////////////////////////


    /***********************
     *  CREATION DU CLAVIER *
     ************************/
    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();

    /*****************************************************
     *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
     ******************************************************/

    
    // ajout d'une collision entre le joueur et le calque plateformes
    calque_plateformes.setCollisionByProperty({ estSolide: true }); 
    this.physics.add.collider(player, calque_plateformes); 
    player.direction = 'right';



    //player.body.setSize(30,50,-20,+10);

    player.body.onWorldBounds = true; 
    // on met en place l'écouteur sur les bornes du monde
  player.body.world.on(
    "worldbounds", // evenement surveillé
    function (body, up, down, left, right) {
      // on verifie si la hitbox qui est rentrée en collision est celle du player,
      // et si la collision a eu lieu sur le bord inférieur du player
      if (body.gameObject === player && down == true) {
        // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
        this.physics.pause();
        //player.setTint(0xff0000);
        var timerRestart = this.time.delayedCall(10,
          function () {
            this.scene.restart();
          },
          null, this);  
      }
    },
    this
  ); 

 
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
    if (player.body.blocked.down == true){
      statut_saut = false;
   }
   else {
     statut_saut = true
   }
 
   if (clavier.left.isDown ) {
     player.setVelocityX(-160);
     player.direction = 'left';
     if (statut_saut == false) {
       player.anims.play("anim_tourne_gauche", true);
       player.body.setSize(30,50,-20,+10);
     }else {player.anims.play("anim_saute_gauche", true)}
   } else if (clavier.right.isDown ) {
     player.setVelocityX(160);
     player.direction = 'right';
     if ( statut_saut == false){
     player.anims.play("anim_tourne_droite", true);
     player.body.setSize(30,50,-20,+10);}
     else {player.anims.play("anim_saute_droite", true)}
   } else {
     player.setVelocityX(0);
     player.body.setSize(30,50,-20,+10);
     if (player.direction == 'left'){
      player.anims.play("anim_face2");
    } else if (player.direction == 'right'){
      player.anims.play("anim_face");
    }
    
   }

   if (clavier.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-330)
  }
  if (clavier.right.isDown && statut_saut == true) {
    player.anims.play("anim_saute_droite");
    //this.player.body.setSize(25,50,+10,+10);
    player.body.setCircle(20);
  }
  if (clavier.left.isDown && statut_saut == true) {
    player.anims.play("anim_saute_gauche");
    player.body.setCircle(20);
    //this.player.body.setSize(30,50,0,-10);
  }
   

   if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
     if (this.physics.overlap(player, this.porte1))
       this.scene.switch("niveau1");
     if (this.physics.overlap(player, this.porte2))
       this.scene.switch("niveau2");
     if (this.physics.overlap(player, this.porte3))
       this.scene.switch("niveau3");
   }
 }
}


    /*
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }

    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(player, this.porte3))
        this.scene.switch("niveau3");
    }
  }
}

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/
