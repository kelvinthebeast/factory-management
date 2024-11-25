const Account = require("../../models/account.model");
const md5 = require("md5");

const systemConfig = require("../../config/system");

// [GET] /admin/auth/login 
module.exports.login = (req, res) => {

    res.render(`admin/pages/auth/login`, {
        pageTitle: "Đăng nhập"
    })

}
// [Post] /admin/auth/login 
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    })


    if (!user) {
        req.flash("error", "Email not existing");
        res.redirect(`/admin/auth/login`)
        return
    }

    if(md5(password) != user.password) {
        req.flash("error", "Wrong password!!!!");
        res.redirect("back");
        return;
    }

    if(user.status == "inactive") {
        req.flash("error", "Your account is blocked")
    }
    res.cookie("token",user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

module.exports.logout = (req, res) => {
    // xóa token có trong login 
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
 
}