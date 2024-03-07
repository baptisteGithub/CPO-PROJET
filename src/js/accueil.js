export default class accueil extends Phaser.Scene {
    constructor() {
      super({ key: "accueil" }); // mettre le meme nom que le nom de la classe
    }

    preload() {
        this.load.image("img_accueil", "src/assets/img_accueil2.png");
    }
    create(){
        this.physics.world.setBounds(0, 0, 800, 640);
        this.add.image(400, 320, "img_accueil");
    }
    update(){

    }
}