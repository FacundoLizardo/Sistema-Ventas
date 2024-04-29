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

    const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET)
    const urlConfirm = `http://localhost:5173/verification/${token}`

    return transporter.sendMail({
        from: process.env.MAIL_ADMIN_ADDRESS,
        to: user.email,
        subject: "Email de confirmacion GIP360",
        html: `<html lang="es">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Confirmación de correo electrónico</title>
                    </head>
                    <body style="display: flex; flex-direction: column; font-family: Arial, sans-serif; color: white; background-color: #191424; margin: 0; padding: 10px;">
                    <div class="container" style="margin: 0 auto; padding: 50px 0 50px 0; width:95%; border-radius: 5px;">
                    <div class="header" style="margin-bottom: 20px; width:100%;">
                    <h1 style="width:100%; text-align:start;">Confirmación de correo electrónico</h1>
                    </div>
                    <div class="content" style="padding: 20px; background-color: #2C2544; border-radius: 10px; color: white;">
                    <p>Estimado usuario,</p>
                    <p>Gracias por registrarte en GIP360. Para completar tu registro, por favor haz clic en el siguiente boton: </p>
                    <a href="${urlConfirm}" style="border: none; border-radius: 5px; cursor: pointer; background-color: #450399; padding: 8px 10px; font-weight: bold; color:white; text-decoration:none; margin-inline:20px;">Confirmar correo electrónico</a>
                    <p style="color: #ffffff">Si no te has registrado en nuestro servicio, por favor ignora este mensaje.</p>
                    </div>
                    <div class="footer" style=" margin-top: 20px; color: #888;">
                    <p style="margin-left: 10px">Si recibiste este email por error, ignóralo. Ten buen día.</p>
                    </div>
                    </div>
                    
                    </body>
                    </html>`
    }).then(() => {
        return user
    })
}
module.exports = sendConfirmationEmail
