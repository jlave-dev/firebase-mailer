const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendMail = functions.https.onRequest((req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: `"Contact Page" <${process.env.USER}>`,
    to: process.env.TO,
    subject: `Message from ${req.body.name}`,
    html: `<p>${req.body.message}</p><p>Reply to <a href="mailto:${req.body.email}">${req.body.email}</a></p>`
  }

  transporter.sendMail(mailOptions)
    .then(res.send('Mail sent'))
    .catch(err => {
      console.log(err)
      res.status(500).send('Mail could not be sent')
    })
})
