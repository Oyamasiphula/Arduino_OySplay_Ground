var five = require("johnny-five");
var board = new five.Board();

var Light = function(pin){
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

var BlinkingLight = function(pin, speed){
   var state = false;
   var interval;
   Light.call(this, pin);
   var blinkOn = this.on;
   var blinkOff = this.off;
   this.blinkOn = function(){
     interval = setInterval(function(){
       if(state === false){
         blinkOn();
         state = true;
       }
       else if (state === true){
         blinkOff();
         state = false;
       }
     }, speed);
  };
  this.blinkOff = function(){
    clearInterval(interval);
    blinkOff();
  };
}

var LightSwitch = function(light){

  this.switchOff = function(){
    light.off();
  }

  this.switchOn = function(){
    light.on();
  }
}

board.on('ready', function(){

  /*var light = new Light(9);
  var light2 = new Light(10);
  light.on();
  light.off(1000);*/

  var light = new Light(9);
  var blinking2 = new BlinkingLight(10, 1000);
  var lightSwitch = new LightSwitch(light);

  lightSwitch.switchOn();
  blinking2.blinkOn();



  setTimeout(function(){
    lightSwitch.switchOff();
    blinking2.blinkOff();
  }, 10000);




});
