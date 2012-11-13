// Generated by CoffeeScript 1.3.3
var addGameView, addTitleView, branchs, canvas, checkSquare, clearScreen, cuubbeee, drawBranch, drawButtons, drawGrid, drawSquares, enemyOcupation, g, handleClickity, handleFileLoad, handleLoadComplete, i, init, j, makeButtons, manifest, notLegalToDraw, resetGame, stage, startGame, theColor, tick, totalLoaded, towerGrid, _i, _j;

totalLoaded = 0;

manifest = [];

canvas = null;

stage = null;

theColor = "yellow";

cuubbeee = {
  x: 0.0,
  y: 10.0
};

towerGrid = new Array();

for (i = _i = 0; _i <= 19; i = ++_i) {
  towerGrid[i] = new Array();
  for (j = _j = 0; _j <= 19; j = ++_j) {
    towerGrid[i][j] = false;
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
        x2: 19,
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
        x2: 6,
        y2: 15
      }, {
        x: 7,
        y: 5,
        x2: 7,
        y2: 15
      }, {
        x: 8,
        y: 5,
        x2: 19,
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
        x2: 19,
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
  makeButtons();
  Ticker.setFPS(30);
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
  while (x <= 20) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, x * 50).lineTo(1000, x * 50);
    x += 1;
  }
  _results = [];
  while (t <= 20) {
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
  if (!notLegalToDraw(locx, locy)) {
    towerGrid[xMouse][yMouse] = theColor;
  }
  return true;
};

drawSquares = function() {
  var tg, _k, _l;
  for (i = _k = 0; _k <= 19; i = ++_k) {
    for (j = _l = 0; _l <= 19; j = ++_l) {
      tg = towerGrid[i][j];
      if (tg) {
        g.setStrokeStyle(1).beginStroke(tg).beginFill(tg).drawRect(i * 50 + 2, j * 50 + 2, canvas.width / 21.73, canvas.height / 20.73, 0);
      }
    }
  }
  g.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRoundRect(cuubbeee.x * 50, cuubbeee.y * 50, canvas.width / 24, canvas.height / 24, 0);
  cuubbeee.x += 0.1;
  if (cuubbeee.x > 20) {
    return cuubbeee.x = 0.0;
  }
};

clearScreen = function() {
  g.clear();
  return g.setStrokeStyle(1).beginStroke("White").beginFill("White").drawRect(0, 0, canvas.width, canvas.height, 0);
};

drawBranch = function() {
  var color, index, line, name, path, _results;
  _results = [];
  for (name in branchs) {
    path = branchs[name];
    color = path.color;
    _results.push((function() {
      var _ref, _results1;
      _ref = path.lines;
      _results1 = [];
      for (index in _ref) {
        line = _ref[index];
        if (line.y !== line.y2) {
          _results1.push(g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50 + 25, line.y * 50).lineTo(line.x2 * 50 + 25, line.y2 * 50 + 50));
        } else {
          _results1.push(g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50, line.y * 50 + 25).lineTo(line.x2 * 50 + 50, line.y2 * 50 + 25));
        }
      }
      return _results1;
    })());
  }
  return _results;
};

addGameView = function() {
  console.log("gamederp");
  return stage.update();
};

makeButtons = function() {};

drawButtons = function() {
  return blah.tick();
};

startGame = function() {};

resetGame = function() {};

tick = function() {
  clearScreen();
  drawButtons();
  drawGrid();
  drawBranch();
  drawSquares();
  return stage.update();
};
