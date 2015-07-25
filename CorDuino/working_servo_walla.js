var five, board, servo;

 five = require("johnny-five");
// Running from the repo:
// five = require("../lib/johnny-five.js");
board = new five.Board();
// Wait for the board and serial line to 
// be connected and ready:
board.on("ready", function() {
servo = new five.Servo(9);

  // You can add any objects to the board's REPL, 
  // Let's add the servo here, so we can control 
  // it directly from the REPL!
  board.repl.inject({
    servo: servo
  });
 // make robots here!
servo.min();


// set the servo to the maximum degrees
// defaults to 180

servo.max();



// Centers the servo to 90°

servo.center();



// Moves the servo to position by degrees

servo.move( 90 );



// Perform a min-max cycling servo sweep (defaults to 0-180)

servo.sweep();
});
