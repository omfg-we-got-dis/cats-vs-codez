var addGameView, addTitleView, branchs, canvas, checkSquare, clearScreen, drawBranch, drawGrid, drawSquares, enemyOcupation, g, handleClickity, handleFileLoad, handleLoadComplete, i, init, j, manifest, notLegalToDraw, resetGame, stage, startGame, tgrid, tick, totalLoaded;
totalLoaded = 0;
manifest = [];
canvas = null;
stage = null;
tgrid = new Array();
for (i = 0; i <= 19; i++) {
  tgrid[i] = new Array();
  for (j = 0; j <= 19; j++) {
    tgrid[i][j] = false;
  }
}
g = new Graphics();
branchs = {
  "mainBranch": {
    "color": "red",
    "lines": [
      {
        x: 0,
        y: 10,
        x2: 20,
        y2: 10
      }
    ]
  },
  "secondaryBranch": {
    "color": "blue",
    "lines": [
      {
        x: 0,
        y: 15,
        x2: 7,
        y2: 15
      }, {
        x: 7,
        y: 5,
        x2: 7,
        y2: 16
      }, {
        x: 7,
        y: 5,
        x2: 20,
        y2: 5
      }
    ]
  },
  "anotherBranch": {
    "color": "orange",
    "lines": [
      {
        x: 0,
        y: 2,
        x2: 20,
        y2: 2
      }
    ]
  }
};
init = function() {
  var s1;
  canvas = document.getElementById('gameCanvas');
  stage = new Stage(canvas);
  s1 = new Shape(g);
  stage.addChild(s1);
  stage.mouseEventsEnabled = true;
  stage.canvas.onclick = handleClickity;
  drawGrid();
  drawBranch();
  Ticker.setFPS(60);
  Ticker.addListener(this);
  return stage.update();
};
handleClickity = function() {
  return checkSquare(stage.mouseX, stage.mouseY);
};
handleFileLoad = function(e) {
  var img;
  console.log("handling");
  switch (e.type) {
    case PreloadJS.IMAGE:
      img = new Image();
      img.src = e.src;
      img.onload = handleLoadComplete;
      window[e.id] = new Bitmap(img);
      break;
    case PreloadJS.SOUND:
      handleLoadComplete();
      break;
  }
};
handleLoadComplete = function(e) {
  totalLoaded++;
  if (manifest.length === totalLoaded) {
    return addTitleView();
  }
};
addTitleView = function() {
  var titleContainer;
  titleContainer = new Container();
  titleContainer.add(title, start, options);
  stage.addChild(titleContainer);
  stage.addChild(grid);
  pirateTest.onPress = addGameView;
  return stage.update();
};
drawGrid = function() {
  var t, x, _results;
  x = 0;
  t = 0;
  g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(1000, 0);
  g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(0, 1000);
  while (x < 20) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, x * 50).lineTo(1000, x * 50);
    x += 1;
  }
  _results = [];
  while (t < 20) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(t * 50, 0).lineTo(t * 50, 1000);
    _results.push(t += 1);
  }
  return _results;
};
notLegalToDraw = function(locx, locy) {
  var index, line, name, path, xMouse, yMouse, _ref;
  yMouse = Math.floor(locy / 50);
  xMouse = Math.floor(locx / 50);
  for (name in branchs) {
    path = branchs[name];
    _ref = path.lines;
    for (index in _ref) {
      line = _ref[index];
      if (xMouse >= line.x && xMouse <= line.x2 && yMouse >= line.y && yMouse <= line.y2) {
        return true;
        break;
      }
    }
  }
  return false;
};
enemyOcupation = function(wave) {
  if (wave === 1) {
    return enemies += 1;
  }
};
checkSquare = function(locx, locy) {
  var xMouse, yMouse;
  yMouse = Math.floor(locy / 50);
  xMouse = Math.floor(locx / 50);
  if (!notLegalToDraw(locx, locy) && !tgrid[xMouse][yMouse]) {
    g.setStrokeStyle(1).beginStroke("yellow").beginFill("yellow").drawRoundRect(xMouse * 50, yMouse * 50, canvas.width / 20, canvas.height / 20, 0);
    tgrid[xMouse][yMouse] = true;
  }
  return true;
};
drawSquares = function() {
  var i, j, _results;
  _results = [];
  for (i = 0; i <= 19; i++) {
    _results.push((function() {
      var _results2;
      _results2 = [];
      for (j = 0; j <= 19; j++) {
        _results2.push(tgrid[i][j] ? g.setStrokeStyle(1).beginStroke("yellow").beginFill("yellow").drawRoundRect(i * 50, j * 50, canvas.width / 20, canvas.height / 20, 0) : void 0);
      }
      return _results2;
    })());
  }
  return _results;
};
clearScreen = function() {
  return g.setStrokeStyle(1).beginStroke("White").beginFill("White").drawRect(0, 0, canvas.width, canvas.height, 0);
};
drawBranch = function() {
  var color, index, line, name, path, _results;
  _results = [];
  for (name in branchs) {
    path = branchs[name];
    color = path.color;
    _results.push((function() {
      var _ref, _results2;
      _ref = path.lines;
      _results2 = [];
      for (index in _ref) {
        line = _ref[index];
        _results2.push(line.y !== line.y2 ? g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50 + 25, line.y * 50).lineTo(line.x2 * 50 + 25, line.y2 * 50) : g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50, line.y * 50 + 25).lineTo(line.x2 * 50, line.y2 * 50 + 25));
      }
      return _results2;
    })());
  }
  return _results;
};
addGameView = function() {
  console.log("gamederp");
  return stage.update();
};
startGame = function() {};
resetGame = function() {};
tick = function() {
  return stage.update();
};