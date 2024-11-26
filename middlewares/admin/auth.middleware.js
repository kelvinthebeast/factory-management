const Account = require("../../models/account.model")
const systemConfig = require("../../config/system");
module.exports.requireAuth = async(req, res, next) => {
    // console.log(req.cookies)
    // console.log("chay qua day")
    if(!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    } else {
        const user = await Account.findOne({token: req.cookies.token});
        console.log(user)
        if(!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
        else {
            next();
        }
    }
    
}