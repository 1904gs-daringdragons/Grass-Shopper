'use strict'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main(recipientEmail, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  let templates = {
    welcome: {
      emailSubject: 'Welcome to Grass Shopper!',
      emailBody:
        "Thank you for logging into Grass Shopper: The world's most complete cannabis purchasing application! Have a look around and prepare to recieve this message often!"
    },
    order: {
      emailSubject: 'An Order has been Placed',
      emailBody:
        'Hi! An order has been placed on Grass Shopper. No funds have been charged.'
    }
  }

  const {emailSubject, emailBody} = templates[message]

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Grace Hopper" <grass-shopper@email.com>', // sender address
    to: `${recipientEmail}`, // list of receivers
    subject: emailSubject, // Subject line
    text: emailBody // plain text body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main

// main().catch(console.error)
