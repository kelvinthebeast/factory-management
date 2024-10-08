

const { query, response } = require("express");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const { count } = require("moongose/models/user_model");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/products
module.exports.index = async (req, res) => {

    //filterStatus
    const filterStatus = filterStatusHelper(req.query);

    console.log(filterStatus);



    // console.log(req.query);
    let find = {
        deleted: false
    }

    if (req.query.status) {
        find.status = req.query.status;

    }

    // optimize search by using regex
    const objectSearch = searchHelper(req.query);
    console.log(objectSearch);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }



    // pagination
    const countProducts = await Product.count(find);
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    },
        req.query,
        countProducts
    )
    //end pagination

    // console.log(totalPage);
    console.log(objectPagination)

    // const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    const products = await Product.find(find)
    .sort({ position: "desc" }) // Sắp xếp theo thứ tự tăng dần
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);




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
    console.log(req.params);
    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success","Cập nhật trạng thái sản phẩm thành công");
    
    res.redirect("back"); // khong quay ve trang so 1
    // req.query là sau dấu ?
    // params là sau dấu /
}

// [PATCH] /admin/products/change-multi 
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    console.log(type);
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success",`Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success",`Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } },
                {
                    deleted: true,
                    deletedAt: new Date()
                });
            req.flash("success",`Đã xóa ${ids.length} sản phẩm thành công`);
            break;
        case "change-position":
            console.log(ids);
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                console.log(id);
                console.log(position);
                await Product.updateOne({_id: id}, {position: position});
            }
            // console.log(ids);
            req.flash("success",`Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
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
        deletedAt: new Date()
    });

    res.redirect("back");

}

// [GET] /admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Add new product"
    });
} 
