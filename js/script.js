let balloonColors = ['red', 'yellow', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.balloon-counter');
let scoreTracker = 0;
let scoreToWin = 100;
let gameOver = false;
let currentBalloon = 1;
let windowShadow = document.querySelector('.window-shadow');
let winCondition = document.querySelector('.win-condition');

function createBalloon(){
  let div = document.createElement('div');
  let randColor = Math.floor(Math.random() * balloonColors.length);
  div.className = 'balloon balloon-' + balloonColors[randColor];

  div.dataset.number = currentBalloon;
  currentBalloon++;

  let randLeft = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = randLeft + 'px';

  body.appendChild(div);
  animateBalloon(div);
}

function playBallPop(){
  let popBall = document.createElement('audio');
  popBall.src = 'sounds/pop.mp3';
  popBall.play();
}

function animateBalloon(elem){
  let frameMove = 0;
  let random = Math.floor(Math.random() * 6 - 3);
  let moveInterval = setInterval(balloonRise, (12 - Math.floor(scoreTracker / 10) + random));

  function balloonRise(){
    if(frameMove >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)){
      clearInterval(moveInterval);
      gameOver = true;
    } else{
      frameMove++;
      elem.style.top = windowHeight - frameMove + 'px';
    }
  }
}

function deleteBalloon(elem){
  elem.remove();
  scoreTracker++;
  updateScore();
  playBallPop();
}

function updateScore(){
  for (let i = 0; i < scores.length; i++){
    scores[i].textContent = scoreTracker;
  }
}

function gameRestart(){
  let balloonsRemove = document.querySelectorAll('.balloon');
  for(let i = 0; i < balloonsRemove.length; i++){
    balloonsRemove[i].remove();
  }
  gameOver = false;
  scoreTracker = 0;
  currentBalloon = 1;
  updateScore();
}

function updateWin(){
  winCondition.textContent = scoreToWin;
}

document.addEventListener('click', function(event){
  if (event.target.classList.contains('balloon')){
    deleteBalloon(event.target);
  }
})

document.querySelector('.restart').addEventListener('click', function(){
  windowShadow.style.display = 'none';
  windowShadow.querySelector('.win').style.display = 'none';
  windowShadow.querySelector('.lose').style.display = 'none';
  gameStart();
})

document.querySelector('.cancel').addEventListener('click', function(){
  windowShadow.style.display = 'none';
})

window.onload = function(){
  updateWin();

  function gameStart(){
    gameRestart();
    let timeout = 0;

    let gameLoop = setInterval(function(){
      timeut = Math.floor(Math.random() * 600 - 100);
      if(!gameOver && scoreTracker !== scoreToWin){
        createBalloon();
      } else if(scoreTracker !== scoreToWin){
        clearInterval(gameLoop);
        windowShadow.style.display = 'flex';
        windowShadow.querySelector('.lose').style.display = 'block';
      } else if(scoreTracker === scoreToWin){
        clearInterval(gameLoop);
        windowShadow.style.display = 'flex';
        windowShadow.querySelector('.win').style.display = 'block';
      }
    }, 800 + timeout);
  }
  gameStart();
}
