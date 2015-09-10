var five = require("johnny-five"),
  board, ir;

board = new five.Board();
controller = process.argv[2] || "GP2Y0A02YK0F";
board.on("ready", function() {
  var distance = new five.IR.Proximity({
      controller: controller,
      pin: "A0",
      freq: 500
    });

    distance.on("data", function() {
      if (controller) {
        console.log("inches: ", this.inches);
        console.log("cm: ", this.centimeters, this.raw);
      } else {
        console.log("value: ", this.value);
      }
    });
  });