class MenuButton
	constructor: (@x, @y, @width, @height, @color) ->
		@toChange = false
		@handleClick()
		@drawButton()
		@tick()

	drawButton: () ->
		g.setStrokeStyle(5).beginStroke("black").beginFill("black")
			.drawRect(@x, @y, @width, @height)

	handleClick: () ->
		mouseX = stage.mouseX
		mouseY = stage.mouseY
		
		if mouseX >= @x and mouseX <= @x + @width and mouseY >= @y and mouseY <= @y + @height
			stage.onMouseDown = @changeColor

	changeColor: () ->
		console.log("shitstorm")
		@toChange = true

	isTrue: () ->
		if @toChange
			return true

		return false

	getColor: () ->
		return @color

	tick: () ->
		stage.update()