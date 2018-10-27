const loadLevel = function(n) {
    level = levels[n - 1]

    const blocks = []
    for (const p of level) {
        const block = Block(p)
        blocks.push(block)
    }

    return blocks
}

const __main = function() {
    const game = Game(30)
    const paddle = Paddle()
    const ball = Ball()

    let paused = false

    let blocks = loadLevel(1)
    
    game.registerAction('ArrowLeft', () => {
        paddle.moveLeft()
    })

    game.registerAction('ArrowRight', () => {
        paddle.moveRight()
    })

    game.registerAction(' ', () => {
        ball.fire()
    })

    window.addEventListener('keydown', (event) => {
        const k = event.key
        if (k === 'p') {
            paused = !paused
        } else if ('123456789'.includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })

    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (const b of blocks) {
            if (b.alive) {
                game.drawImage(b)
            }
        }
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
                    ball.reverse()
                }
            }
        } else {
            return
        }
    }
}

__main()
