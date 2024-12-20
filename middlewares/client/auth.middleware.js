const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.tokenUser) {
        res.redirect(`/auth/login`)
    } else {
        const user = await User.findOne({ tokenUser: req.cookies.tokenUser }).select("-password");
        // console.log(user)
        if (!user) {
            res.redirect(`/auth/login`)
        }
        else {

            res.locals.user = user;

            next();
        }
    }

}