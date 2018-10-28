const Game = function(fps, imgToLoad, loadedCallback) {
    const canvas = document.querySelector('#id-game-interface')
    const ctx = canvas.getContext('2d')

    const g = {
        canvas: canvas,
        context: ctx,
        actions: {},
        keydowns: {},
        imgList: {},
        scene: null,
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

    g.draw = function() {
        g.scene.draw()
    }

    g.update = function() {
        g.scene.update()
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

    // load image
    const loadedList = []
    const component = Object.keys(imgToLoad)
    for (const imgName of component) {
        const img = new Image()
        img.src = imgToLoad[imgName]

        img.onload = function() {
            // store img
            g.imgList[imgName] = img
            // valid all img loaded
            loadedList.push(1)
            if (loadedList.length === component.length) {
                g.__init()
            }
        }
    }

    g.imgByName = function(name) {
        const img = g.imgList[name]

        const o = {
            image: img,
            width: img.width,
            height: img.height,
        }

        return o
    }

    g.runWithScene = function(scene) {
        g.scene = scene

        // start game
        setTimeout(runloop, 1000/window.fps)
    }

    g.replaceScene = function(scene) {
        g.scene = scene
    }

    g.__init = function() {
        loadedCallback(g)
    }

    return g
}
