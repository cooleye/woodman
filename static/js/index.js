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

const birdsJsonUrl = './static/123.json';
const birdsRes = './static/123.png';


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
        duration: 2000,
        iterations: 1,
        easing: 'step-end',
    });

    girlRotate.pause()


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

    // 事件初始化
    initEvent(manRun,man)

    // 背景音乐
    const audio123 = document.getElementById('audio123')

   

    const startGame = document.getElementById('start-game')
    startGame.addEventListener('click',() =>{
        startGame.style.display = 'none'
        audio123.play()

        girlRotate.play()
    })
}());