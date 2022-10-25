/* ====================== 初始化事件 ===================== */
function initEvent(manRun, man, listener) {
  const keyboardBg = new Sprite();
  keyboardBg.attr({
    size: [380, 270],
    pos: [1500, 780],
    bgcolor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    zIndex: 99,
  });
  layer.append(keyboardBg);

  class KeyButton extends Label {
    constructor(text) {
      super({
        text,
        font: '40px "宋体"',
        fillColor: "#333",
        bgcolor: "#FFFDE6",
        borderRadius: 5,
        width: 80,
        height: 80,
        textAlign: "center",
        lineHeight: 80,
        zIndex: 100,
      });
    }
  }

  function setKey(key, x, y) {
    const button = new KeyButton(key);
    button.attr({
      pos: [x, y],
    });
    ["keydown", "mousedown", "touchstart"].forEach((event) => {
      button.addEventListener(event, (evt) => {
        button.attr({
          bgcolor: "#E8E6D1",
          fillColor: "#333",
        });
      });
    });

    ["keyup", "mouseup", "touchend"].forEach((event) => {
      button.addEventListener(event, (evt) => {
        button.attr({
          bgcolor: "#FFFDE6",
          fillColor: "#333",
        });
      });
    });
    layer.append(button);
    return button;
  }

  let moving = null;

  function moveY(destY) {
    if (listener()) {
      manRun.play();
      const y = man.attr("y");
      if (moving) moving.cancel(true);
      moving = man.animate(
        [
          {
            y,
          },
          {
            y: destY,
          },
        ],
        {
          duration: Math.abs(10 * (y - destY)),
          fill: "forwards",
        }
      );
    } else {
      stopMove();
    }
  }

  function moveX(destX) {
    if (listener()) {
      manRun.play();
      const x = man.attr("x");
      if (moving) moving.cancel(true);
      moving = man.animate(
        [
          {
            x,
          },
          {
            x: destX,
          },
        ],
        {
          duration: Math.abs(10 * (x - destX)),
          fill: "forwards",
        }
      );
    } else {
      stopMove();
    }
  }

  function stopMove() {
    if (moving) {
      moving.cancel(true);
      moving = null;
    }
    manRun.pause();
  }

  const buttonW = setKey("W", 1500 + 380 / 2 - 40, 780 + 40);
  const buttonA = setKey("A", 1500 + 380 / 2 - 40 - 100, 780 + 40 + 100);
  const buttonS = setKey("S", 1500 + 380 / 2 - 40, 780 + 40 + 100);
  const buttonD = setKey("D", 1500 + 380 / 2 - 40 + 100, 780 + 40 + 100);
  ["keydown", "mousedown", "touchstart"].forEach((event) => {
    buttonW.addEventListener(event, moveY.bind(null, -1000));
    buttonA.addEventListener(event, moveX.bind(null, -1000));
    buttonS.addEventListener(event, moveY.bind(null, 3000));
    buttonD.addEventListener(event, moveX.bind(null, 3000));
  });
  ["keyup", "mouseup", "touchend"].forEach((event) => {
    buttonW.addEventListener(event, stopMove);
    buttonA.addEventListener(event, stopMove);
    buttonS.addEventListener(event, stopMove);
    buttonD.addEventListener(event, stopMove);
  });

  document.addEventListener("keydown", (event) => {
    [buttonW, buttonA, buttonS, buttonD].forEach((button) => {
      if (event.key === button.text.toLowerCase()) {
        button.dispatchEvent(event);
      }
    });
  });

  document.addEventListener("keyup", (event) => {
    [buttonW, buttonA, buttonS, buttonD].forEach((button) => {
      if (event.key === button.text.toLowerCase()) {
        button.dispatchEvent(event);
      }
    });
  });
}
