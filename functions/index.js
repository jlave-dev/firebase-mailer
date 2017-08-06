const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({ origin: true })
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.body.name && req.body.email && req.body.message) {
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
    } else {
      res.status(400).send('Received incomplete data')
    }
  })
})
