function TitleFont(app, opts) {
  this.text = new PIXI.Text(
    opts.txt, new PIXI.TextStyle(opts.style)
  );
  this.text.anchor = new PIXI.ObservablePoint(null, null, opts.anchor.x, opts.anchor.y);
  app.stage.addChild(this.text);
}
TitleFont.prototype.tick = function(deltaTime) {
  var cs      = getCanvasSize();
  this.text.x = cs[0] / 2;
  this.text.y = cs[1] / 2;
};

var titleText;
function gameTick(deltaTime) {
  titleText.tick();

}

function startGame(app) {
  titleText = new TitleFont(app, titleTextOpts);
  app.ticker.add(gameTick);

  timbre.bpm = 180;

  var synth = T("OscGen", {wave:"tri", mul:0.2});

  T("interval", {interval:"L4", timeout:"15sec"}, function() {
      synth.noteOn(69, 80);
  }).on("ended", function() {
      this.stop();
  }).set({buddies:synth}).start();

  window.app = app;
}

$(window).ready(bootup.call(window, startGame));
