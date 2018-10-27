
const __main = function() {
    const game = Game(30)
    const paddle = Paddle()
    const ball = Ball()

    let paused = false

    const blocks = []
    for (let i = 0; i < 3; i++) {
        const block = Block()
        block.x = 0 + i*120 + 20
        block.y = 100
        blocks.push(block)
    }
    
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
        if (event.key === 'p')
        paused = !paused
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
