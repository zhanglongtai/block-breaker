const Game = function(fps) {
    const canvas = document.querySelector('#id-game-interface')
    const ctx = canvas.getContext('2d')

    const g = {
        canvas: canvas,
        context: ctx,
        actions: {},
        keydowns: {},
    }

    g.drawImage = function(imgObj) {
        g.context.drawImage(imgObj.image, imgObj.x, imgObj.y)
    }

    window.addEventListener('keydown', (event) => {
        g.keydowns[event.key] = true
    })

    window.addEventListener('keyup', (event) => {
        g.keydowns[event.key] = false
    })

    g.registerAction = function(keyName, callback) {
        g.actions[keyName] = callback
    }

    // timer
    window.fps = fps
    const runloop = function() {
        // event
        const keyList = Object.keys(g.actions)
        for (const key of keyList) {
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.clientWidth, g.canvas.clientHeight)
        // draw
        g.draw()

        // loop
        setTimeout(runloop, 1000/window.fps)
    }

    setTimeout(runloop, 1000/window.fps)

    return g
}
