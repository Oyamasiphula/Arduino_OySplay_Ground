var five = require("johnny-five"),board,motion,
    nodemailer = require('nodemailer'),
    accountSid = "AC8a6ae6bea98b0ff83d2b2e85b3b003ce",
    authToken = "e66e1b5f5a7c5c1c163a00b0a8efd7be";
var client = require('twilio')(accountSid, authToken);
var myBoard,
    StartLedMode,
    piezoElement;
    // servo,
var transporter = nodemailer.createTransport({
  service:process.env.USERMAILSERVER ,
  auth: {
        user: process.env.USERMAIL,
        pass: process.env.USERPASS
      }
});
board = new five.Board();
// setup e-mail data with unicode symbols
var mailOptions = {
    from: process.env.FROMUSERMAILINSTANCE, // sender address
    to: process.env.TOUSERMAILINSTANCE, // list of receivers
    subject: process.env.TEXTMESSAGESUBJECT, // Subject line
    text: process.env.TEXTMESSAGE, // plaintext body
    html: process.env.HTMLBODY, // html body
    tls: {
      rejectUnauthorized: false
  },
};
board.on("ready", function() {
  // Create a new `motion` hardware instance.
   motion = new five.Motion(7);
    StartLedMode = new five.Led(12);
      alertLedPin = new five.Led(13);
//   servo = new five.Servo(8);
  piezoElement = new five.Piezo(3);
   // Inject the `motion` hardware into
  // the Repl instance's context;
  // allows direct command line access
  this.repl.inject({
    motion: motion,
      alertLedPin:alertLedPin,
        led2:StartLedMode,
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
    //Below is call Me When led is done blinking using twilio
          client.makeCall({
            url: 'https://demo.twilio.com/welcome/voice/',
            to: '27634575155',
            from: '27875509450',
          statusCallback: 'https://demo.twilio.com/welcome/voice/',
        statusCallbackMethod: 'POST',
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    }, function(err, call){
          if(err) {
            console.log(err); return err; }
          process.stdout.write(call.sid);
      });
      // servo.sweep()
      // Below is send me an email after calling Me
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
       //Below is Alert Sound Must play when motion is triggerd
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
