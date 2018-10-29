const loadLevel = function(game, levels, n) {
    const level = levels[n - 1]

    const blocks = []
    for (const p of level) {
        const block = Block(game, p)
        blocks.push(block)
    }
    return blocks
}

const enableDebugMode = function(game, enabled) {
    if (!enabled) {
        return
    }

    window.addEventListener('keydown', (event) => {
        const k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            const scene = SceneMain.new(game, localLevels, Number(k))
            game.replaceScene(scene)
        }
    })

    document.querySelector('#id-fps-input').addEventListener('input', (event) => {
        const value = event.target.value
        window.fps = Number(value)
    })
}

const __main = function() {
    const imgPath = {
        ball: 'img/ball.png',
        paddle: 'img/paddle.png',
        block: 'img/block.png',
    }

    const game = Game.singleInstance(30, imgPath, (gameInstance) => {
        const scene = SceneTitle.new(gameInstance)
        game.runWithScene(scene)
    })

    enableDebugMode(game, true)
    window.paused = false
}

__main()
