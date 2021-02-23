const ball = document.querySelector('.ball');
const h1Win = document.querySelector('.win');
const h1Lose = document.querySelector('.lose');
const inputBallSize = document.querySelector('.ball-size');
const inputTime = document.querySelector('.time')
const btnStart = document.querySelector('button');
const settingsText = document.querySelectorAll('p');
const inputRepeat = document.querySelector('.repeat');
const results = document.querySelector('span');

let ballRepeats;
let ballSize;
let timeDisplay;
let ballPosX;
let ballPosY;
let statusBall = true;

function gameSettings() {
    h1Win.textContent = "Reflex Testing Game"
    inputBallSize.addEventListener('input', (e) => {
        ballSize = e.target.value;

        if(ballSize > 100) {
            e.target.value = '';
            alert('Maksymalna wartość to 100 pikseli')
        } else {
            ball.style.width = `${ballSize}px`;
            ball.style.height = `${ballSize}px`;
        }
    })

    inputTime.addEventListener('input', (e) => {
        timeDisplay = e.target.value;
        if(timeDisplay < 1) {
            e.target.value = '';
            alert('Minimalna wartość to 1 ms')
        }
    })

    inputRepeat.addEventListener('input', (e) => {
        ballRepeats = e.target.value;
    })
}

function startGame() {
    let counterRepeats = 0;
    let countClick = 0;
    statusBall = true;

    if(inputBallSize.value === '' || inputTime.value === '' || inputRepeat === '') {
        alert('Podaj wszystkie wartości')
        return;
    }
    h1Win.textContent = `Trafiłeś: `
    ball.style.left = ballSize + 'px';
    ball.style.top = ballSize + 'px';
    results.textContent = '';
    settingsText.forEach(setting => setting.remove());
    btnStart.remove();

    let gamePlay = setInterval(() => {
        counterRepeats++;

        if(counterRepeats >= ballRepeats){
            clearInterval(gamePlay);
            settingsText.forEach(element => document.body.appendChild(element));
            document.body.appendChild(btnStart);
            document.body.appendChild(ball);
            inputBallSize.value = '';
            inputRepeat.value = '';
            inputTime.value = '';
            ball.style.top = `75%`;
            ball.style.left = `50%`;
            results.innerHTML = `<h3>Poprzednia gra:</h3> <p>Wymiary: ${ballSize}px / ${ballSize}px --- Czas znikania: ${timeDisplay/1000}s --- Ilość powtórzeń: ${ballRepeats} --- Trafienia: ${countClick}/${ballRepeats}</p>`;
            gameSettings();
            statusBall = false;
            return;
        }

        let randomPosX = Math.floor(Math.random() * window.innerWidth);
        let randomPosY = Math.floor(Math.random() * window.innerHeight);
        ballPosX = randomPosX;
        ballPosY = randomPosY;

        if(ballPosX >= window.innerWidth - ball.offsetWidth){
            ballPosX -= ball.offsetWidth;
        }
        if(ballPosX <= 0 + ball.offsetWidth){
            ballPosX += ball.offsetWidth;
        }
        if(ballPosY >= window.innerHeight - ball.offsetHeight){
            ballPosY -= ball.offsetHeight;
        }
        if(ballPosY <= 0 + ball.offsetHeight){
            ballPosY += ball.offsetWidth;
        }

        ball.style.left = `${ballPosX}px`;
        ball.style.top = `${ballPosY}px`;
        document.body.appendChild(ball);

    }, timeDisplay)

    ball.addEventListener('click', () => {
        if(statusBall) {
            countClick++;
            h1Win.textContent = `Trafiłeś: ${countClick}/${ballRepeats}`;
            ball.remove();
        }
    })
}

btnStart.addEventListener('click', startGame);
gameSettings();