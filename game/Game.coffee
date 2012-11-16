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

vertical = false

gridsize = {x:17,y:13}
movingCube = {x:0.0,y:3.0}

buttonArray = new Array()
towerGrid = new Array()

epicMap = new Map(gridsize, movingCube)

g = new Graphics()
uiG = new Graphics()

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

    makeButtons()
    drawButtons()
    epicMap.drawNextBranch(2)

    Ticker.setFPS(30)
    Ticker.addListener(this)

    stage.update()

handleClickity = () ->
    for button in buttonArray
        if button.handleClick(uiStage.mouseX, uiStage.mouseY)
                if button.color is "orange"
                    if activeWave <= 2
                        activeWave += 1
                        epicMap.drawNextBranch(activeWave)
                    return
                else
                    theColor = button.color
                    return
    epicMap.checkSquare(stage.mouseX, stage.mouseY)

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

clearScreen = () ->
    g.clear()
    g.setStrokeStyle(1).beginStroke("White").beginFill("White").drawRect(0,0,canvas.width,canvas.height,0)

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
    epicMap.tick()
    stage.update()