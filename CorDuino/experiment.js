var five = require("johnny-five"),
  board, ir;

board = new five.Board();
board.on("ready", function() {
  // var ledPins = [12,13];

  ir = {
    reference: new five.Led(8),
    transmit: new five.Led(13),
    receive: new five.Sensor({
      pin: 11,
      freq: 10
    })
  };

  ir.receive.scale([0, 100]).on("data", function() {

    console.log("WARNING!!! now sensor is finding an object")
    // console.log( this.value );

  });

  ir.reference.on();

  ir.transmit.strobe(1);


  this.repl.inject({
    t: ir.transmit
  });
});