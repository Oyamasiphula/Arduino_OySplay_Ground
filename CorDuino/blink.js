var five = require('johnny-five');
const board = new five.Board();

board.on("ready", function() {

  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  var alertLedPin = new five.Led(12),
    piezoElement = new five.Piezo(3);

  this.repl.inject({
    alertLedPin: alertLedPin,
    speaker: piezoElement
  })
  piezoElement.play({
    // song is composed by a string of notes
    // a default beat is set, and the default octave is used
    // any invalid note is read as "no note"
    song: "G G A A G G A A G G A A A G G A A G G A A G G ",
    beats: 1 / 4,
    tempo: 100
  });
  alertLedPin.strobe(100);
});

() => {
console.log('newer funcs');
}
