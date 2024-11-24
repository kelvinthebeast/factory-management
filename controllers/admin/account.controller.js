const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

const systemConfig = require("../../config/system");
const md5 = require('md5');
// [GET] Admin/accounts
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await Account.find(find).select("-password -token");
    // console.log(records);
    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role; // add to object role a key named role 

    }
    res.render("admin/pages/accounts/index", {

        pageTitle: "Danh sach tai khoan",
        records: records

    });
}
// [GET] admin/accounts/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false
    }

    const roles = await Role.find(find);
    res.render("admin/pages/accounts/create", {

        pageTitle: "Danh mục quyền",
        roles: roles

    });
}


// [POST] accounts/create 
module.exports.createPost = async (req, res) => {

    const emailExists = await Account.findOne({ email: req.body.email });
    // check email
    if (emailExists) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        return res.redirect('/admin/accounts/create');
    } else {
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }

}