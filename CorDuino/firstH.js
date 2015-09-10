  var five = require("johnny-five");
  // from now on I must with this file to run it type sudo node firstH.js
  var board = new five.Board();

  board.on("ready", function() {
    var ledPins = [8,12,13];
    var leds = new five.Leds(ledPins);
    var servo = new five.Servo(9);
     ir = {
    reference: new five.Led(8),
    recieve: new five.Led(12),
    Sensor: new five.Sensor({
      pin:"A0",
      freq: 100
    })
  };

    function oneAfterAnother() {
      var delay = 1;
      board.counter = 0;
      for (var i = 0; i < leds.length; i++) {
        var led = leds[i];

        board.wait(delay,function(){
        ir.Sensor.scale([0, 1]).on("data", function() {

     console.log( this.value );

  });
          console.log(this.counter + " on")
          leds[this.counter].on();
        })
  //       ir.Sensor.scale([0, 10000]).on("data", function() {

  //    console.log( this.value );

  // });
        board.wait(delay + 100,function(){
           board.repl.inject({
              leds : ledPins,
              servo: servo,
              ir: ir
          });
          console.log(this.counter + " off")

          leds[this.counter].off();
          this.counter = (this.counter + 1) % leds.length;
        })

        delay += 150;
      }
    }
    // leds.on();
    // board.wait(1000, leds.off.bind(leds));

  oneAfterAnother()
  ;servo.min();
  // set the servo to the maximum degrees
  console.log('scanning counter wise');
  // defaults to 180
  servo.max();
  // Centers the servo to 90°
  servo.center();
  board.loop(4000, oneAfterAnother);
  // Moves the servo to position by degrees
  servo.move( 90 );
  // Perform a min-max cycling servo sweep (defaults to 0-180)

  servo.sweep();

  ir.reference.on();

  ir.recieve.strobe(100);


  this.repl.inject({
    t: ir.recieve
  });
  });