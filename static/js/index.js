const {
    Scene,
    Sprite,
    Label
} = spritejs;
const container = document.getElementById('adaptive');
const scene = new Scene({
    container,
    width: 1200,
    height: 600,
});
const layer = scene.layer();

const birdsJsonUrl = '../imgs/123.json';
const birdsRes = '../imgs/123.png';



(async function () {

    await scene.preload([birdsRes, birdsJsonUrl]);

    /*=================girl=================*/
    const girl = new Sprite('girl_0.png');
    girl.attr({
        anchor: [0.5, 0.5],
        pos: [1100, 150],
        scale: 1,
    });
    layer.append(girl);

    // const girlButton = document.getElementById("girl")
    // const manButton = document.getElementById("man")

    const girlRotate = girl.animate([{
        texture: 'girl_0.png'
    },
    {
        texture: 'girl_1.png'
    },
    {
        texture: 'girl_2.png'
    },
    {
        texture: 'girl_3.png'
    },
    {
        texture: 'girl_4.png'
    },
    {
        texture: 'girl_5.png'
    },
    {
        texture: 'girl_6.png'
    },
    {
        texture: 'girl_0.png'
    },
    ], {
        duration: 500,
        iterations: Infinity,
        easing: 'step-end',
    });

    // girlRotate.pause()


    /*=================man=================*/
    const man = new Sprite('man_1.png');
    man.attr({
        anchor: [0.5, 0.5],
        pos: [100, 450],
        scale: [0.6, 2],
    });
    layer.append(man);

    const manRun = man.animate([{
        texture: 'man_1.png'
    },
    {
        texture: 'man_2.png'
    },
    {
        texture: 'man_3.png'
    },
    {
        texture: 'man_4.png'
    },
    {
        texture: 'man_5.png'
    },
    {
        texture: 'man_6.png'
    },
    {
        texture: 'man_7.png'
    },
    {
        texture: 'man_1.png'
    },
    ], {
        duration: 500,
        iterations: Infinity,
        easing: 'step-end',
    });
    manRun.pause()

    /* ======================按键===================== */
    const keyboardBg = new Sprite();
    keyboardBg.attr({
        size: [380, 400],
        pos: [750, 900],
        bgcolor: '#E0CDA3',
        borderRadius: 20,
    });
    layer.append(keyboardBg);

    class KeyButton extends Label {
        constructor(text) {
            super({
                text,
                font: '40px "宋体"',
                fillColor: '#333',
                bgcolor: '#FFFDE6',
                borderRadius: 15,
                width: 80,
                height: 80,
                textAlign: 'center',
                lineHeight: 80,
            });
        }
    }


    function setKey(key, x, y) {
        const button = new KeyButton(key);
        button.attr({
            pos: [x, y],
        });
        ['keydown', 'mousedown', 'touchstart'].forEach((event) => {
            button.addEventListener(event, (evt) => {
                button.attr({
                    bgcolor: '#E8E6D1',
                    fillColor: '#333',
                });
            });
        });

        ['keyup', 'mouseup', 'touchend'].forEach((event) => {
            button.addEventListener(event, (evt) => {
                button.attr({
                    bgcolor: '#FFFDE6',
                    fillColor: '#333',
                });
            });
        });
        layer.append(button);
        return button;
    }

    let moving = null;

    function moveY(destY) {
        manRun.play();
        const y = man.attr('y');
        if (moving) moving.cancel(true);
        moving = man.animate([{
            y
        },
        {
            y: destY
        },
        ], {
            duration: Math.abs(10 * (y - destY)),
            fill: 'forwards',
        });
    }

    function moveX(destX) {
        manRun.play();
        const x = man.attr('x');
        if (moving) moving.cancel(true);
        moving = man.animate([{
            x
        },
        {
            x: destX
        },
        ], {
            duration: Math.abs(10 * (x - destX)),
            fill: 'forwards',
        });
    }

    function stopMove() {
        if (moving) {
            moving.cancel(true);
            moving = null;
        }
        manRun.pause();
    }

    const buttonW = setKey('W', 900, 950);
    const buttonA = setKey('A', 800, 1050);
    const buttonS = setKey('S', 900, 1050);
    const buttonD = setKey('D', 1000, 1050);
    ['keydown', 'mousedown', 'touchstart'].forEach((event) => {
        buttonW.addEventListener(event, moveY.bind(null, -1000));
        buttonA.addEventListener(event, moveX.bind(null, -1000));
        buttonS.addEventListener(event, moveY.bind(null, 3000));
        buttonD.addEventListener(event, moveX.bind(null, 3000));
    });
    ['keyup', 'mouseup', 'touchend'].forEach((event) => {
        buttonW.addEventListener(event, stopMove);
        buttonA.addEventListener(event, stopMove);
        buttonS.addEventListener(event, stopMove);
        buttonD.addEventListener(event, stopMove);
    });

    document.addEventListener('keydown', (event) => {
        [buttonW, buttonA, buttonS, buttonD].forEach((button) => {
            if (event.key === button.text.toLowerCase()) {
                button.dispatchEvent(event);
            }
        });
    });

    document.addEventListener('keyup', (event) => {
        [buttonW, buttonA, buttonS, buttonD].forEach((button) => {
            if (event.key === button.text.toLowerCase()) {
                button.dispatchEvent(event);
            }
        });
    });
}());