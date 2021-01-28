const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let Pulando = false;
let GameOver = false;
let posicao = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!Pulando) {
      pula();
    }
  }
}

function pula() {
  Pulando = true;

  let intervaloCima = setInterval(() => {
    if (posicao >= 150) {
      // Descendo
      clearInterval(intervaloCima);

      let intervaloBaixo = setInterval(() => {
        if (posicao <= 0) {
          clearInterval(intervaloBaixo);
          Pulando = false;
        } else {
          posicao -= 20;
          dino.style.bottom = posicao + 'px';
        }
      }, 20);
    } else {
      // Subindo
      posicao += 20;
      dino.style.bottom = posicao + 'px';
    }
  }, 20);
}

function criaCactus() {
  const cactus = document.createElement('div');
  let posicaoCactus = 1000;
  let randomTime = Math.random() * 6000;

  if (GameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = posicaoCactus + 'px';

  let temporizadorCactus = setInterval(() => {
    if (posicaoCactus < -60) {
      // Saiu da tela
      clearInterval(temporizadorCactus);
      background.removeChild(cactus);
    } else if (posicaoCactus > 0 && posicaoCactus < 60 && posicao < 60) {
      // Game over
      clearInterval(temporizadorCactus);
      GameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      posicaoCactus -= 10;
      cactus.style.left = posicaoCactus + 'px';
    }
  }, 20);

  setTimeout(criaCactus, randomTime);
}

criaCactus();
document.addEventListener('keyup', handleKeyUp);
