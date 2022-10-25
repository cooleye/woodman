
// 背景音乐
// const audio123 = document.getElementById('audio123')

function getAudioController(listener) {

    // 播放背景音乐
    const bgmusic = new Audio()
    // bgmusic.src = './static/audio/123bg.m4a'
    bgmusic.src = 'https://static-66ec94bd-45d4-4b57-bbaf-8a29a25c14fb.bspapp.com/static/audio/123bg.m4a'
    function playBgMusic() {
        console.log(bgmusic.loop)
        bgmusic.loop = true;
        bgmusic.volume = 0.5;
        
        bgmusic.play()
    }

    // 播放木土人音效
    const audio123 = new Audio()
    // audio123.src = './static/audio/123.m4a'
    audio123.src = 'https://static-66ec94bd-45d4-4b57-bbaf-8a29a25c14fb.bspapp.com/static/audio/123.m4a'
    function play123Effect(duration = 5000) {
        audio123.playbackRate = initialSpeed / duration
        audio123.play()
    }
    // 播放射击音效
    const shootEffect = new Audio()
    // shootEffect.src = './static/audio/shoot1.mp3'
    shootEffect.src = 'https://static-66ec94bd-45d4-4b57-bbaf-8a29a25c14fb.bspapp.com/static/audio/shoot1.mp3'
    function playShootEffect() {
        shootEffect.currentTime = 0;
        shootEffect.play()
    }

    // 监听123是否播放结束
    audio123.addEventListener('ended',()=>{
        canPlayerMove = false;
    })
    return [play123Effect, playShootEffect,playBgMusic]
}



