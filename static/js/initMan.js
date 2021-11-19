function initMan(){
    const man = new Sprite('man_1.png');
    man.attr({
        anchor: [0.5, 0.5],
        pos: [100, 450],
        scale: [0.6, 2],
    });
    layer.append(man);

    const manRunAction = man.animate([{
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
    manRunAction.pause()

    return [man,manRunAction]
}