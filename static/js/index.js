const {
    Scene,
    Sprite,
    Label, Ring
} = spritejs;
const container = document.getElementById('adaptive');
const scene = new Scene({
    container,
    width: 1200,
    height: 600,
});
const layer = scene.layer();

// 出发位置
const ring = new Ring({
    pos: [140, 450],
    innerRadius: 100,
    outerRadius: 110,
    fillColor: 'red',
});
layer.append(ring);
// 目标位置
const ring2 = ring.cloneNode();
ring2.attr({
    pos: [1090, 170],
    fillColor: 'green',
});
layer.append(ring2);

// 时间倒计时
const countDown = new Label('25');
countDown.attr({
  pos: [520, 20],
  fillColor: '#f00',
  font: 'oblique small-caps bold 100px Arial',
});
layer.append(countDown);

// 开始游戏按钮
const startGameButton = new Label('开始游戏');
startGameButton.attr({
  pos: [500, 250],
  fillColor: '#00f',
  font: 'oblique small-caps bold 50px Arial',
});
layer.append(startGameButton);

const birdsJsonUrl = './static/123.json';
const birdsRes = './static/123.png';

// 初始的播放速度，单位：时间，5s
const initialSpeed = 5000;

// 每次扭头的时长
const Levels = [5000, 4000, 3000, 2000, 1000]
let LevelIndex = 0;
// 总共时长
let TotalTime = 25;

// 玩家是否可以移动
let canPlayerMove = false;
// 游戏状态，false为游戏未开始或者结束，true为游戏已开始
let GameStatus = false;

(async function () {

    await scene.preload([birdsRes, birdsJsonUrl]);

    /*=================girlRotateAction=================*/
    const girlRotateAction = initGirl()

    /*=================man=================*/
    const [man, manRunAction] = initMan()

    /*=================事件初始化=================*/
    initEvent(manRunAction, man, playerListener)

    /*=================获得音效播放控制器=================*/
    const [play123Effect, playShootEffect, playBgMusic] = getAudioController()


    startGameButton.addEventListener('click', () => {
        startGameButton.remove()
        GameStatus = true;

        sprint()

        startCountDown()
    })

    function startCountDown() {

        const timer = setInterval(() => {
            countDown.text = TotalTime
            if (TotalTime > 0 && GameStatus) {
                TotalTime--
            } else {
                GameStatus = false;
                clearInterval(timer)
            }

        }, 1000)
    }

    function sprint() {
        canPlayerMove = true
        play123Effect(Levels[LevelIndex])

        girlRotateAction(Levels[LevelIndex])


        setTimeout(() => {

            if (LevelIndex < Levels.length - 1 && GameStatus) {
                sprint()
                LevelIndex++
            }

        }, Levels[LevelIndex] + 2000)
    }

    // 在间隔时间监听玩家是否移动
    function playerListener() {

        if (GameStatus) {
            // console.log('不许动')
            if (!canPlayerMove || TotalTime <= 0) {
                console.log('awsl')
                playShootEffect()
                man.animate([{
                    texture: 'man_8.png'
                }])
                canPlayerMove = false;
                GameStatus = false;

                // 游戏开始，播放背景音乐
                playBgMusic()

                return false
            } else {
                return true
            }
        } else {
            return false
        }

    }




}());

