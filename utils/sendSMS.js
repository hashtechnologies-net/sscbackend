const accountSid = 'AC0b9204896a3f134a628c50ba8f05094b';
const authToken = 'd805a6b820f487d6bf1813a11dd9a7e6';
const client = require('twilio')(accountSid, authToken);

const sendSMS = (body, to) => {
  client.messages
    .create({
      body,
      from: '+16507537470',
      to,
    })
    .then((message) =>
      console.log(`Message Sent ${parseInt(Math.random() * 1000000)}`)
    )
    .catch((err) => console.log(err.message));
};

module.exports = sendSMS;
