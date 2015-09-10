  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function() {
    var ledPins = [8,12,13];
    var leds = new five.Leds(ledPins);
    var servo = new five.Servo(9);
    var sensor = new five.Sensor(1);
    
  var ir = {
    reference: new five.Led(ledPins[0]),
    transmit: new five.Led(ledPins[1]),
    receive: new five.Sensor({
      pin: 10,
      freq: 11
    })
  };

    function oneAfterAnother() {
      var delay = 1;
      board.counter = 1;
      for (var i = 1; i < leds.length; i++) {
        var led = leds[i];

        board.wait(delay,function(){
          console.log(this.counter + " on")
          leds[this.counter].on();
          ir.reference.on();
          ir.transmit.strobe(1);
        })

        board.wait(delay + 100,function(){
           board.repl.inject({
              leds : ledPins,
              servo: servo,
              sensor:sensor,
              ir: ir.transmit
          });
  
          console.log(this.counter + " off" + "now sensor is initialising and recieving current frequency");

          ir.receive.scale([0, 100]).on("data", function() {

    // console.log( this.value );

  });

  ir.reference.on();

  ir.transmit.strobe(1);


  this.repl.inject({
    t: ir.transmit
          });

        })
        delay += 150;
    }
  }
  leds.on();
  

  oneAfterAnother();servo.min();
  board.wait(1000, leds.off.bind(leds));
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
  });