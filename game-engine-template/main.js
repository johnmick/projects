function startGame(stage, renderer) {
  console.log('Stage', stage);
  console.log('Renderer', renderer);
}

$(window).ready(bootup.call(window, startGame));
