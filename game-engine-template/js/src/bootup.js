function bootup(callback) {
  var freq = T("pulse", {freq:5, add:880, mul:20}).kr();

  var bootSound = T("sin", {freq:freq, mul:0.5}).play();


  var overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top      = "0px";
  overlay.style.left     = "0px";
  overlay.style.zIndex   = 1000;
  overlay.style.width    = $(window).width()  + "px";
  overlay.style.height   = $(window).height() + "px";
  overlay.style.backgroundColor = "black";
  document.body.appendChild(overlay);


  function initApplication() {
    var cs       = getCanvasSize();
    var app = new PIXI.Application(cs[0], cs[1], pixiApplicationOpts);
    app.renderer.view.id           = "game-container";
    app.renderer.view.style.margin = margin + "px";

    app.renderer.autoResize = true;
    $(window).resize(function() {
      var cs = getCanvasSize();
      app.renderer.resize(cs[0], cs[1]);
    });

    $(app.renderer.view).fadeOut(0);
    document.body.appendChild(app.renderer.view);

    return app;
  }

  function initStage() {
    var stage = new PIXI.Container();
    return stage;
  }

  function initGame() {
    var app = initApplication();
    $(app.renderer.view).fadeIn(fadeInTime);
    $(overlay).fadeOut(staticDisplayTime);
    bootSound.pause();
    callback(app);
  }

  setTimeout(initGame, startLoadTimer);
}
