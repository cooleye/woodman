function initGirl() {
  const girl = new Sprite("girl_0.png");
  girl.attr({
    anchor: [0.5, 0.5],
    pos: [1920-120, 140],
    scale: 1.5,
  });
  layer.append(girl);

  const girlRotateAction = function (duration) {
    girl.animate(
      [
        {
          texture: "girl_0.png",
        },
        {
          texture: "girl_1.png",
        },
        {
          texture: "girl_2.png",
        },
        {
          texture: "girl_3.png",
        },
        {
          texture: "girl_4.png",
        },
        {
          texture: "girl_5.png",
        },
        {
          texture: "girl_6.png",
        },
      ],
      {
        duration: duration,
        iterations: 1,
        easing: "step-start",
      }
    );
  };

  // girlRotateAction.pause()

  return girlRotateAction;
}
