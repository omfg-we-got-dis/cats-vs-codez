
/* -------------------------------------------------------------------------
 * !!! AUTOMATICALLY GENERATED CODE !!!
 * -------------------------------------------------------------------------
 * This file was automatically generated by the OrangeBits compiler.  
 * Compiled on:  11/13/2012 6:35:39 PM
 * Compiled by: vestben-PC\vestben
 * Source: C:\Users\vestben\Documents\GitHub\cats-vs-codez\game\MenuButton.coffee      
 * -------------------------------------------------------------------------*/


var MenuButton;

MenuButton = (function() {

  function MenuButton(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  MenuButton.prototype.drawButton = function() {
    return uiG.setStrokeStyle(5).beginStroke(this.color).beginFill(this.color).drawRect(this.x, this.y, this.width, this.height);
  };

  MenuButton.prototype.handleClick = function(mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
      return true;
    }
    return false;
  };

  MenuButton.prototype.tick = function() {
    return this.drawButton();
  };

  return MenuButton;

})();
