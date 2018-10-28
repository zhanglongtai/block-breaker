// const SceneTitle = function(game) {
//     const s = {
//         game: game,
//     }

//     s.draw = function() {
//         // background
//         // game.context.fillStyle = "#554"
//         // game.context.fillRect(0, 0, 400, 300)

//         game.context.fillText(`game start`, 100, 200)
//     }

//     game.registerAction('Enter', () => {
//         scene = SceneMain(game)
//         game.replaceScene(scene)
//     })

//     s.update = function() {}

//     return s
// }

class SceneTitle extends Scene {
    constructor(game) {
        super(game)

        this.game.registerAction('Enter', () => {
            const scene = SceneMain.new(game)
            game.replaceScene(scene)
        })
    }

    draw() {
        // background
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)

        this.game.context.fillText(`game start`, 100, 200)
    }
}