class Scene {
    constructor(game, ...args) {
        this.game = game
    }

    static new(game, ...args) {
        const i = new this(game, ...args)
        return i
    }

    draw() {}

    update() {}
}
