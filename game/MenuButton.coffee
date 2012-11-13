class MenuButton
	constructor: (@x, @y, @width, @height, @color) ->
		
	drawButton: () ->
		uiG.setStrokeStyle(5).beginStroke(@color).beginFill(@color)
			.drawRect(@x, @y, @width, @height)

	handleClick: (mouseX, mouseY) ->
		if mouseX >= @x and mouseX <= @x + @width and mouseY >= @y and mouseY <= @y + @height
			return true
		return false

	tick: () ->
		@drawButton()