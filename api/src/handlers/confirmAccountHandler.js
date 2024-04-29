const confirmUserController = require("../controllers/user/confirmUserController");
const confirmAccountHandler = async (req, res)=>{
    const token = req.params.token
try{
    const response = await confirmUserController(token)
    res.status(200).json({success:true, message:"Registration complete", data:response})
}catch (error){
    res.status(500).json({success:false, message:error.message})
}
}
module.exports = {confirmAccountHandler}