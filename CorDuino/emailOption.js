var aws = require('aws-sdk');
module.exports = function (to, from, sub, body) {
  aws.config.update({
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    region: 'region'
  });

// load AWS SES
  var ses = new aws.SES({apiVersion: 'latest'});


// this sends the email
  ses.sendEmail({
        Source: from,
        Destination: {
          ToAddresses: to
        },
        Message: {
          Subject: {
            Data: sub
          },
          Body: {
            Html: {
              Data: body
            }
          }
        }
      }
      , function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent:');
          console.log(data);
        }
      });
};
