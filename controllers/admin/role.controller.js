const Role = require("../../models/role.model");


const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await Role.find(find);
    res.render("admin/pages/roles/index", {

        pageTitle: "Danh mục quyền",
        records: records

    });
}


// GET admin/pages/roles/create


module.exports.create = async (req, res) => {


    res.render("admin/pages/roles/create", {

        pageTitle: "Tạo mới mục quyền",


    });
}

// Post admin/pages/roles/create
module.exports.createPost = async (req, res) => {




    const record = new Role(req.body);

    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}
// GET admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        let find = {
            deleted: false,
            _id: id
        }

        const data = await Role.findOne(find);
        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa mục quyền",
            data: data
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/admin/roles`)
    }

}


// PATCH admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success","Cập nhật thành công");
    res.redirect(`back`)


}


// [GET] admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {deleted: false}
    
    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions", {
        pageTitle: "Mục phân quyền",
        records: records
        
    })


}

// [PATCH] admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    // console.log(req.body);
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        // const id = item.id;
        // const permission = item.id
        await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
        
    }
    res.redirect("back")


}