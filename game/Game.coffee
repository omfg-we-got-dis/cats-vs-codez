# CoffeeScrip
totalLoaded = 0
manifest = []
canvas = null
stage = null
g = new Graphics()

branchs = { 
            "mainBranch": { 
                "color":"red"
                "lines": [{x:0, y:10, x2:20, y2:10}]}
            "secondaryBranch": {
                "color":"blue"
                "lines": [
                             {x:0, y:15, x2:7, y2:15}
                            ,{x:7, y:5, x2:7, y2:16}
                             {x:7, y:5, x2:20, y2:5}]}
            "anotherBranch": {
                "color":"orange"
                "lines": [{x:0, y:2, x2:20, y2:2}]}
          }

init = () -> 
    canvas = document.getElementById('gameCanvas')
    stage = new Stage(canvas)

    stage.mouseEventsEnabled = true

    drawGrid()
    drawBranch()

    Ticker.setFPS(60)
    Ticker.addListener(this)

    stage.update()

handleClickity = () ->
    drawSquare(stage.mouseX, stage.mouseY)

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
    z = 50
    n = 50
   
    g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(1000, 0)
    s1 = new Shape(g)
    stage.addChild(s1)

    g.setStrokeStyle(1).beginStroke("black").moveTo(0, 0).lineTo(0, 1000)
    s2 = new Shape(g)
    stage.addChild(s2)

    while x < 20
        g.setStrokeStyle(1).beginStroke("black").moveTo(0, z).lineTo(1000,z);
        s = new Shape(g)
        stage.addChild(s)
        x += 1
        z += 50

    while t < 20
        g.setStrokeStyle(1).beginStroke("black").moveTo(n, 0).lineTo(n,1000);
        d = new Shape(g)
        stage.addChild(d)
        t += 1
        n += 50

notLegalToDraw = (locx, locy) ->
    yMouse = Math.floor(locy/50)
    xMouse = Math.floor(locx/50)
    for name, path of branchs
        for index, line of path
            if xMouse >= line.x and xMouse <= line.x2 and yMouse >= line.y and yMouse <= line.y2
                return true
                break

    return false

enemyOcupation = (wave) ->
    if wave is 1
        enemies += 1;

drawSquare = (locx, locy) ->
    yMouse = Math.floor(locy/50)
    xMouse = Math.floor(locx/50)
   
    if !notLegalToDraw(locx, locy)
        g.setStrokeStyle(1).beginStroke("red").beginFill("red").drawRoundRect(xMouse*50, yMouse*50, canvas.width / 20, canvas.height / 20, 0);
        s = new Shape(g);
        stage.addChild(s)



drawBranch = () ->
    for name, path of branchs
        for index, line of path
            if line.y != line.y2
                g.setStrokeStyle(50).beginStroke("blue").moveTo(line.x*50 +25, line.y*50).lineTo(line.x2*50+25,line.y2*50)
                s = new Shape(g)
                stage.addChild(s)
            else
                g.setStrokeStyle(50).beginStroke("blue").moveTo(line.x*50, line.y*50+25).lineTo(line.x2*50, line.y2*50+25)
                s2 = new Shape(g)
                stage.addChild(s2)

addGameView = () ->

    console.log("gamederp")
    stage.update()
     
startGame = () ->
    #probably should start the game here

resetGame = () ->
    #reset dis shit

tick = () ->
    stage.canvas.onclick = handleClickity
    stage.update()