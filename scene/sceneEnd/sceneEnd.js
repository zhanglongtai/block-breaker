// const SceneEnd = function(game) {
//     const s = {
//         game: game,
//     }

//     s.draw = function() {
//         // background
//         // game.context.fillStyle = "#554"
//         // game.context.fillRect(0, 0, 400, 300)

//         game.context.fillText('game over, press R to restart', 100, 200)
//     }

//     game.registerAction('r', () => {
//         scene = SceneTitle(game)
//         game.replaceScene(scene)
//     })

//     s.update = function() {}

//     return s
// }

class SceneEnd extends Scene {
    constructor(game) {
        super(game)

        this.game.registerAction('r', () => {
            const scene = SceneTitle.new(game)
            game.replaceScene(scene)
        })
    }

    draw() {
        // background
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)

        this.game.context.fillText('game over, press R to restart', 100, 200)
    }
}
