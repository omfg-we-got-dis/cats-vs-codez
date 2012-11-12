# CoffeeScrip
totalLoaded = 0
manifest = []
canvas = null
stage = null
cuubbeee = {x:0.0,y:10.0}
tgrid = new Array()
for i in [0..19]
    tgrid[i] = new Array()
    for j in [0..19]
        tgrid[i][j] = false

g = new Graphics()

branchs = { 
            "mainBranch": { 
                "color":"red"
                "lines": [{x:0, y:10, x2:19, y2:10}]}
            "secondaryBranch": {
                "color":"blue"
                "lines": [
                             {x:0, y:15, x2:6, y2:15}
                             {x:7, y:5, x2:7, y2:15}
                             {x:8, y:5, x2:19, y2:5}]}
            "anotherBranch": {
                "color":"orange"
                "lines": [{x:0, y:2, x2:19, y2:2}]}
          }

init = () -> 
    canvas = document.getElementById('gameCanvas')
    stage = new Stage(canvas)
    s1 = new Shape(g)
    stage.addChild(s1)

    stage.mouseEventsEnabled = true
    stage.canvas.onclick = handleClickity
    
    drawGrid()
    drawBranch()

    Ticker.setFPS(30)
    Ticker.addListener(this)

    stage.update()

handleClickity = () ->
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
    titleContainer = new Container()
    titleContainer.add(title, start, options)
    stage.addChild(titleContainer)
    stage.addChild(grid)
    pirateTest.onPress = addGameView
    stage.update()

drawGrid = () ->
    x = 0
    t = 0
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(1000, 0)
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(0, 1000)
    while x <= 20
        g.setStrokeStyle(1).beginStroke("black").moveTo(0, x*50).lineTo(1000,x*50);
        x += 1

    while t <= 20
        g.setStrokeStyle(1).beginStroke("black").moveTo(t*50, 0).lineTo(t*50,1000);
        t += 1

notLegalToDraw = (locx, locy) ->
    yMouse = Math.floor(locy/50)
    xMouse = Math.floor(locx/50)
    for name, path of branchs
        for index, line of path.lines
            if xMouse >= line.x and xMouse <= line.x2 and yMouse >= line.y and yMouse <= line.y2
                return true
                break

    return false

enemyOcupation = (wave) ->
    if wave is 1
        enemies += 1;

checkSquare = (locx, locy) ->
    yMouse = Math.floor(locy/50)
    xMouse = Math.floor(locx/50)
    if !notLegalToDraw(locx, locy)
        tgrid[xMouse][yMouse] = !tgrid[xMouse][yMouse]
    return true

drawSquares = () ->
    for i in [0..19]
        for j in [0..19]
            if tgrid[i][j]
                g.setStrokeStyle(1).beginStroke("yellow").beginFill("yellow").drawRoundRect(i*50, j*50, canvas.width / 20, canvas.height / 20, 0);
    g.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRoundRect(cuubbeee.x*50, cuubbeee.y*50, canvas.width / 24, canvas.height / 24, 0);
    cuubbeee.x += 0.1
    if cuubbeee.x > 20 then cuubbeee.x = 0.0



clearScreen = () ->
    g.clear()
    g.setStrokeStyle(1).beginStroke("White").beginFill("White").drawRect(0,0,canvas.width,canvas.height,0)


drawBranch = () ->
    for name, path of branchs
        color = path.color
        for index, line of path.lines
            if line.y != line.y2
                g.setStrokeStyle(50).beginStroke(color).moveTo(line.x*50 +25, line.y*50).lineTo(line.x2*50+25,line.y2*50+50)
            else
                g.setStrokeStyle(50).beginStroke(color).moveTo(line.x*50, line.y*50+25).lineTo(line.x2*50+50, line.y2*50+25)

addGameView = () ->

    console.log("gamederp")
    stage.update()
     
startGame = () ->
    #probably should start the game here

resetGame = () ->
    #reset dis shit

tick = () ->
    clearScreen()
    drawGrid()
    drawBranch()
    drawSquares()
    stage.update()