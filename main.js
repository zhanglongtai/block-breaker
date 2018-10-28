const loadLevel = function(game, n) {
    level = levels[n - 1]

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
            log(k)
            blocks = loadLevel(game, Number(k))
        }
    })

    document.querySelector('#id-fps-input').addEventListener('input', (event) => {
        const value = event.target.value
        window.fps = Number(value)
    })
}

let blocks
const __main = function() {
    

    let score = 0
    const imgPath = {
        ball: 'ball.png',
        paddle: 'paddle.png',
        block: 'block.png',
    }

    const game = Game(30, imgPath, (gameInstance) => {
        scene = Scene(game)

        game.runWithScene(scene)
    })

    enableDebugMode(game, true)
    window.paused = false
}

__main()
