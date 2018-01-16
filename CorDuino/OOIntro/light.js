var five = require("johnny-five");

module.exports = function(pin){
  var light = new five.Pin(pin);

  this.on = function(){
    console.log('on...');
    light.high();
  }
  this.off = function(){
    console.log('off...')

    light.low();
  }
}
