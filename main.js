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
        const paddle = Paddle(game)
        const ball = Ball(game)

        blocks = loadLevel(game, 1)

        game.registerAction('ArrowLeft', () => {
            paddle.moveLeft()
        })

        game.registerAction('ArrowRight', () => {
            paddle.moveRight()
        })

        game.registerAction(' ', () => {
            ball.fire()
        })

        game.draw = function() {
            game.drawImage(paddle)
            game.drawImage(ball)
            for (const b of blocks) {
                if (b.alive) {
                    game.drawImage(b)
                }
            }

            game.context.fillText(`score: ${score}`, 10, 300)
        }

        game.update = function() {
            if (!paused) {
                ball.move()

                if (paddle.collide(ball)) {
                    ball.reverse()
                }

                for (const b of blocks) {
                    if (b.collide(ball)) {
                        b.destroy()
                        score += 10
                        ball.reverse()
                    }
                }
            } else {
                return
            }
        }
    })

    enableDebugMode(game, true)
    window.paused = false
}

__main()
