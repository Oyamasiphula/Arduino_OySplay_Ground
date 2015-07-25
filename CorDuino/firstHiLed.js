  var five = require("johnny-five");
  var board = new five.Board();

  board.on("ready", function() {
    var ledPins = [8,12,13];
    var leds = new five.Leds(ledPins);
    var servo = new five.Servo(9);

    function oneAfterAnother() {
      var delay = 1;
      board.counter = 0;
      for (var i = 0; i < leds.length; i++) {
        var led = leds[i];

        board.wait(delay,function(){
          console.log(this.counter + " on")
          leds[this.counter].on();
        })
        board.wait(delay + 100,function(){
           board.repl.inject({
              leds : ledPins,
              servo: servo
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

  oneAfterAnother();servo.min();
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