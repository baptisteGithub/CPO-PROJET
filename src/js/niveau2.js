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

    this.load.image("JSP","src/assets/JSP.png");
    this.load.image("fondglace","src/assets/bismillah.png");
    this.load.image("tuilesniv2","src/assets/preview2.png");

    
    // chargement de la carte
    this.load.tilemapTiledJSON("carte2", "src/assets/map_niveau2bis.tmj");

//CCHARGEMENT OURSON 
this.load.spritesheet("img_perso_ourson", "src/assets/ours dansant.png", {
  frameWidth: 75,
  frameHeight: 103
});

//CHARGEMENT DINO
this.load.spritesheet("img_perso_dino", "src/assets/dino.png", {
  frameWidth: 75,
  frameHeight: 153
});

//CHARGEMENT ZOMBIE
this.load.spritesheet("img_perso_zombie", "src/assets/zombie.png", {
  frameWidth: 64,
  frameHeight: 66
});

//CHARGEMENT REMPANTS
this.load.spritesheet("img_perso_rempants", "src/assets/rempants.png", {
  frameWidth: 65,
  frameHeight: 30
});

//CHARGEMENT GLACEURS
this.load.spritesheet("img_perso_glaceurs", "src/assets/glaceurs.png", {
  frameWidth: 86,
  frameHeight: 68
});



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
   /* const ts1 = carteDuNiveau.addTilesetImage(
       "nestle",
       "Phaser_tuilesdejeu"
       
     );  */
    
    // chargement du jeu de tuiles
    const ts1 = carteDuNiveau.addTilesetImage(
      "Block Font",
      "Block_Font"
    
    );  
    const ts2 = carteDuNiveau.addTilesetImage(
      "JSP",
      "JSP"
    
    );  
    const ts3 = carteDuNiveau.addTilesetImage(
      "fondglace",
      "fondglace"
    
    );  
    const ts4 = carteDuNiveau.addTilesetImage(
      "tuilesniv2",
      "tuilesniv2"
    
    );  
    
    // chargement du calque calque_background
    const calque_ciel = carteDuNiveau.createLayer(
    "calque_image",
    [ts1,ts2,ts3,ts4,]
    );
    
    
    
    // chargement du calque calque_plateformes
    const calque_plateformes2 = carteDuNiveau.createLayer(
    "calque_plateformes2",
    [ts1,ts2,ts3,ts4,]
    );

    this.porte_retour = this.physics.add.staticSprite(170, 250, "img_porte2");
    this.porte_retour.setVisible(false);

    //JOUEUR PRINCIPAL
    this.player = this.physics.add.sprite(215, 215, "img_perso_court");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_plateformes2);
    calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
    this.physics.add.collider(this.player, this.calque_plateformes2); 
    this.cameras.main.startFollow(this.player);
  
//OURSON
  this.ourson = this.physics.add.sprite(90, 120, "img_perso_ourson");
  this.ourson.refreshBody();
  this.ourson.setBounce(0.2);
  this.ourson.setCollideWorldBounds(true);
  calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
  this.physics.add.collider(this.ourson, calque_plateformes2); 
  this.cameras.main.startFollow(this.ourson);
 

  this.anims.create({
    key: "anim_danse", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso_ourson", {
      start: 0,
      end: 6
    }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 7, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  });

  this.ourson.anims.play("anim_danse", true);

  //DINO
  this.dino = this.physics.add.sprite(90, 120, "img_perso_dino");
  this.dino.refreshBody();
  this.dino.setBounce(0.2);
  this.dino.setCollideWorldBounds(true);
  calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
  this.physics.add.collider(this.dino, calque_plateformes2); 
  this.cameras.main.startFollow(this.dino);
 

  this.anims.create({
    key: "anim_sauteur", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso_dino", {
      start: 0,
      end: 5
    }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 8, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  });

  this.dino.anims.play("anim_sauteur", true);

  //ZOMBIE
  this.zombie = this.physics.add.sprite(90, 120, "img_perso_zombie");
  this.zombie.refreshBody();
  this.zombie.setBounce(0.2);
  this.zombie.setCollideWorldBounds(true);
  //calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
  this.physics.add.collider(this.zombie, calque_plateformes2); 
  this.cameras.main.startFollow(this.zombie);
 

  this.anims.create({
    key: "anim_beurk", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso_zombie", {
      start: 0,
      end: 3
    }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 8, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  });

  this.zombie.anims.play("anim_beurk", true);

  //REMPANTS

  this.rempants = this.physics.add.sprite(90, 120, "img_perso_rempants");
  this.rempants.refreshBody();
  this.rempants.setBounce(0.2);
  this.rempants.setCollideWorldBounds(true);
  //calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
  this.physics.add.collider(this.rempants, calque_plateformes2); 
  this.cameras.main.startFollow(this.rempants);
 

  this.anims.create({
    key: "anim_rempe", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso_rempants", {
      start: 0,
      end: 5
    }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 8, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  });

  this.rempants.anims.play("anim_rempe", true);

  //GLACEURS

  this.glaceurs = this.physics.add.sprite(90, 120, "img_perso_glaceurs");
  this.glaceurs.refreshBody();
  this.glaceurs.setBounce(0.2);
  this.glaceurs.setCollideWorldBounds(true);
 // calque_plateformes2.setCollisionByProperty({ estSolide: true }); 
  this.physics.add.collider(this.glaceurs, calque_plateformes2); 
  this.cameras.main.startFollow(this.glaceurs);
 

  this.anims.create({
    key: "anim_glace", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso_glaceurs", {
      start: 1,
      end: 3
    }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 8, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  });

  this.glaceurs.anims.play("anim_glace", true);

  //LUTIN


  //POULET

  //PIEUVRE




  this.cameras.main.setBounds(0, 0, 3200, 640);
//ancrage de la caméra sur le joueur
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
