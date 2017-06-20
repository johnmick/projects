var margin            = 10;
var borderSize        = 3;

var fadeInTime        = 1000;
var staticDisplayTime = 500;
var startLoadTimer    = 1500;

var pixiApplicationOpts = {
  antialias:   false,
  transparent: false,
  resolution:  1
};

var titleTextOpts = {
  "txt": "2017 W01",

  "anchor": {
    x: 0.5,
    y: 0.5
  },

  "style": {
    align: "center",
    fontFamily: 'Arial',
    fontSize: 72,
    fontWeight: 'bold',
    fill: ['#FFFFFF', '#C0C0C0'], // gradient
    stroke: '#C080F0',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#808080',
    dropShadowBlur: 8,
    //dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
  }
};
