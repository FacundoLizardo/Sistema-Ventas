const jwt = require("jsonwebtoken");
const {User} = require("../../db");
const confirmUserController = async  (token) => {
    let email = undefined
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        email = payload.email
    } catch (error) {
        throw new Error('invalid token')
    }
    const user = await User.findOne({
        where: {email: email},
    });
    if(!user) throw new Error('user not found')
    if(user.isVerified) throw new Error('user already verified')
    return await User.update(
        {
            isVerified: true
        },
        {
            where: {email:email},
        }
    );
}

module.exports = confirmUserController

