# CoffeeScrip
totalLoaded = 0
manifest = []

canvas = null
stage = null
uiCanvas = null
uiStage = null

theColor = "yellow"

greenButton = null
orangeButton = null
redButton = null
blueButton = null

theLine = 0
activeWave = 0
direction = {x:0.1,y:0}

vertical = false

gridsize = {x:17,y:13}
movingCube = {x:0.0,y:3.0}

buttonArray = new Array()
towerGrid = new Array()

g = new Graphics()
uiG = new Graphics()

branchs = { 
            "mainBranch": { 
                "color":"red"
                "activeWave":3
                "lines": [{x:0, y:6, x2:17, y2:6}]}
            "secondaryBranch": {
                "color":"blue"
                "activeWave":1
                "lines": [
                             {x:0, y:13, x2:7, y2:13}
                             {x:7, y:13, x2:7, y2:5}
                             {x:7, y:5, x2:17, y2:5}]}
            "anotherBranch": {
                "color":"orange"
                "activeWave":2
                "lines": [{x:0, y:2, x2:17, y2:2}]}
            "reallyWeirdBranch":{
                "color":"grey"
                "activeWave":0
                "lines":[{x:0, y:3, x2:3, y2:3},
                         {x:3, y:4, x2:3, y2:5},
                         {x:3, y:5, x2:2, y2:5},
                         {x:2, y:5, x2:2, y2:8},
                         {x:2, y:8, x2:10, y2:8},
                         {x:10, y:8, x2:10, y2:12},
                         {x:10, y:12, x2: 17, y2:12}]}
          }

init = () -> 
    canvas = document.getElementById('gameCanvas')
    stage = new Stage(canvas)
    shape = new Shape(g)
    stage.addChild(shape)

    uiCanvas = document.getElementById('uiCanvas')
    uiStage = new Stage(uiCanvas)
    uiShape = new Shape(uiG)
    uiStage.addChild(uiShape)

    stage.mouseEventsEnabled = true
    canvas.onclick = handleClickity

    uiStage.mouseEventsEnabled = true
    uiCanvas.onclick = handleClickity

    fillGrid()
    drawGrid()
    makeButtons()
    drawButtons()
    drawNextBranch(2)

    Ticker.setFPS(30)
    Ticker.addListener(this)

    stage.update()

fillGrid = () ->
    for i in [0..gridsize.x]
        towerGrid[i] = new Array()
        for j in [0..gridsize.y]
            towerGrid[i][j] = false

handleClickity = () ->
    for button in buttonArray
        if button.handleClick(uiStage.mouseX, uiStage.mouseY)
                if button.color is "orange"
                    if activeWave <= 2
                        console.log("orange")
                        activeWave += 1
                        drawNextBranch(activeWave)
                    return
                else
                    theColor = button.color
                    return
    checkSquare(stage.mouseX, stage.mouseY)

handleFileLoad = (e) ->
    console.log("handling")
    switch(e.type)
        when PreloadJS.IMAGE
            img = new Image()
            img.src = e.src
            img.onload = handleLoadComplete
            window[e.id] = new Bitmap(img)
            break
        when PreloadJS.SOUND
            handleLoadComplete()
            break

handleLoadComplete = (e) ->
    totalLoaded++
    if manifest.length == totalLoaded
        addTitleView()

addTitleView = () ->


drawGrid = () ->
    x = 0
    t = 0
    while x <= gridsize.y+1
        g.setStrokeStyle(1).beginStroke("black").moveTo(0, x*50).lineTo((gridsize.x+1)*50,x*50);
        x += 1
    while t <= gridsize.x+1
        g.setStrokeStyle(1).beginStroke("black").moveTo(t*50, 0).lineTo(t*50,(gridsize.y+1)*50);
        t += 1
       
enemyOcupation = (thePath) ->
    pathToFollow = branchs[thePath].lines
    n = pathToFollow.length
    movingCube.x += direction.x
    movingCube.y += direction.y
    if (movingCube.x >= pathToFollow[theLine].x2-0.01 and movingCube.x <= pathToFollow[theLine].x2+0.01 and direction.y==0) || (movingCube.y >= pathToFollow[theLine].y2-0.01 and movingCube.y <= pathToFollow[theLine].y2+0.01 and direction.x==0)
        console.log("HERP")
        theLine += 1
        newline = pathToFollow[theLine]
        diffy = (newline.y2-newline.y)
        diffx = (newline.x2-newline.x)
        if diffx == 0
            direction.x = 0
        else 
            direction.x = (diffx / Math.abs(diffx))/10
        if diffy == 0
            direction.y = 0
        else
            direction.y = (diffy / Math.abs(diffy))/10


notLegalToDraw = (xMouse, yMouse) ->
    if xMouse > gridsize.x || yMouse > gridsize.y
        return true
    for name, path of branchs
        active = path.activeWave
        if active <= activeWave
            for index, line of path.lines
                if xMouse >= line.x and xMouse <= line.x2 and yMouse >= line.y and yMouse <= line.y2
                    return true
                    break
    return false

checkSquare = (locx, locy) ->
    yMouse = Math.floor(locy/50)
    xMouse = Math.floor(locx/50)
    if !notLegalToDraw(xMouse, yMouse)
        towerGrid[xMouse][yMouse] = if towerGrid[xMouse][yMouse] then 0 else theColor
    return true

drawSquares = () ->
    for i in [0..gridsize.x]
        for j in [0..gridsize.y]
            tg = towerGrid[i][j]
            if tg
                g.setStrokeStyle(1).beginStroke(tg).beginFill(tg).drawRect(i*50+2, j*50+2, 46, 46, 0);
    g.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRoundRect(movingCube.x*50, movingCube.y*50+5, 40, 40, 0);

clearScreen = () ->
    g.clear()
    g.setStrokeStyle(1).beginStroke("White").beginFill("White").drawRect(0,0,canvas.width,canvas.height,0)

drawNextBranch = (wave) ->
    for name, path of branchs
        color = path.color
        active = path.activeWave
        if active <= wave
            for index, line of path.lines
                if line.y != line.y2
                    g.setStrokeStyle(50).beginStroke(color).moveTo(line.x*50 +25, line.y*50).lineTo(line.x2*50+25,line.y2*50+50)
                else
                    g.setStrokeStyle(50).beginStroke(color).moveTo(line.x*50, line.y*50+25).lineTo(line.x2*50+50, line.y2*50+25)
    
addGameView = () ->
    console.log("gamederp")
    stage.update()

makeButtons = () ->
    purpleButton = new MenuButton(125, 700, 100,100,"purple")
    pinkButton = new MenuButton(250, 700,100,100,"pink")
    yellowButton = new MenuButton(375, 700,100,100,"yellow")
    greyButton = new MenuButton(500,700,100,100,"grey")
    nextWaveButton = new MenuButton(750, 700, 100, 100, "orange")

    buttonArray = [purpleButton, pinkButton, yellowButton, greyButton, nextWaveButton]

drawButtons = () ->
    for button in buttonArray
        button.tick()
     
startGame = () ->
    #probably should start the game here

resetGame = () ->
    #reset dis shit

tick = () ->
    if uiStage
        uiStage.update()

    clearScreen()
    enemyOcupation("reallyWeirdBranch")
    drawGrid()
    drawNextBranch(activeWave)
    drawSquares()
    stage.update()