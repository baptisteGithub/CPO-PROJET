import * as fct from "/src/js/fonctions.js";
var calque_plateformes1;
var plateforme_mobile;
var tween_mouvement;
var groupe_ennemis;
var gameOver = false;
var boutonFeu;  
var groupeBullets;  
var  groupe_coins;
var score = 0;
var zone_texte_score;
var bouton_regles;
var bouton_pancarte;
var num = false;
var son_feu;
var son_mort;
export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu", "src/assets/nestle.png");
    this.load.image("Block_Font", "src/assets/BlockFont.png");
    this.load.audio('background','assets/SONFOND.mp3');
    // chargement de la carte
    this.load.tilemapTiledJSON("carte1", "src/assets/map_niveau1.tmj");

    this.load.image("img_plateforme_mobile", "src/assets/rondin1.png");
    this.load.image("img_coin2","src/assets/coins3.png");

    this.load.audio('PIOU','src/assets/PIOU.mp3');
    this.load.audio('MAIS NUL','src/assets/MAIS NUL.mp3');


    /*this.load.spritesheet("img_ennemi", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });*/
    this.load.spritesheet("img_ennemi", "src/assets/ogre.png", {
      frameWidth: 48,
      frameHeight: 48
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

son_feu = this.sound.add('PIOU');
son_mort = this.sound.add('MAIS NUL');

bouton_regles.on("pointerdown",()=>{
  if (num == false){
    bouton_pancarte.setVisible(true);

    num = true;
  }  else {
    bouton_pancarte.setVisible(false);
    num = false;
  }
})

    fct.doNothing();
    fct.doAlsoNothing();
    plateforme_mobile = this.physics.add.sprite(
      2921,
      370,
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
      duration: 9000,  // durée de l'animation pour monter 
      yoyo: true,   // mode yoyo : une fois terminé on "rembobine" le déplacement 
      y: "-=100",   // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
      delay: 0,     // délai avant le début du tween une fois ce dernier activé
      hold: 1000,   // délai avant le yoyo : temps qeu al plate-forme reste en haut
      repeatDelay: 1000, // deléi avant la répétition : temps que la plate-forme reste en bas
      repeat: -1 // répétition infinie 

    });


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
      [ts1, ts2]
    );





    // chargement du calque calque_plateformes
    calque_plateformes1 = carteDuNiveau.createLayer(
      "calque_plateformes1",
      [ts1, ts2]
    );
    const calque_decor1 = carteDuNiveau.createLayer(
      "calque_decor1",
      [ts1, ts2]
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
    this.porte_retour2 = this.physics.add.staticSprite(3125, 210, "img_porte4");
    this.porte_retour.setVisible(false);
    this.porte_retour2.setVisible(false);
    this.player = this.physics.add.sprite(100, 450, "img_perso_court");
    this.player.refreshBody();
    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);
    
    this.clavier = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player, this.groupe_plateformes);

  
    calque_plateformes1.setCollisionByProperty({ estSolide: true });
    this.physics.add.collider(this.player, calque_plateformes1);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, plateforme_mobile);
    tween_mouvement.play();

    groupe_ennemis = this.physics.add.group();
    groupe_coins = this.physics.add.group(); 
  
    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis1");

    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      if (point.name == "ennemi") {
        var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "img_ennemi");
        groupe_ennemis.add(nouvel_ennemi);
      }
    });

    this.physics.add.collider(groupe_ennemis, calque_plateformes1);

    groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
      un_ennemi.setVelocityX(-40);
      un_ennemi.direction = "gauche";
      un_ennemi.play("anim_tourn_gauche", true);
    });

    this.physics.add.collider(this.player, groupe_ennemis, chocAvecEnnemi, null, this); 
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
  boutonFeu = this.input.keyboard.addKey('A'); 
  groupeBullets = this.physics.add.group();  
  this.physics.add.overlap(groupeBullets, groupe_ennemis, hit, null,this);
  this.physics.world.on("worldbounds", function(body) {
    // on récupère l'objet surveillé
    var objet = body.gameObject;
    // s'il s'agit d'une balle
    if (groupeBullets.contains(objet)) {
        // on le détruit
        objet.destroy();
    }
});
if (this.physics.overlap(this.player, tween_mouvement)) {
  this.player.y = -100;
}

//groupe_coins.create(20, 20, "img_coin2");
this.physics.add.collider(groupe_coins, calque_plateformes1);
//groupe_coins = this.physics.add.sprite(1, 0, 'img_coin');
//groupe_coins.play('anim_coin, true');
//groupe_coins.play("anim_coin", true);

// on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
tab_points.objects.forEach(point => {
  if (point.name == "coin") {
    var nouvel_coin = this.physics.add.sprite(point.x, point.y, "img_coin2");
    groupe_coins.add(nouvel_coin);
  }
});

zone_texte_score = this.add.text(50, 50, 'score: ', { fontSize: '32px' }); 
  zone_texte_score.setScrollFactor(0); 
  zone_texte_score.setTint(0xFFA500);

  }

  update() {
    this.physics.add.overlap(this.player, groupe_coins, ramasserEtoile, null, this);
    /*if (this.clavier.left.isDown) {
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
    }*/
    
    if (this.player.body.blocked.down == true) {
      this.statut_saut = false;
    }
    else {
      this.statut_saut = true
    }

   /* if (this.clavier.left.isDown) {
      this.player.setVelocityX(-130);
      this.player.direction = 'left';
      if (this.statut_saut == false) this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(130);
      this.player.direction = 'right';
      if (this.statut_saut == false)
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face2");
    }*/

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-130);
      this.player.direction = 'left';
      if (this.statut_saut == false) {this.player.anims.play("anim_tourne_gauche", true);
      this.player.body.setSize(30,50,-20,+10);
    }
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(130);
      this.player.direction = 'right';
      if (this.statut_saut == false){
      this.player.anims.play("anim_tourne_droite", true);
      this.player.body.setSize(30,50,-20,+10);
    }
    } else {
      this.player.setVelocityX(0);
      this.player.body.setSize(30,50,-20,+10);
      if (this.player.direction == 'left'){
        this.player.anims.play("anim_face2");
      } else if (this.player.direction == 'right'){
        this.player.anims.play("anim_face");
      }
       
    }

    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-190)
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
    groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
      if (un_ennemi.direction == "gauche" && un_ennemi.body.blocked.down) {
        var coords = un_ennemi.getBottomLeft();
        var tuileSuivante = calque_plateformes1.getTileAtWorldXY(
          coords.x,
          coords.y + 10
        );
        if (tuileSuivante == null || un_ennemi.body.blocked.left) {
          // on risque de marcher dans le vide, on tourne
          un_ennemi.direction = "droite";
          un_ennemi.setVelocityX(30);
          un_ennemi.play("anim_tourn_droite", true);
        }
      } else if (un_ennemi.direction == "droite" && un_ennemi.body.blocked.down) {
        var coords = un_ennemi.getBottomRight();
        var tuileSuivante = calque_plateformes1.getTileAtWorldXY(
          coords.x,
          coords.y + 10
        );
        if (tuileSuivante == null || un_ennemi.body.blocked.right) {
          // on risque de marcher dans le vide, on tourne
          un_ennemi.direction = "gauche";
          un_ennemi.setVelocityX(-30);
          un_ennemi.play("anim_tourn_gauche", true);
        }
      }
    });
    /////////////////////////////////////
    
    if ( Phaser.Input.Keyboard.JustDown(boutonFeu) && this.player.body.velocity.y == 0 && this.player.body.velocity.x == 0 ) {
      
      tirer(this.player); 
   }  }
    
  



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
  son_mort.play();
  
} 
//fonction tirer( ), prenant comme paramètre l'auteur du tir
function tirer(player) {
  
  var coefDir;
	    if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
        // on crée la balle a coté du joueur
        var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y +10, 'bullet');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;  
        bullet.body.allowGravity =false;
        bullet.setVelocity(200 * coefDir, 0); // vitesse en x et en y
        setTimeout(() => {
          bullet.destroy();
      }, 1100);
      son_feu.play();
 
}  

// fonction déclenchée lorsque uneBalle et uneCible se superposent
function hit (uneBalle, uneCible) {
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
  score += 1;
  zone_texte_score.setText("Score: " + score); 
  


} 