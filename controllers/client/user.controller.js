const User = require("../../models/user.model");
const md5 = require("md5");

const generateHelper = require("../../helpers/generate");

const ForgotPassword = require("../../models/forgot-password.model");
// [get] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Trang đăng ký tài khoản"
    });
}


// [post] /user/register

module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("/");
        return;
    }
    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

   
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

// [get] /user/login

module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Trang đăng nhập"
    });
}


// [post] /user/login

// module.exports.loginPost = async (req, res) => {
//     const email = req.body.email;
//     const password = (req.body.password);

//     const user = await User.findOne({ email: email, password: password });
//     if (!user) {
//         req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
//         res.redirect("/user/login");
//         return;
//     }

//     if(md5(password) !== user.password) {
//         req.flash("error", "Sai mật khẩu");
//         res.redirect("back");
//         return;
//     }
//     if(user.status === "locked") {
//         res.flash("success", "Tài khoản bị khóa");
//         res.redirect("back");
//         return;
//     }

//     res.cookie("tokenUser", user.tokenUser);
//     res.redirect("/");
// }
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password); // Mã hóa mật khẩu đầu vào

    // Tìm kiếm người dùng với email và mật khẩu đã mã hóa
    const user = await User.findOne({ email: email, deleted: false});
    if (!user) {
        req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
        return res.redirect("/user/login");
    }

    // Kiểm tra trạng thái tài khoản
    if (user.status === "locked") {
        req.flash("error", "Tài khoản bị khóa");
        return res.redirect("back");
    }

    // Lưu tokenUser vào cookie và chuyển hướng
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
};

// [get] /user/logout 
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");

    res.redirect("/user/login");
};

// [get] /user/password/forgot 
module.exports.forgotPassword = (req, res) => {

    res.render("client/pages/user/forgot-password.pug", {
        pageTitle: "Quên mật khẩu"
    });
};


// [post] /user/password/forgot-password 
module.exports.forgotPasswordPost = async (req, res)=> {
    const email = req.body.email;
    const user = await User.findOne({email: email, deleted: false});

    if(!user) {
        req.flash("error", "Email không tồn tại");
        return res.redirect("/user/login");
    }

    // lưu thông tin vào db
    const otp = generateHelper.generateRandomNumber(8);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expiredAt: Date.now() 
    }//
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // nếu có email thì gửi mã otp
    
    res.redirect(`/user/password/otp?email=${email}`);
}

// [get] /user/password/otp 
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Xác nhận mã OTP",
        email: email
    })
}

// [post] /user/password/otp 
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;


    const result = await ForgotPassword.findOne({ email: email, otp: otp });



    if (!result) {
        req.flash("error", "Mã OTP không đúng");
        return res.redirect(`/user/password/otp?email=${email}`);
    }
// chạy xuống đây tức là kết quả đúng

    const user = await User.findOne({email: email});


    res.cookie("tokenUser", user.tokenUser); // vì sao có bước này, vì khi qua bước đổi mật khẩu ngta có thể sẽ f12 và 
    // sửa email khác lúc đó email đó bị sửa mk thì sao, nên là lấy tokenUser cái duy nhất trên máy check là an toàn nhất
    res.redirect("/user/password/reset");
}



module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đặt lại mật khẩu"
    });
}