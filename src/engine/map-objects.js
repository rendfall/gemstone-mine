export default class MapObjects {
    totalGems = 0;
    gemCollected = 0;
    exitTile = null;
    scoreBoard = null;

    constructor(game, map) {
        this.game = game;
        this.map = map;
    }

    setupScoreBoard() {
        this.scoreBoard = this.game.add.text(5, 0, '', {
            fontSize: '24px',
            fill: '#fff'
        });

        this.updateScoreBoard();
    }

    updateScoreBoard() {
        let staticText = 'Gem collected: ';
        let gemCollected = String(this.gemCollected);
        let totalGems = String(this.totalGems);
        let doorText = '';

        if (this.isEnoughGemsCollected()) {
            doorText = '| Go to exit !!';
            this.scoreBoard.addColor('#34c624', 16);
            this.scoreBoard.addColor('#fff', 22);
        }

        this.scoreBoard.text = `${staticText} ${gemCollected} / ${totalGems} ${doorText}`;
    }

    reset() {
        this.totalGems = 0;
        this.gemCollected = 0;
    }

    addGem() {
        this.totalGems++;
    }

    addExit(tile) {
        this.exitTile = tile;
    }

    pickupGem(tile) {
        this.gemCollected++;
        this.map.removeTile(tile.x, tile.y, 'objects');

        if (this.isEnoughGemsCollected()) {
            this.openExit();
        }

        this.updateScoreBoard();
    }

    isEnoughGemsCollected() {
        let percentPickedUp = (this.gemCollected / this.totalGems);
        return this.totalGems > 0
            && (percentPickedUp >= 0.75);
    }

    openExit() {
        // TODO(rendfall): How to get open exit tile index?
        this.map.replace(this.exitTile.index, 7, this.exitTile.x, this.exitTile.y, 1, 1, 'objects');
    }

    tryExit() {
        if (this.isEnoughGemsCollected()) {
            console.log('You did it! You can go to next level');
        } else {
            console.log('The exit is closed. Collect more gems');
        }
    }
}
