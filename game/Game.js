// Generated by CoffeeScript 1.3.3
var addGameView, addTitleView, branchs, canvas, drawBranch, drawGrid, drawSquare, enemyOcupation, g, handleClickity, handleFileLoad, handleLoadComplete, init, manifest, notLegalToDraw, resetGame, stage, startGame, tick, totalLoaded;

totalLoaded = 0;

manifest = [];

canvas = null;

stage = null;

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
  canvas = document.getElementById('gameCanvas');
  stage = new Stage(canvas);
  stage.mouseEventsEnabled = true;
  drawGrid();
  drawBranch();
  Ticker.setFPS(60);
  Ticker.addListener(this);
  return stage.update();
};

handleClickity = function() {
  return drawSquare(stage.mouseX, stage.mouseY);
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
  var d, n, s, s1, s2, t, x, z, _results;
  x = 0;
  t = 0;
  z = 50;
  n = 50;
  g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(1000, 0);
  s1 = new Shape(g);
  stage.addChild(s1);
  g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(0, 1000);
  s2 = new Shape(g);
  stage.addChild(s2);
  while (x < 20) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, z).lineTo(1000, z);
    s = new Shape(g);
    stage.addChild(s);
    x += 1;
    z += 50;
  }
  _results = [];
  while (t < 20) {
    g.setStrokeStyle(1).beginStroke("black").moveTo(n, 0).lineTo(n, 1000);
    d = new Shape(g);
    stage.addChild(d);
    t += 1;
    _results.push(n += 50);
  }
  return _results;
};

notLegalToDraw = function(locx, locy) {
  var index, line, name, path, xMouse, yMouse;
  yMouse = Math.floor(locy / 50);
  xMouse = Math.floor(locx / 50);
  for (name in branchs) {
    path = branchs[name];
    for (index in path) {
      line = path[index];
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

drawSquare = function(locx, locy) {
  var s, xMouse, yMouse;
  yMouse = Math.floor(locy / 50);
  xMouse = Math.floor(locx / 50);
  if (!notLegalToDraw(locx, locy)) {
    g.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRoundRect(xMouse * 50, yMouse * 50, canvas.width / 20, canvas.height / 20, 0);
    s = new Shape(g);
    return stage.addChild(s);
  }
};

drawBranch = function() {
  var index, line, name, path, s, s2, _results;
  _results = [];
  for (name in branchs) {
    path = branchs[name];
    _results.push((function() {
      var _results1;
      _results1 = [];
      for (index in path) {
        line = path[index];
        if (line.y !== line.y2) {
          g.setStrokeStyle(50).beginStroke("blue").moveTo(line.x * 50 + 25, line.y * 50).lineTo(line.x2 * 50 + 25, line.y2 * 50);
          s = new Shape(g);
          _results1.push(stage.addChild(s));
        } else {
          g.setStrokeStyle(50).beginStroke("blue").moveTo(line.x * 50, line.y * 50 + 25).lineTo(line.x2 * 50, line.y2 * 50 + 25);
          s2 = new Shape(g);
          _results1.push(stage.addChild(s2));
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

startGame = function() {};

resetGame = function() {};

tick = function() {
  stage.canvas.onclick = handleClickity;
  return stage.update();
};
