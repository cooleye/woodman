const { Scene, Sprite, Label, Ring } = spritejs;
const container = document.getElementById("adaptive");
const scene = new Scene({
  container,
  width: 1920,
  height: 1080,
});
const layer = scene.layer("gamelayer");
// layer.canvas.style.backgroundColor = "#F00";
layer.timeline.playbackRate += 0.6;
// 出发位置
const ring = new Ring({
  pos: [120, 1080 - 140],
  innerRadius: 200,
  outerRadius: 210,
  fillColor: "red",
});
layer.append(ring);
// 目标位置
const TargetPosition = [1920 - 120, 140];
const ring2 = ring.cloneNode();
ring2.attr({
  pos: TargetPosition,
  fillColor: "green",
});
layer.append(ring2);

// 总共时长
let TotalTime = 30;
// 时间倒计时
const countDown = new Label(TotalTime);
countDown.attr({
  pos: [1920 / 2 - 150, 20],
  fillColor: "#f00",
  font: "oblique small-caps bold 150px Arial",
});
layer.append(countDown);

// 开始游戏按钮
const startGameButton = new Label("开始游戏");

startGameButton.attr({
  pos: [1920 / 2 - 300, 1080 / 2 - 200],
  fillColor: "#00f",
  font: "oblique small-caps bold 150px Arial",
});
layer.append(startGameButton);

const overLable = new Label("通关！");
overLable.attr({
  pos: [1920 / 2 - 150, 300],
  fillColor: "#00f",
  font: "oblique small-caps bold 150px Arial",
});

const woodmanJsonUrl = "./static/123.json";
const woodmanRes = "./static/123.png";

// 每次扭头的时长
const Levels = [5500, 4000, 3000, 2000, 1500, 1000];
const initialSpeed = Levels[0];
let LevelIndex = 0;
// 玩家是否可以移动
let canPlayerMove = false;
// 游戏状态，false为游戏未开始或者结束，true为游戏已开始
let GameStatus = false;

(async function () {
  await scene.preload([woodmanRes, woodmanJsonUrl]);

  /*=================girlRotateAction=================*/
  const girlRotateAction = initGirl();

  /*=================man=================*/
  const [man, manRunAction] = initMan();

  /*=================事件初始化=================*/
  initEvent(manRunAction, man, playerListener);

  /*=================获得音效播放控制器=================*/
  const [play123Effect, playShootEffect, playBgMusic] = getAudioController();
  // 点击开始游戏
  startGameButton.addEventListener("click", () => {
    GameStatus = true;
    // canPlayerMove = true;
    // man.setAttribute("pos", [120, 1080 - 140]);
    man.attr({
      pos: [120, 1080 - 140],
    });
    LevelIndex = 0;
    TotalTime = 30;
    countDown.text = TotalTime;
    startGameButton.remove();
    sprint();
    startCountDown();
    overLable && overLable.remove();
  });
  // 倒计时
  function startCountDown() {
    const timer = setInterval(() => {
      countDown.text = TotalTime;
      if (TotalTime > 0 && GameStatus) {
        TotalTime--;
      } else {
        GameStatus = false;
        clearInterval(timer);

        //时间结束后，检测人的位置
      }
    }, 1000);
  }

  function sprint() {
    canPlayerMove = true;
    play123Effect(Levels[LevelIndex]);

    girlRotateAction(Levels[LevelIndex]);

    setTimeout(() => {
      if (LevelIndex < Levels.length - 1 && GameStatus) {
        sprint();
        LevelIndex++;
      }
    }, Levels[LevelIndex] + 500);
  }

  // 在间隔时间监听玩家是否移动
  function playerListener() {
    if (GameStatus) {
      console.log(1);
      // 检测人物位置 目标位置：[520, 20],半径100
      if (collision(man.worldPosition, TargetPosition)) {
        // console.log("通关！");
        GameStatus = false;
        // 游戏开始，播放背景音乐
        playBgMusic();
        gameClearance(true);
        return false;
      } else {
        console.log(3);
        // console.log('不许动')
        if (!canPlayerMove || TotalTime <= 0) {
          console.log(4);
          console.log("awsl");
          playShootEffect();
          man.animate([
            {
              texture: "man_8.png",
            },
          ]);
          canPlayerMove = false;
          GameStatus = false;

          gameClearance(false);

          // 游戏开始，播放背景音乐
          playBgMusic();

          return false;
        } else {
          console.log(5);
          return true;
        }
      }
    } else {
      return false;
    }
  }

  //   检测是否进去圈内
  function collision(a, b) {
    let [ax, ay] = a;
    let [bx, by] = b;
    let r = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
    if (r <= 200) {
      return true;
    } else {
      return false;
    }
  }
  //   通关
  function gameClearance(bool) {
    if (bool) {
      overLable.text = "通关！";
    } else {
      overLable.text = "失败";
    }
    layer.append(overLable);
    const restartGameButton = new Label("重新开始");
    restartGameButton.attr({
      pos: [1920 / 2 - 250, 1080 / 2],
      fillColor: "#00f",
      font: "oblique small-caps bold 120px Arial",
    });
    layer.append(restartGameButton);
    restartGameButton.addEventListener("click", () => {
      location.href = location.href;
    });
  }
})();
