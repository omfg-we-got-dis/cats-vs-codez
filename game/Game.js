var activeWave, addGameView, addTitleView, blueButton, branchs, buttonArray, canvas, checkSquare, clearScreen, direction, drawButtons, drawGrid, drawNextBranch, drawSquares, enemyOcupation, fillGrid, g, greenButton, gridsize, handleClickity, handleFileLoad, handleLoadComplete, init, isVertical, makeButtons, manifest, movingCube, notLegalToDraw, orangeButton, redButton, resetGame, stage, startGame, theColor, theLine, tick, totalLoaded, towerGrid, uiCanvas, uiG, uiStage, vertical;
totalLoaded = 0;
manifest = [];
canvas = null;
stage = null;
uiCanvas = null;
uiStage = null;
theColor = "yellow";
greenButton = null;
orangeButton = null;
redButton = null;
blueButton = null;
theLine = 0;
activeWave = 0;
direction = {
  x: 0.1,
  y: 0
};
vertical = false;
gridsize = {
  x: 17,
  y: 13
};
movingCube = {
  x: 0.0,
  y: 3.0
};
buttonArray = new Array();
towerGrid = new Array();
g = new Graphics();
uiG = new Graphics();
branchs = {
  "mainBranch": {
    "color": "red",
    "activeWave": 3,
    "lines": [
      {
        x: 0,
        y: 6,
        x2: 17,
        y2: 6
      }
    ]
  },
  "secondaryBranch": {
    "color": "blue",
    "activeWave": 1,
    "lines": [
      {
        x: 0,
        y: 13,
        x2: 7,
        y2: 13
      }, {
        x: 7,
        y: 5,
        x2: 7,
        y2: 13
      }, {
        x: 8,
        y: 5,
        x2: 17,
        y2: 5
      }
    ]
  },
  "anotherBranch": {
    "color": "orange",
    "activeWave": 2,
    "lines": [
      {
        x: 0,
        y: 2,
        x2: 17,
        y2: 2
      }
    ]
  },
  "reallyWeirdBranch": {
    "color": "grey",
    "activeWave": 0,
    "lines": [
      {
        x: 0,
        y: 3,
        x2: 3,
        y2: 3
      }, {
        x: 3,
        y: 4,
        x2: 3,
        y2: 5
      }, {
        x: 3,
        y: 5,
        x2: 2,
        y2: 5
      }, {
        x: 2,
        y: 5,
        x2: 2,
        y2: 8
      }, {
        x: 2,
        y: 8,
        x2: 10,
        y2: 8
      }, {
        x: 10,
        y: 8,
        x2: 10,
        y2: 12
      }, {
        x: 10,
        y: 12,
        x2: 17,
        y2: 12
      }
    ]
  }
};
init = function() {
  var shape, uiShape;
  canvas = document.getElementById('gameCanvas');
  stage = new Stage(canvas);
  shape = new Shape(g);
  stage.addChild(shape);
  uiCanvas = document.getElementById('uiCanvas');
  uiStage = new Stage(uiCanvas);
  uiShape = new Shape(uiG);
  uiStage.addChild(uiShape);
  stage.mouseEventsEnabled = true;
  canvas.onclick = handleClickity;
  uiStage.mouseEventsEnabled = true;
  uiCanvas.onclick = handleClickity;
  fillGrid();
  drawGrid();
  makeButtons();
  drawButtons();
  drawNextBranch(2);
  Ticker.setFPS(30);
  Ticker.addListener(this);
  return stage.update();
};
fillGrid = function() {
  var i, j, _ref, _results;
  _results = [];
  for (i = 0, _ref = gridsize.x; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
    towerGrid[i] = new Array();
    _results.push((function() {
      var _ref2, _results2;
      _results2 = [];
      for (j = 0, _ref2 = gridsize.y; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
        _results2.push(towerGrid[i][j] = false);
      }
      return _results2;
    })());
  }
  return _results;
};
handleClickity = function() {
  var button, _i, _len;
  for (_i = 0, _len = buttonArray.length; _i < _len; _i++) {
    button = buttonArray[_i];
    if (button.handleClick(uiStage.mouseX, uiStage.mouseY)) {
      if (button.color === "orange") {
        if (activeWave <= 2) {
          console.log("orange");
          activeWave += 1;
          drawNextBranch(activeWave);
        }
        return;
      } else {
        theColor = button.color;
        return;
      }
    }
  }
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
addTitleView = function() {};
drawGrid = function() {
  var t, x, _results;
  x = 0;
  t = 0;
  while (x <= gridsize.y + 1) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, x * 50).lineTo((gridsize.x + 1) * 50, x * 50);
    x += 1;
  }
  _results = [];
  while (t <= gridsize.x + 1) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(t * 50, 0).lineTo(t * 50, (gridsize.y + 1) * 50);
    _results.push(t += 1);
  }
  return _results;
};
isVertical = function(thePath, line) {
  var pathToFollow, yNext, yOrig;
  pathToFollow = branchs[thePath].lines;
  yOrig = pathToFollow[line].y;
  yNext = pathToFollow[line].y2;
  if (yOrig !== yNext) {
    console.log("FUCK");
    return true;
  }
  return false;
};
enemyOcupation = function(thePath) {
  var diffx, diffy, n, newline, pathToFollow;
  pathToFollow = branchs[thePath].lines;
  n = pathToFollow.length;
  console.log(movingCube.x);
  movingCube.x += direction.x;
  movingCube.y += direction.y;
  if ((movingCube.x === pathToFollow[theLine].x2 && direction.y === 0) || (movingCube.y === pathToFollow[theLine].y2 && direction.x === 0)) {
    console.log("HERP");
    theLine++;
    newline = pathToFollow[theLine];
    diffy = newline.y2 - newline.y;
    diffx = newline.x2 - newline.x;
    direction.x = (diffx / Math.abs(diffx)) / 10;
    return direction.y = (diffy / Math.abs(diffy)) / 10;
  }
};
notLegalToDraw = function(xMouse, yMouse) {
  var active, index, line, name, path, _ref;
  if (xMouse > gridsize.x || yMouse > gridsize.y) {
    return true;
  }
  for (name in branchs) {
    path = branchs[name];
    active = path.activeWave;
    if (active <= activeWave) {
      _ref = path.lines;
      for (index in _ref) {
        line = _ref[index];
        if (xMouse >= line.x && xMouse <= line.x2 && yMouse >= line.y && yMouse <= line.y2) {
          return true;
          break;
        }
      }
    }
  }
  return false;
};
checkSquare = function(locx, locy) {
  var xMouse, yMouse;
  yMouse = Math.floor(locy / 50);
  xMouse = Math.floor(locx / 50);
  if (!notLegalToDraw(xMouse, yMouse)) {
    towerGrid[xMouse][yMouse] = towerGrid[xMouse][yMouse] ? 0 : theColor;
  }
  return true;
};
drawSquares = function() {
  var i, j, tg, _ref, _ref2;
  for (i = 0, _ref = gridsize.x; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
    for (j = 0, _ref2 = gridsize.y; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
      tg = towerGrid[i][j];
      if (tg) {
        g.setStrokeStyle(1).beginStroke(tg).beginFill(tg).drawRect(i * 50 + 2, j * 50 + 2, 46, 46, 0);
      }
    }
  }
  return g.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRoundRect(movingCube.x * 50, movingCube.y * 50 + 5, 40, 40, 0);
};
clearScreen = function() {
  g.clear();
  return g.setStrokeStyle(1).beginStroke("White").beginFill("White").drawRect(0, 0, canvas.width, canvas.height, 0);
};
drawNextBranch = function(wave) {
  var active, color, index, line, name, path, _results;
  _results = [];
  for (name in branchs) {
    path = branchs[name];
    color = path.color;
    active = path.activeWave;
    _results.push((function() {
      var _ref, _results2;
      if (active <= wave) {
        _ref = path.lines;
        _results2 = [];
        for (index in _ref) {
          line = _ref[index];
          _results2.push(line.y !== line.y2 ? g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50 + 25, line.y * 50).lineTo(line.x2 * 50 + 25, line.y2 * 50 + 50) : g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50, line.y * 50 + 25).lineTo(line.x2 * 50 + 50, line.y2 * 50 + 25));
        }
        return _results2;
      }
    })());
  }
  return _results;
};
addGameView = function() {
  console.log("gamederp");
  return stage.update();
};
makeButtons = function() {
  var greyButton, nextWaveButton, pinkButton, purpleButton, yellowButton;
  purpleButton = new MenuButton(125, 700, 100, 100, "purple");
  pinkButton = new MenuButton(250, 700, 100, 100, "pink");
  yellowButton = new MenuButton(375, 700, 100, 100, "yellow");
  greyButton = new MenuButton(500, 700, 100, 100, "grey");
  nextWaveButton = new MenuButton(750, 700, 100, 100, "orange");
  return buttonArray = [purpleButton, pinkButton, yellowButton, greyButton, nextWaveButton];
};
drawButtons = function() {
  var button, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = buttonArray.length; _i < _len; _i++) {
    button = buttonArray[_i];
    _results.push(button.tick());
  }
  return _results;
};
startGame = function() {};
resetGame = function() {};
tick = function() {
  if (uiStage) {
    uiStage.update();
  }
  clearScreen();
  enemyOcupation("reallyWeirdBranch");
  drawGrid();
  drawNextBranch(activeWave);
  drawSquares();
  return stage.update();
};