const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
require('dotenv').config()

const smtpConfig = {
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
}

const transporter = nodemailer.createTransport(smtpConfig)

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.body.name && req.body.email && req.body.message) {
      const mailOptions = {
        from: `Portfolio Bot <${process.env.FROM || process.env.USER}>`,
        to: process.env.TO,
        replyTo: req.body.email,
        subject: `📧 Message from ${req.body.name}`,
        text: `${req.body.message}`
      }

      transporter.sendMail(mailOptions)
        .then(res.send('Mail sent'))
        .catch(err => {
          console.log(err)
          res.status(500).send('Mail could not be sent')
        })
    } else {
      res.status(400).send('Received incomplete data')
    }
  })
})
