const c = document.getElementById('canvas')
const ctx = c.getContext('2d')

function checkIfBelongsToMandelbrotSet({ x, y, maxIterations }) {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;

    for (let i = 0; i < maxIterations; i++) {
        // Calculate the real and imaginary components of the result separately
        let tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;

        let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;

        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        if (realComponentOfResult * imaginaryComponentOfResult > 5) {
            return i / maxIterations * 100; // In the Mandelbrot set
        }
    }

    return 0; // Not in the set
}

function drawFractal({ magnification, panX, panY, maxIterations = 60 }) {
    for (let i = 0; i < c.width; i++) {
        for (let j = 0; j < c.height; j++) {
            const checkParams = {
                x: i / magnification - panX,
                y: j / magnification - panY,
                maxIterations,
            }

            const belongsToSet = checkIfBelongsToMandelbrotSet({
                ...checkParams
            });

            belongsToSet === 0
                ? ctx.fillStyle = '#000'
                : ctx.fillStyle = `hsl(0, 100%, ${belongsToSet}%)`
                ;

            ctx.fillRect(i, j, 1, 1);
        }
    }
}

const xAxis = document.getElementById('x-axis')
const yAxis = document.getElementById('y-axis')
const magnification = document.getElementById('magnification')

const iterations = document.getElementById('iterations')

let a;

const param = {
    magnification: 200,
    panX: 2,
    panY: 1.5,
    maxIterations: 100,
}

magnification.value = param.magnification
xAxis.value = param.panX
yAxis.value = param.panY

magnification.addEventListener('change', e => {
    param.magnification = e.target.value
})

xAxis.addEventListener('change', e => {
    param.panX = e.target.value
})

yAxis.addEventListener('change', e => {
    param.panY = e.target.value
})

document.getElementById('continue').addEventListener('click', function () {
    anim()
})

document.getElementById('cancel').addEventListener('click', function () {
    cancelAnimationFrame(a)
})

function anim() {
    drawFractal(param)
    a = requestAnimationFrame(anim)
}
anim();
