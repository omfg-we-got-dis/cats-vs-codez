var addGameView, addTitleView, blueButton, branchs, buttonArray, canvas, checkSquare, clearScreen, cuubbeee, drawBranch, drawButtons, drawGrid, drawSquares, enemyOcupation, g, greenButton, gridsize, handleClickity, handleFileLoad, handleLoadComplete, i, init, j, makeButtons, manifest, notLegalToDraw, orangeButton, redButton, resetGame, stage, startGame, theColor, tick, totalLoaded, towerGrid, _ref, _ref2;
totalLoaded = 0;
manifest = [];
canvas = null;
stage = null;
theColor = "yellow";
greenButton = null;
orangeButton = null;
redButton = null;
blueButton = null;
gridsize = {
  x: 17,
  y: 13
};
cuubbeee = {
  x: 0.0,
  y: 8.0
};
buttonArray = new Array();
towerGrid = new Array();
for (i = 0, _ref = gridsize.x; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
  towerGrid[i] = new Array();
  for (j = 0, _ref2 = gridsize.y; 0 <= _ref2 ? j <= _ref2 : j >= _ref2; 0 <= _ref2 ? j++ : j--) {
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
        y: 8,
        x2: 17,
        y2: 8
      }
    ]
  },
  "secondaryBranch": {
    "color": "blue",
    "lines": [
      {
        x: 0,
        y: 13,
        x2: 6,
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
    "lines": [
      {
        x: 0,
        y: 2,
        x2: 17,
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
  var button, _i, _len;
  for (_i = 0, _len = buttonArray.length; _i < _len; _i++) {
    button = buttonArray[_i];
    if (button.handleClick(stage.mouseX, stage.mouseY)) {
      theColor = button.color;
      return;
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
enemyOcupation = function(wave) {
  if (wave === 1) {
    return enemies += 1;
  }
};
notLegalToDraw = function(xMouse, yMouse) {
  var index, line, name, path, _ref3;
  if (xMouse > gridsize.x || yMouse > gridsize.y) {
    return true;
  }
  for (name in branchs) {
    path = branchs[name];
    _ref3 = path.lines;
    for (index in _ref3) {
      line = _ref3[index];
      if (xMouse >= line.x && xMouse <= line.x2 && yMouse >= line.y && yMouse <= line.y2) {
        return true;
        break;
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
  var i, j, tg, _ref3, _ref4;
  for (i = 0, _ref3 = gridsize.x; 0 <= _ref3 ? i <= _ref3 : i >= _ref3; 0 <= _ref3 ? i++ : i--) {
    for (j = 0, _ref4 = gridsize.y; 0 <= _ref4 ? j <= _ref4 : j >= _ref4; 0 <= _ref4 ? j++ : j--) {
      tg = towerGrid[i][j];
      if (tg) {
        g.setStrokeStyle(1).beginStroke(tg).beginFill(tg).drawRect(i * 50 + 2, j * 50 + 2, 46, 46, 0);
      }
    }
  }
  g.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRoundRect(cuubbeee.x * 50, cuubbeee.y * 50 + 5, 40, 40, 0);
  cuubbeee.x += 0.1;
  if (cuubbeee.x > 17) {
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
      var _ref3, _results2;
      _ref3 = path.lines;
      _results2 = [];
      for (index in _ref3) {
        line = _ref3[index];
        _results2.push(line.y !== line.y2 ? g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50 + 25, line.y * 50).lineTo(line.x2 * 50 + 25, line.y2 * 50 + 50) : g.setStrokeStyle(50).beginStroke(color).moveTo(line.x * 50, line.y * 50 + 25).lineTo(line.x2 * 50 + 50, line.y2 * 50 + 25));
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
makeButtons = function() {
  var greyButton, pinkButton, purpleButton, yellowButton;
  purpleButton = new MenuButton(900, 0, 100, 100, "purple");
  pinkButton = new MenuButton(900, 200, 100, 100, "pink");
  yellowButton = new MenuButton(900, 400, 100, 100, "yellow");
  greyButton = new MenuButton(900, 600, 100, 100, "grey");
  return buttonArray = [purpleButton, pinkButton, yellowButton, greyButton];
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
  clearScreen();
  drawGrid();
  drawBranch();
  drawButtons();
  drawSquares();
  return stage.update();
};