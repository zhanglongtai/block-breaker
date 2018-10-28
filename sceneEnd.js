const SceneEnd = function(game) {
    const s = {
        game: game,
    }

    s.draw = function() {
        // background
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)

        game.context.fillText(`game over`, 100, 200)
    }

    s.update = function() {}

    return s
}
