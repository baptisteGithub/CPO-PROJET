var calque_plateformes2;
var plateforme_mobile2;
var tween_mouvement2;
var groupe_ennemis2;
var gameOver2 = false;
var boutonFeu2;
var groupeBullets2;
var groupe_coins2;
var score2 = 0;
var zone_texte_score2;
var bouton_regles;
var bouton_pancarte;
var num = false;
var gameOver = false;
var son_feu1;
var son_mort1;
export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu", "src/assets/nestle.png");
    this.load.image("Block_Font", "src/assets/BlockFont.png");

    this.load.image("JSP", "src/assets/JSP.png");
    this.load.image("fondglace", "src/assets/bismillah.png");
    this.load.image("tuilesniv2", "src/assets/preview2.png");
    this.load.audio('PIOU1','src/assets/PIOU.mp3');
    this.load.audio('ANGLES MORTS','src/assets/ANGLES MORTS.mp3');
    // chargement de la carte
    this.load.tilemapTiledJSON("carte2", "src/assets/map_niveau2bis.tmj");
    this.load.image("img_coin2", "src/assets/coins3.png");
    //CCHARGEMENT OURSON 
    this.load.spritesheet("img_perso_ourson", "src/assets/ours dansant.png", {
      frameWidth: 75,
      frameHeight: 103
    });

    //CHARGEMENT DINO
    this.load.spritesheet("img_perso_dino", "src/assets/dino.png", {
      frameWidth: 75,
      frameHeight: 138
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

    this.load.spritesheet("img_coin", "src/assets/coins.png", {
      frameWidth: 40,
      frameHeight: 44.5
    });
    // chargement de l'image balle.png
    this.load.image("bullet", "src/assets/bullet.png"); 
 this.load.image("regles","src/assets/unidentified.png"); 
this.load.image("pancarte2","src/assets/livre.png");
  }

  create() {

    bouton_regles = this.add.image(752,32, "regles");
bouton_regles.setVisible(true);
bouton_regles.setInteractive();
bouton_regles.setDepth(101);
bouton_pancarte = this.add.image(400,320, "pancarte2");
bouton_pancarte.setVisible(false);
bouton_pancarte.setInteractive();
bouton_pancarte.setDepth(102);
bouton_regles.setScrollFactor(0);
bouton_pancarte.setScrollFactor(0);

son_feu1 = this.sound.add('PIOU1');
son_mort1 = this.sound.add('ANGLES MORTS');

bouton_regles.on("pointerdown",()=>{
  if (num == false){
    bouton_pancarte.setVisible(true);

    num = true;
  }  else {
    bouton_pancarte.setVisible(false);
    num = false;
  }
})
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

    this.anims.create({
      key: "anim_sauteur", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso_dino", {
        start: 0,
        end: 3
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 8, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // chargement du jeu de tuiles
    /* const ts1 = carteDuNiveau.addTilesetImage(
        "nestle",
        "Phaser_tuilesdejeu"
        
      );  */

    // chargement du jeu de tuiles
    const ts1 = carteDuNiveau.addTilesetImage(
      "BlockFont",
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
      [ts1, ts2, ts3, ts4,]
    );

const calque_decor2 = carteDuNiveau.createLayer(
"calque_decor2",
[ts1,ts2,ts3,ts4,]
);

    // chargement du calque calque_plateformes
    calque_plateformes2 = carteDuNiveau.createLayer(
      "calque_plateformes2",
      [ts1, ts2, ts3, ts4,]
    );

    this.porte_retour = this.physics.add.staticSprite(30, 460, "img_porte2");
    this.porte_retour2 = this.physics.add.staticSprite(3125, 400, "img_porte4");
    this.porte_retour.setVisible(false);
    this.porte_retour2.setVisible(false);
    this.player = this.physics.add.sprite(60, 450, "img_perso_court");
    this.player.refreshBody();
    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);

    this.clavier = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player, this.groupe_plateformes);


    calque_plateformes2.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, calque_plateformes2);
    this.cameras.main.startFollow(this.player);


    groupe_ennemis2 = this.physics.add.group();
    groupe_coins2 = this.physics.add.group();

    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis2");

    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      if (point.name == "ennemis2") {
        var nouvel_ennemi2 = this.physics.add.sprite(point.x, point.y, "img_perso_dino");
        groupe_ennemis2.add(nouvel_ennemi2);
      }
    });

    this.physics.add.collider(groupe_ennemis2, calque_plateformes2);

    groupe_ennemis2.children.iterate(function iterateur(un_ennemi2) {
      un_ennemi2.setVelocityX(-40);
      un_ennemi2.direction = "gauche";
      un_ennemi2.play("anim_sauteur", true);
    });

    this.physics.add.collider(this.player, groupe_ennemis2, chocAvecEnnemi, null, this);
    this.player.body.onWorldBounds = true;

    // on met en place l'écouteur sur les bornes du monde
    this.player.body.world.on(
      "worldbounds", // evenement surveillé
      function (body, up, down, left, right) {
        // on verifie si la hitbox qui est rentrée en collision est celle du player,
        // et si la collision a eu lieu sur le bord inférieur du player
        if (body.gameObject === this.player && down == true) {
          // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
          this.physics.pause();
          this.player.setTint(0xff0000);
          var timerRestart = this.time.delayedCall(1000,
            function () {
              this.scene.restart();
            },
            null, this);
        }
      },
      this
    );

    this.player.direction = 'right';
    boutonFeu2 = this.input.keyboard.addKey('A');
    groupeBullets2 = this.physics.add.group();
    this.physics.add.overlap(groupeBullets2, groupe_ennemis2, hit, null, this);
    this.physics.world.on("worldbounds", function (body) {
      // on récupère l'objet surveillé
      var objet = body.gameObject;
      // s'il s'agit d'une balle
      if (groupeBullets2.contains(objet)) {
        // on le détruit
        objet.destroy();
      }
    });


    //groupe_coins.create(20, 20, "img_coin2");
    this.physics.add.collider(groupe_coins2, calque_plateformes2);
    //groupe_coins = this.physics.add.sprite(1, 0, 'img_coin');
    //groupe_coins.play('anim_coin, true');
    //groupe_coins.play("anim_coin", true);

    //on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    /*tab_points.objects.forEach(point => {
      if (point.name == "coin") {
        var nouvel_coin = this.physics.add.sprite(point.x, point.y, "img_coin2");
        groupe_coins2.add(nouvel_coin);
      }
    });*/

    /*zone_texte_score2 = this.add.text(50, 50, 'score: 0', { fontSize: '32px' });
    zone_texte_score2.setScrollFactor(0);
    zone_texte_score2.setTint(0xFFA500);*/



    //JOUEUR PRINCIPAL
    /*this.player = this.physics.add.sprite(215, 215, "img_perso_court");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_plateformes2);
    calque_plateformes2.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, calque_plateformes2);
    this.cameras.main.startFollow(this.player);*/

   /* //OURSON
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

    this.ourson.anims.play("anim_danse", true);*/

    //DINO
    /*this.dino = this.physics.add.sprite(40, 120, "img_perso_dino");
    this.dino.refreshBody();
    this.dino.setBounce(0.2);
    this.dino.setCollideWorldBounds(true);
    calque_plateformes2.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.dino, calque_plateformes2);
    this.cameras.main.startFollow(this.dino);
*/

    /*this.anims.create({
      key: "anim_sauteur", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso_dino", {
        start: 0,
        end: 3
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 8, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });*/

    //this.dino.anims.play("anim_sauteur", true);
/*
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
*/



   /* this.cameras.main.setBounds(0, 0, 3200, 640);
    //ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);*/
  }




  update() {
   

    if (this.player.body.blocked.down == true) {
      this.statut_saut = false;
    }
    else {
      this.statut_saut = true
    }

    

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-130);
      this.player.direction = 'left';
      if (this.statut_saut == false) {
        this.player.anims.play("anim_tourne_gauche", true);
        this.player.body.setSize(30, 50, -20, +10);
      }
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(130);
      this.player.direction = 'right';
      if (this.statut_saut == false) {
        this.player.anims.play("anim_tourne_droite", true);
        this.player.body.setSize(30, 50, -20, +10);
      }
    } else {
      this.player.setVelocityX(0);
      this.player.body.setSize(30, 50, -20, +10);
      if (this.player.direction == 'left') {
        this.player.anims.play("anim_face2");
      } else if (this.player.direction == 'right') {
        this.player.anims.play("anim_face");
      }

    }

    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-350)
    }
    if (this.clavier.right.isDown && this.statut_saut == true) {
      this.player.anims.play("anim_saute_droite");
      //this.player.body.setSize(25,50,+10,+10);
      this.player.body.setCircle(20);
    }
    if (this.clavier.left.isDown && this.statut_saut == true) {
      this.player.anims.play("anim_saute_gauche");
      this.player.body.setCircle(20);
      //this.player.body.setSize(30,50,0,-10);
    }



    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
      }
      else if (this.physics.overlap(this.player, this.porte_retour2)) {
        this.scene.restart();
        this.scene.switch("selection");
      }
    }
    //////////////////////////
    groupe_ennemis2.children.iterate(function iterateur(un_ennemi) {
      if (un_ennemi.direction == "gauche" && un_ennemi.body.blocked.down) {
        var coords = un_ennemi.getBottomLeft();
        var tuileSuivante = calque_plateformes2.getTileAtWorldXY(
          coords.x,
          coords.y + 10
        );
        if (tuileSuivante == null || un_ennemi.body.blocked.left) {
          // on risque de marcher dans le vide, on tourne
          un_ennemi.direction = "droite";
          un_ennemi.setVelocityX(30);
          un_ennemi.play("anim_sauteur", true);
        }
      } else if (un_ennemi.direction == "droite" && un_ennemi.body.blocked.down) {
        var coords = un_ennemi.getBottomRight();
        var tuileSuivante = calque_plateformes2.getTileAtWorldXY(
          coords.x,
          coords.y + 10
        );
        if (tuileSuivante == null || un_ennemi.body.blocked.right) {
          // on risque de marcher dans le vide, on tourne
          un_ennemi.direction = "gauche";
          un_ennemi.setVelocityX(-30);
          un_ennemi.play("anim_sauteur", true);
        }
      }
    });
    /////////////////////////////////////

    if (Phaser.Input.Keyboard.JustDown(boutonFeu2)  && this.player.body.blocked.down && this.player.body.velocity.x == 0) {

      tirer(this.player);
    }


  }
}
function chocAvecEnnemi(un_player, un_ennemi) {
  this.physics.pause();
  this.player.setTint(0xff0000);
  var timerRestart = this.time.delayedCall(1000,
    function () {
      this.scene.restart();
    },
    null, this);
  this.player.anims.play("anim_face");
  gameOver = true;
  son_mort1.play();

}
//fonction tirer( ), prenant comme paramètre l'auteur du tir
function tirer(player) {

  var coefDir;
  if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
  // on crée la balle a coté du joueur
  var bullet = groupeBullets2.create(player.x + (25 * coefDir), player.y + 10, 'bullet');
  // parametres physiques de la balle.
  bullet.setCollideWorldBounds(true);
  bullet.body.onWorldBounds = true;
  bullet.body.allowGravity = false;
  bullet.setVelocity(200 * coefDir, 0); // vitesse en x et en y
  setTimeout(() => {
    bullet.destroy();
  }, 1100);
  son_feu1.play();


}

// fonction déclenchée lorsque uneBalle et uneCible se superposent
function hit(uneBalle, uneCible) {
  uneBalle.destroy(); // destruction de la balle
  uneCible.play("anim_fac", true);
  uneCible.setTint(0xff0000);
  uneCible.setVelocity(0);
  setTimeout(() => {
    uneCible.destroy();
  }, 200);
  //uneCible.destroy();  // destruction de la cible.   
}

function ramasserEtoile(un_player, une_etoile) {
  // on désactive le "corps physique" de l'étoile mais aussi sa texture
  // l'étoile existe alors sans exister : elle est invisible et ne peut plus intéragir
  une_etoile.disableBody(true, true);
  //  on ajoute 10 points au score total, on met à jour l'affichage
  score += 10;
  //zone_texte_score.setText("Score: " + score);



} 