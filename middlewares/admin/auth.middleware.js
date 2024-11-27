const Account = require("../../models/account.model")
const Role = require("../../models/role.model");
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
            const role = await Role.findOne({_id: user.role_id}).select("title permissions");
            res.locals.user = user; // trar ve cho front end
            res.locals.role = role;  // Thêm role vào res.locals để có thể sử dụng trong các views
            next();
        }
    }
    
}