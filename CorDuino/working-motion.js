var five = require("johnny-five"),
  board, motion;
var myBoard, StartLedMode,servo,piezoElement;
board = new five.Board();

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  // myLed4 ive.Led(10);
  motion = new five.Motion(7);
  StartLedMode = new five.Led(12);
  alertLedPin = new five.Led(13);
  servo = new five.Servo(8);
  piezoElement = new five.Piezo(3);
  
   // Inject the `motion` hardware into
  // the Repl instance's context;
  // allows direct command line access
  this.repl.inject({
    motion: motion,
    led1:alertLedPin, 
    led2:StartLedMode,
    servo: servo,
    speaker: piezoElement
  // Pir Event API
 })
  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function(err) {
    console.log("calibrated");
  });

  // "motionstart" events are fired when the "calibrated"
  // Led strobe fast when motion has started
  motion.on("motionstart", function(err) {
    StartLedMode.strobe(50); 
    console.log("motionstart");
  });

  // "motionstart" events are fired following a "motionstart event
  // when no movement has occurred led strobe slower in different patterns
  motion.on("motionend", function(err) {
    console.log("Someone is braking into your room! Go CHECK! Go! Go!!! WARNING!!!");
    StartLedMode.strobe(2000);
    servo.min();
// set the servo to the maximum degrees
// defaults to 180
    servo.max();

// Centers the servo to 90°
    servo.center();

// Moves the servo to position by degrees
    servo.move(90);

// Perform a min-max cycling servo sweep (defaults to 0-180)
    servo.sweep();

    piezoElement.play({
    // song is composed by a string of notes
    // a default beat is set, and the default octave is used
    // any invalid note is read as "no note"
    song: "G G A A G G A A G G A A A G G A A G G A A G G ",
    beats: 1 / 4,
    tempo: 100
  });
    alertLedPin.on();
  });
});
