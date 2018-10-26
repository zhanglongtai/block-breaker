const imgFromPath = function(path) {
    const img = new Image()
    img.src = path

    return img
}

const Paddle = function() {
    const image = imgFromPath('paddle.png')

    const p = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }

    p.moveLeft = function() {
        p.x -= p.speed
    }

    p.moveRight = function() {
        p.x += p.speed
    }

    return p
}

const Game = function() {
    const canvas = document.querySelector('#id-game-interface')
    const ctx = this.canvas.getContext('2d')


    // timer
    setInterval(function() {
        // event
        const keyList = Object.keys(this.keydowns)
        for (const key of keyList) {
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        // draw
        g.draw()
    }, 1000/30)

    const g = {
        canvas: canvas,
        context: ctx,
        actions: {},
        keydowns: {},
    }

    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })

    g.registerAction = function(keyName, callback) {
        this.actions[keyName] = callback
    }

    return g
}

const __main = function() {
    const game = Game()
    const paddle = Paddle()
    
    game.draw = function() {
        game.context.drawImage(paddle.image, paddle.x, paddle.y)
    }

    game.registerAction('ArrowLeft', () => {
        paddle.moveLeft()
    })

    game.registerAction('ArrowRight', () => {
        paddle.moveRight()
    })
}

__main()
