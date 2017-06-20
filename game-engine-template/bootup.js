function bootup(callback) {
  function getCanvasSize() {
    return [
      $(window).width()  - margin * 2,
      $(window).height() - margin * 2
    ];
  }

  function initRenderer() {
    var cs       = getCanvasSize();
    var renderer = PIXI.autoDetectRenderer(
      cs[0], cs[1], pixiRendererOpts
    );
    renderer.view.id           = "game-container";
    renderer.view.style.margin = margin + "px";

    renderer.autoResize = true;
    $(window).resize(function() {
      var cs = getCanvasSize();
      renderer.resize(cs[0], cs[1]);
    });

    $(renderer.view).fadeOut(0);
    document.body.appendChild(renderer.view);

    return renderer;
  }

  function initStage() {
    var stage = new PIXI.Container();
    return stage;
  }

  function initGame() {
    var renderer = initRenderer();
    var stage    = initStage();

    renderer.render(stage);
    $(renderer.view).fadeIn(fadeInTime);

    callback(stage, renderer);
  }

  setTimeout(initGame, staticDisplayTime);
}
