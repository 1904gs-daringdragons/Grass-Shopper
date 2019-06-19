'use strict'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main(recipientEmail, message, customerName, someData = null) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // maxConnections: 1,
    service: 'gmail',
    // port: 1337,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  })
  let templates = {
    welcome: {
      emailSubject: `Welcome to Grass Shopper, ${customerName}!`,
      emailBody:
        "Thank you for logging into Grass Shopper: The world's most complete cannabis purchasing application! Have a look around and prepare to recieve this message often!"
    },
    order: {
      emailSubject: 'An Order has been Placed',
      emailBody: `Hi ${customerName}! An order has been placed on Grass Shopper. Congratulations!
        No funds have been charged, but your order contains ${someData}.`
    }
  }

  console.log('main has been called')
  const {emailSubject, emailBody} = templates[message]

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Grace Hopper" <grass-shopper@email.com>', // sender address
    to: `${recipientEmail}`, // list of receivers
    subject: emailSubject, // Subject line
    text: emailBody // plain text body
  })

  console.log(
    'Email: ',
    message,
    'sent to: ',
    info.accepted,
    'result: ',
    info.response
  )
}

module.exports = main

// main().catch(console.error)
