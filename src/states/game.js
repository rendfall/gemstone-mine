import Phaser from 'phaser'

export default class GameState extends Phaser.State {
    constructor () {
        super({ key: 'GameState' });
    }

    init() {}

    preload() {}

    update() {}

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = "#333";
    }
}
