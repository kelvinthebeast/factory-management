

const { query, response } = require("express");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const { count } = require("moongose/models/user_model");
const paginationHelper = require("../../helpers/pagination");

const systemConfig = require("../../config/system");
const { preProcessFile } = require("typescript");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");


const Account = require("../../models/account.model");
// [GET] /admin/products
module.exports.index = async (req, res) => {

    //filterStatus
    const filterStatus = filterStatusHelper(req.query);

    // console.log(filterStatus);



    // console.log(req.query);
    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status;

    }

    // optimize search by using regex
    const objectSearch = searchHelper(req.query);
    // console.log(objectSearch);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }



    // pagination







    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    },
        req.query,
        countProducts
    )
    //end pagination

    //SOrt

    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;


    } else {
        sort.postion = "desc";
    }
    // end sort

    // const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    const products = await Product.find(find)
        .sort(sort) // Sắp xếp theo thứ tự tăng dần
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    for (const product of products) {

        // lấy ra tên người dùng
        const user = await Account.findOne({
            _id: product.createdBy.account_id
        })
        if (user) {
            product.accountFullName = user.fullName;
        }

        // lấy ra thông tin người cập nhật gần nhất
        // tìm phần tử cuối cùng trong object và lấy key đầu tiên
        const updatedBy = product.updatedBy.slice(-1)[0];
        if(updatedBy) {
            const userUpdated = await Account.findOne({
                _id: updatedBy.account_id
            });
            updatedBy.accountFullName = userUpdated.fullName;
        }



    }




    res.render("admin/pages/products/index", {

        pageTitle: "PRoduct MAnagement",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
    // res.send("PRODUCT MANGEMENT")
};

//[GET]/admin/products/change-status/:status/:id --> [GET] --> PATCH
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    // const id = req.params.id;
    // const status = req.params.status;


    // res.send(`${status} - ${id}`);
    // console.log(req.params);
    const id = req.params.id;
    const status = req.params.status;
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    } 
    await Product.updateOne({ _id: id }, { status: status, $push: {updatedBy: updatedBy} });

    req.flash("success", "Cập nhật trạng thái sản phẩm thành công");

    res.redirect("back"); // khong quay ve trang so 1
    // req.query là sau dấu ?
    // params là sau dấu /
}

// [PATCH] /admin/products/change-multi 
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    // console.log(type);
    const ids = req.body.ids.split(", ");
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    } 
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" , $push: {updatedBy: updatedBy} });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive",
                 $push: {updatedBy: updatedBy} 
             });
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);

            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } },
                {
                    deleted: true,
                    deletedBy: {
                        account_id: res.locals.user.id,
                        deletedAt: new Date()
                    }
                });
            req.flash("success", `Đã xóa ${ids.length} sản phẩm thành công`);
            break;
        case "change-position":
            // console.log(ids);
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                // console.log(id);
                // console.log(position);
                await Product.updateOne({ _id: id }, { position: position, $push: {updatedBy: updatedBy}});
            }
            // console.log(ids);
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        default:
            break;
    }

    // res.send("OKE CHANGE MULTI")
    res.redirect("back");
}
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
        }
    });

    res.redirect("back");

}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false
    }

    const category = await ProductCategory.find(find);
    const newCategory = createTreeHelper.tree(category);
    res.render("admin/pages/products/create", {
        pageTitle: "Add new product",
        category: newCategory


    });
}
//POST /admin/products/create/
module.exports.createPost = async (req, res) => {

    // Parse numeric fields and handle potential NaN values
    req.body.price = parseInt(req.body.price) || 0;
    req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock) || 0;

    // Handle 'position' logic
    if (!req.body.position || req.body.position === "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }

    req.body.position = parseInt(req.body.position) || 1;
    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    req.body.description = req.body.description || "";
    // req.body.thumbnail = req.file ? `/uploads/${req.file.filename}` : "https://th.bing.com/th/id/OIP.hRxc0XsD9dXEaXxmvEOwXgHaLH?rs=1&pid=ImgDetMain";

    // Create a new product with the request data
    const product = new Product(req.body);



    // Save the product to the database
    await product.save();

    req.flash("success", "Thêm sản phẩm thành công");

    // Redirect to the products page upon success
    res.redirect(`${systemConfig.prefixAdmin}/products`);

};

// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }

        const product = await Product.findOne(find);

        const category = await ProductCategory.find({ deleted: false });
        const newCategory = createTreeHelper.tree(category);
        // console.log(product)
        res.render("admin/pages/products/edit", {
            pageTitle: "Edit product",
            product: product,
            category: newCategory
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`);

    }

}


// [Patch] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price) || 0;
    req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0;
    req.body.stock = parseInt(req.body.stock) || 0;
    req.body.position = parseInt(req.body.position) || 1;

    req.body.description = req.body.description || "không có gì hiển thị";

    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // } else {
    //     req.body.thumbnail = "https://th.bing.com/th/id/OIP.hRxc0XsD9dXEaXxmvEOwXgHaLH?rs=1&pid=ImgDetMain";
    // }


    // const product = new Product(req.body);

    try {
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        } 
        
        // req.body.updatedBy = updatedBy
        await Product.updateOne({ _id: id }, {
            ...req.body,
            $push: { updatedBy: updatedBy }
        });
        req.flash("success", "Cập nhật sản phẩm thành công");
    } catch (error) {
        req.flash("error", "Cập nhật không thành công");
    }


    res.redirect(`back`);

}




// [GET] admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id,

        }

        const product = await Product.findOne(find);
        console.log(product)
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm này");
        res.redirect(`${systemConfig.prefixAdmin}/products`);

    }

}

