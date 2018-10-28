const log = function(input) {
    // const el = document.querySelector('#id-log')
    // el.value = el.value + '\n' + input
    console.log.bind(console)
}

const imgFromPath = function(path) {
    const img = new Image()
    img.src = path

    return img
}

const rectIntersects = function(a, b) {
    if (b.y > a.y && b.y < a.image.height + a.y) {
        if (b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }

    return false
}
