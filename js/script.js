let canvas;
let world;
let keyboard = new Keyboard();
let play = false;
let timerInterval;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setOnClick();
    mobileControlling();
}

window.addEventListener("keydown", (e) => {
    if (e.key === "a") {
        keyboard.left = true;
    } else if (e.key === "ArrowLeft") {
        keyboard.left = true;
    } else if (e.key === "d") {
        keyboard.right = true;
    } else if (e.key === "ArrowRight") {
        keyboard.right = true;
    } else if (e.key === "s") {
        keyboard.down = true;
    } else if (e.key === "ArrowDown") {
        keyboard.down = true;
    } else if (e.keyCode === 32) {
        keyboard.space = true;
    } else if (e.key === "ArrowUp") {
        keyboard.space = true;
    } else if (e.key === "e") {
        keyboard.shot = true;
    } else if (e.key === "r") {
        keyboard.shortShot = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key === "a") {
        keyboard.left = false;
    } else if (e.key === "ArrowLeft") {
        keyboard.left = false;
    } else if (e.key === "d") {
        keyboard.right = false;
    } else if (e.key === "ArrowRight") {
        keyboard.right = false;
    } else if (e.key === "s") {
        keyboard.down = false;
    } else if (e.key === "ArrowDown") {
        keyboard.down = false;
    } else if (e.keyCode === 32) {
        keyboard.space = false;
    } else if (e.key === "ArrowUp") {
        keyboard.space = false;
    } else if (e.key === "e") {
        keyboard.shot = false;
    } else if (e.key === "r") {
        keyboard.shortShot = false;
    }
})

function mobileControlling() {
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    document.getElementById('mobileLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    document.getElementById('mobileRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    document.getElementById('mobileShot').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.shot = true;
    });

    document.getElementById('mobileSpace').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    });

    document.getElementById('mobileLeft').addEventListener('touchend', (e) => {
        keyboard.left = false;
    });

    document.getElementById('mobileRight').addEventListener('touchend', (e) => {
        keyboard.right = false;
    });

    document.getElementById('mobileShot').addEventListener('touchend', (e) => {
        keyboard.shot = false;
    });

    document.getElementById('mobileSpace').addEventListener('touchend', (e) => {
        keyboard.space = false;
    });
}

function reload() {
    window.location.reload();
}

function setOnClick() {
    document.getElementById('start').addEventListener('click', () => {
        if (!play) {
            startGame();
        } else {
            openCanvas();
        }
    });
}

function closeAll() {
    let startScreen = document.getElementById('startScreen');
    let gameOver = document.getElementById('gameOver');
    let music = document.getElementById('music');
    let settings = document.getElementById('settings');
    let bestPlayer = document.getElementById('bestPlayer');
    let winGame = document.getElementById('winGame');
    let hud = document.getElementById('hud');
    canvas.classList.add('d-none');
    startScreen.classList.add('d-none');
    gameOver.classList.add('d-none');
    music.classList.add('d-none');
    settings.classList.add('d-none');
    bestPlayer.classList.add('d-none');
    winGame.classList.add('d-none');
    hud.classList.add('d-none');
}

function startGame() {
    closeAll();
    canvas.classList.remove('d-none');
    play = true
    startTimer();
    if (mobile()) {
        hud.classList.remove('d-none');
    }
}

function gameOver() {
    let gameOver = document.getElementById('gameOver');
    closeAll();
    gameOver.classList.remove('d-none');
}

function openMusic() {
    closeAll();
    music.classList.remove('d-none');
}

function openSettings() {
    closeAll();
    settings.classList.remove('d-none');
}

function openBestPlayer() {
    closeAll();
    bestPlayer.classList.remove('d-none');
}

function openWinGame() {
    closeAll();
    winGame.classList.remove('d-none');
    winGame.classList.remove('d-none');
}

function openCanvas() {
    closeAll();
    canvas.classList.remove('d-none');
}

startTimer = () => {
    let timer = document.getElementById('timer');

    clearInterval(timerInterval);
    let second = 0,
        minute = 0,
        hour = 0;

    timerInterval = setInterval(function() {
        timer.innerHTML =
            (hour ? hour + ':' : '') +
            (minute < 10 ? '0' + minute : minute) +
            ':' +
            (second < 10 ? '0' + second : second);

        second++;

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);

};

// ------------------------------------------------------

var UD_MENU_OPEN = false;

function buttonAktive() {
    if (menuClosed()) {
        UD_MENU_OPEN = true;
        document.getElementById("ud_menu_icon").classList.add("is-active");
        document.getElementById('info').style = "position: absolute;display: block;";
        document.getElementById('info').classList.remove('menuAnimationClose');
        document.getElementById('info').classList.add('menuAnimationOpen');
    } else {
        UD_MENU_OPEN = false;
        document.getElementById("ud_menu_icon").classList.remove("is-active");
        document.getElementById('info').classList.remove('menuAnimationOpen');
        document.getElementById('info').classList.add('menuAnimationClose');
        setTimeout(() => {
            document.getElementById('info').style = "";
        }, 490);
    }
}

function closeMenu() {
    UD_MENU_OPEN = false
    document.getElementById("ud_menu_icon").classList.remove("is-active");
    document.getElementById('info').classList.remove('menuAnimationOpen');
    document.getElementById('info').classList.add('menuAnimationClose');
    setTimeout(() => {
        document.getElementById('info').style = "";
    }, 490);
}

function menuClosed() {
    return !UD_MENU_OPEN;
}

// ---------------------------------------------------------

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function mobile() {
    return window.innerWidth < 1000;
}