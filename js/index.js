(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const pipeOffset = 100;
    const gravitation = 1.2;

    let bird = new Image();
    let bg = new Image();
    let fg = new Image();
    let pipeUp = new Image();
    let pipeBot = new Image();

    bird.src = 'img/flappy_bird_bird.png';
    bg.src = 'img/flappy_bird_bg.png';
    fg.src = 'img/flappy_bird_fg.png';
    pipeUp.src = 'img/flappy_bird_pipeUp.png';
    pipeBot.src = 'img/flappy_bird_pipeBottom.png';

    // key pres
    document.addEventListener('keydown', (key) => {
          key.keyCode === 32 ? bPy -= 20 : ''
    })
    // key pres end

    // pipe creation
    const pipes = [];
    pipes[0] = {
      x: canvas.width - pipeUp.width,
      y: 0
    };
    // pipe creation end

    // bird position
    let bPx = 10;
    let bPy = canvas.height / 2 + bird.height / 2;
    // bird position end

    const _draw = () => {
      ctx.drawImage(bg, 0, 0);

      pipes.forEach((pipe) => {
          ctx.drawImage(pipeUp, pipe.x, pipe.y);
          ctx.drawImage(pipeBot, pipe.x, pipe.y + pipeUp.height + pipeOffset);

          pipe.x--;

          if (pipe.x === 100) {
              pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
              })
          }

          if (bPx + bird.width >= pipe.x
            && bPx <= pipe.x + pipeUp.width
            && (bPy <= pipe.y + pipeUp.height
            || bPy + bird.height >= pipe.y + pipeUp.height + pipeOffset)
            || bPy + bird.height >= canvas.height - fg.height
            || bPy < 0){
              
              const score = pipes.length - 2 >= 0 ? pipes.length -2 : 0
              const msg = confirm(`You died, you score ${score}. You want try again?`);
              if (msg) {
                location.reload();
              } else {
                window.close()
              }
            }
      })

      ctx.drawImage(fg, 0, canvas.height - fg.height);
      ctx.drawImage(bird, bPx, bPy);

      bPy += gravitation;

      requestAnimationFrame(_draw);
    }

    pipeBot.onload = _draw;
})()
