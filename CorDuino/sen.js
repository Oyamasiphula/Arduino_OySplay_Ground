var five = require("johnny-five"),
  board, ir;

board = new five.Board();
board.on("ready", function() {

  ir = {
    reference: new five.Led(13),
    transmit: new five.Led(12),
    receive: new five.Sensor({
      pin: 7,
      freq: 10
    })
  };

  ir.receive.scale([0, 100]).on("data", function() {

  console.log( this.value );

  });

  ir.reference.on();

  ir.transmit.strobe(1);


  this.repl.inject({
    t: ir.transmit
  });
});