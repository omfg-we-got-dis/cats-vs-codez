# CoffeeScript
class Map
    @branchs = { 
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

    constructor: (@gridSize, @movingCube) ->
        @fillGrid()
        @direction = {x:0.1,y:0}
        @theLine = 0

    drawGrid: () ->
        horizontalLines = 0
        verticalLines = 0
        while horizontalLines <= @gridSize.y+1
            g.setStrokeStyle(1).beginStroke("black").moveTo(0, horizontalLines*50).lineTo((@gridSize.x+1)*50,horizontalLines*50);
            horizontalLines += 1
        while verticalLines <= @gridSize.x+1
            g.setStrokeStyle(1).beginStroke("black").moveTo(verticalLines*50, 0).lineTo(verticalLines*50,(@gridSize.y+1)*50);
            verticalLines += 1
       
    fillGrid: () ->
        for i in [0..@gridSize.x]
            towerGrid[i] = new Array()
            for j in [0..@gridSize.y]
                towerGrid[i][j] = false

    notLegalToDraw: (xMouse, yMouse) ->
        if xMouse > gridsize.x || yMouse > gridsize.y
            return true

        for name, path of Map.branchs
            active = path.activeWave
            if active <= activeWave
                for index, line of path.lines
                    if xMouse >= line.x and xMouse <= line.x2 and yMouse >= line.y and yMouse <= line.y2
                        return true
                        break
            return false

    checkSquare: (locx, locy) ->
        yMouse = Math.floor(locy/50)
        xMouse = Math.floor(locx/50)
        if !@notLegalToDraw(xMouse, yMouse)
            towerGrid[xMouse][yMouse] = if towerGrid[xMouse][yMouse] then 0 else theColor
        return true

    drawNextBranch: (wave) ->
        for name, path of Map.branchs
            color = path.color
            active = path.activeWave
            if active <= wave
                for index, line of path.lines
                    if line.y != line.y2
                        g.setStrokeStyle(50).beginStroke(color).moveTo(line.x*50 +25, line.y*50).lineTo(line.x2*50+25,line.y2*50+50)
                    else
                        g.setStrokeStyle(50).beginStroke(color).moveTo(line.x*50, line.y*50+25).lineTo(line.x2*50+50, line.y2*50+25)
    
    drawSquares : () ->
        for i in [0..@gridSize.x]
            for j in [0..@gridSize.y]
                tg = towerGrid[i][j]
                if tg
                    g.setStrokeStyle(1).beginStroke(tg).beginFill(tg).drawRect(i*50+2, j*50+2, 46, 46, 0);

    drawEnemies: () ->
        g.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRoundRect(@movingCube.x*50, @movingCube.y*50+5, 40, 40, 0);

    enemyOcupation: (thePath) ->
        pathToFollow = Map.branchs[thePath].lines
        n = pathToFollow.length
        @movingCube.x += @direction.x
        @movingCube.y += @direction.y
        if @movingCube.x < @gridSize.x
            if (@movingCube.x >= pathToFollow[@theLine].x2-0.01 and @movingCube.x <= pathToFollow[@theLine].x2+0.01 and @direction.y==0) or
                    (@movingCube.y >= pathToFollow[@theLine].y2-0.01 and @movingCube.y <= pathToFollow[@theLine].y2+0.01 and @direction.x==0)
                @theLine += 1
                newline = pathToFollow[@theLine]
                diffy = (newline.y2-newline.y)
                diffx = (newline.x2-newline.x)
                if diffx == 0
                    @direction.x = 0
                else 
                    @direction.x = (diffx / Math.abs(diffx))/10
                if diffy == 0
                    @direction.y = 0
                else
                    @direction.y = (diffy / Math.abs(diffy))/10
        else
            @theLine = 0
            @movingCube.x = 0
            @movingCube.y = 3

    tick: () ->
        @drawGrid()
        @drawNextBranch(activeWave)
        @drawSquares()

        @drawEnemies()
        @enemyOcupation("reallyWeirdBranch")

