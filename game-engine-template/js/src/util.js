function getCanvasSize() {
  return [
    $(window).width()  - margin * 2 - borderSize * 2,
    $(window).height() - margin * 2 - borderSize * 2
  ];
}
