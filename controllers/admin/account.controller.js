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

// [GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {

    let find = {
        _id: req.params.id,
        deleted: false
    }
    try {
        const data = await Account.findOne(find)
        const roles = await Role.find({ deleted: false });
        res.render("admin/pages/accounts/edit", {

            pageTitle: "Danh mục quyền",
            roles: roles,
            data: data
        });
    } catch (error) {

    }


}

// [PATCH] admin/accounts/edit/:id 
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;                        // tìm tất cả trừ id này
    const emailExists = await Account.findOne({_id: {$ne: id}, email: req.body.email, deleted: false});
    // check email
    if (emailExists) {
        req.flash('error', `Email ${req.body.email} đã tồn tại`);
        req.flash("error","Please enter a valid email");
    }
    else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        } // if have password return else del password
        await Account.updateOne({ _id: id }, req.body)

        req.flash("success", "Password updated successfully");
    }


    res.redirect("back");
}