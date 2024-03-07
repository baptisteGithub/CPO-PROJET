var gameOver = false;
var groupe_ennemis3;
var calque_plateformes3;
var calque_ennemis3;
var boutonFeu3;  
var groupeBullets; 
var  groupe_coins; 
var score = 0;
var zone_texte_score;
var bouton_regles;
var bouton_pancarte;
var num = false;
var imgfin;

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
    
    this.load.image("fin", "src/assets/fin.png");
    
    // chargement de la carte
    this.load.tilemapTiledJSON("carte3", "src/assets/map_niveau3.tmj");

    this.load.spritesheet("img_ennemi3", "src/assets/monstre.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("img_ennemi3droit", "src/assets/monstredroit.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("img_coin", "src/assets/coins.png", {
      frameWidth: 40,
      frameHeight: 44.5
    });

    this.load.image("bullet3", "src/assets/bullet.png");  
    this.load.image("img_coin3","src/assets/coins3.png");
    this.load.image("regles","src/assets/unidentified.png");
this.load.image("pancarte2","src/assets/livre.png");
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
bouton_regles.on("pointerdown",()=>{
  if (num == false){
    bouton_pancarte.setVisible(true);

    num = true;
  }  else {
    bouton_pancarte.setVisible(false);
    num = false;
  }
})


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

    this.anims.create({
      key: "anim_fac3",
      frames: [{ key: "img_ennemi3", frame: 53 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_tourn_gauche3", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_ennemi3", {
        start: 0,
        end: 8
      }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourn_droite3",
      frames: this.anims.generateFrameNumbers("img_ennemi3droit", {
        start: 8,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    });
    
    // chargement du calque calque_background
    const calque_ciel= carteDuNiveau.createLayer(
    "calque_ciel3",
    [ts1,ts2,ts3]
    );
    
    
    // chargement du calque calque_plateformes
     calque_plateformes3 = carteDuNiveau.createLayer(
    "calque_plateformes3",
    [ts1,ts2,ts3]
    );

   /* const calque_ennemis3 = carteDuNiveau.createLayer(
      "calque_ennemis3",
      [ts1,ts2,ts3]
      );*/


    this.porte_retour = this.physics.add.staticSprite(80, 420, "img_porte3");
    this.porte_retour.setVisible(false);
    this.porte_retour3 = this.physics.add.staticSprite(75, 420, "img_porte4");
    this.porte_retour3.setVisible(false);

    this.player = this.physics.add.sprite(1550, 0, "img_perso_court");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player, this.groupe_plateformes);

    calque_plateformes3.setCollisionByProperty({ estSolide: true }); 
    this.physics.add.collider(this.player, calque_plateformes3); 
    this.cameras.main.startFollow(this.player);

    //this.player.body.setSize(30,45,-20,+10);

    this.physics.add.overlap(this.player, calque_plateformes3);  
    
   
    calque_plateformes3.setTileIndexCallback(16572, ramasserPieces, this);

    groupe_ennemis3 = this.physics.add.group();
    groupe_coins = this.physics.add.group(); 

    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
     const tab_points3 = carteDuNiveau.getObjectLayer("calque_ennemis3");

    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points3.objects.forEach(point => {
      if (point.name == "ennemi3") {
        var nouvel_ennemi3 = this.physics.add.sprite(point.x, point.y, "img_ennemi3");
        groupe_ennemis3.add(nouvel_ennemi3);
      }
    });

    this.physics.add.collider(groupe_ennemis3, calque_plateformes3);
    groupe_ennemis3.children.iterate(function iterateur(un_ennemi) {
      un_ennemi.setVelocityX(-30);
      un_ennemi.direction = "gauche";
      un_ennemi.play("anim_tourn_gauche3", true);
    });

    
    this.physics.add.collider(this.player, groupe_ennemis3, chocAvecEnnemi, null, this); 
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
  boutonFeu3 = this.input.keyboard.addKey('A'); 
  groupeBullets = this.physics.add.group();  
  this.physics.add.overlap(groupeBullets, groupe_ennemis3, hit, null,this);
  this.physics.world.on("worldbounds", function(body) {
    // on récupère l'objet surveillé
    var objet = body.gameObject;
    // s'il s'agit d'une balle
    if (groupeBullets.contains(objet)) {
        // on le détruit
        objet.destroy();
    }
});

this.physics.add.collider(groupe_coins, calque_plateformes3);

tab_points3.objects.forEach(point => {
  if (point.name == "coin3") {
    var nouvel_coin = this.physics.add.sprite(point.x, point.y, "img_coin3");
    groupe_coins.add(nouvel_coin);
  }
});

zone_texte_score = this.add.text(50, 50, 'score: ', { fontSize: '32px' }); 
  zone_texte_score.setScrollFactor(0); 
  zone_texte_score.setTint(0xFFA500);


  }

  update() {

    this.physics.add.overlap(this.player, groupe_coins, ramasserEtoile, null, this);

    calque_plateformes3.setTileIndexCallback(59, ramasserPieces, this);

    if (this.player.body.blocked.down == true) {
      this.statut_saut = false;
    }
    else {
      this.statut_saut = true
    }

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-110);
      this.player.direction = 'left';
      if (this.statut_saut == false) {this.player.anims.play("anim_tourne_gauche", true);
      this.player.body.setSize(30,45,-20,+10);
    }
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(110);
      this.player.direction = 'right';
      if (this.statut_saut == false){
      this.player.anims.play("anim_tourne_droite", true);
      this.player.body.setSize(30,45,-20,+10);
    }
    } else {
      this.player.setVelocityX(0);
      this.player.body.setSize(30,45,-20,+10);
      if (this.player.direction == 'left'){
        this.player.anims.play("anim_face2");
      } else if (this.player.direction == 'right'){
        this.player.anims.play("anim_face");
      }
       
    }

    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-160)
    }
    if (this.clavier.right.isDown && this.statut_saut == true) {
      this.player.anims.play("anim_saute_droite");
      //this.player.body.setSize(25,50,+10,+10);
      this.player.body.setCircle(18);
    }
    if (this.clavier.left.isDown && this.statut_saut == true) {
      this.player.anims.play("anim_saute_gauche");
      this.player.body.setCircle(18);
      //this.player.body.setSize(30,50,0,-10);
    }



    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        //console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
      else if (this.physics.overlap(this.player, this.porte_retour3)) {
        this.scene.restart();
        this.scene.switch("selection");
      }
    }
////////////////////////////////////:
    groupe_ennemis3.children.iterate(function iterateur(un_ennemi) {
      if (un_ennemi.direction == "gauche" && un_ennemi.body.blocked.down) {
        var coords = un_ennemi.getBottomLeft();
        var tuileSuivante = calque_plateformes3.getTileAtWorldXY(
          coords.x,
          coords.y + 10
        );
        if (tuileSuivante == null || un_ennemi.body.blocked.left) {
          // on risque de marcher dans le vide, on tourne
          un_ennemi.direction = "droite";
          un_ennemi.setVelocityX(30);
          un_ennemi.play("anim_tourn_droite3", true);
        }
      } else if (un_ennemi.direction == "droite" && un_ennemi.body.blocked.down) {
        var coords = un_ennemi.getBottomRight();
        var tuileSuivante = calque_plateformes3.getTileAtWorldXY(
          coords.x,
          coords.y + 10
        );
        if (tuileSuivante == null || un_ennemi.body.blocked.right) {
          // on risque de marcher dans le vide, on tourne
          un_ennemi.direction = "gauche";
          un_ennemi.setVelocityX(-30);
          un_ennemi.play("anim_tourn_gauche3", true);
        }
      }
    });
    ////////////////////////////////////////
   // && this.player.body.velocity.y == 0 && this.player.body.velocity.x == 0
    if ( Phaser.Input.Keyboard.JustDown(boutonFeu3)  && this.player.body.velocity.x == 0 && this.player.body.blocked.down) {
      
      tirer(this.player); 
    } 
  }

  
}
function ramasserPieces (sprite, tuile) {
  // on enleve la piece
  this.physics.pause();
  this.player.setTint(0xff0000);
  var timerRestart = this.time.delayedCall(1000,
    function () {
      this.scene.restart();
    },
    null, this);   
  this.player.anims.play("anim_face");
  gameOver = true;
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
  
} 
function tirer(player) {
  
  var coefDir;
	    if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
        // on crée la balle a coté du joueur
        var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y +10, 'bullet3');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;  
        bullet.body.allowGravity =false;
        bullet.setVelocity(200 * coefDir, 0); // vitesse en x et en y
        setTimeout(() => {
          bullet.destroy();
      }, 1100); 
        
 
}  

// fonction déclenchée lorsque uneBalle et uneCible se superposent
function hit (uneBalle, uneCible) {
  uneBalle.destroy(); // destruction de la balle
  uneCible.play("anim_fac3", true);
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