const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const sendConfirmationEmail = (user) => {

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const token = jwt.sign({email:user.email}, process.env.TOKEN_SECRET)
    const urlConfirm = `${process.env.APIGATEWAY_URL}/users/confirm/${token}`

    return transporter.sendMail({
        from: process.env.MAIL_ADMIN_ADDRESS,
        to: user.email,
        subject: "Email de confirmacion GIP360",
        html:`<div><h1>Confirme su cuenta de GIP haciendo click en el siguiente enlace:</h1>  <a>${urlConfirm}</a> </div>`
    }).then(()=>{return user})
}
module.exports = sendConfirmationEmail
