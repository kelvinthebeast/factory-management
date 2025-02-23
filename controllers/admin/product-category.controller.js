const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");




const createTreeHelper = require("../../helpers/createTree");

// [GET] admin/products-catogory
module.exports.index = async (req, res) => {


    let find = {
        deleted: false
    }


    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/index", {

        pageTitle: "Danh mục sản phẩm",
        records: newRecords

    })
    // res.send("PRODUCT MANGEMENT")
};

// [GET] admin/products-catogory/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    // function createTree(arr, parentId = "") {
    //     const tree = [];
    //     arr.forEach((item) => {
    //         if (item.parent_id === parentId) {
    //             const newItem = item;
    //             const children = createTree(arr, item.id);
    //             if (children.length > 0) {
    //                 newItem.children = children;
    //             }
    //             tree.push(newItem);
    //         }
    //     }); // <- Closing bracket added here for forEach
    //     return tree; // Optional: Add a return for the tree structure if needed
    // }


    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    // console.log(newRecords);
    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    }
    )
}



// POST /admin/product-category/create
module.exports.createPost = async (req, res) => {
    try {

        // const permissions =res.locals.role.permissions
        //if(permissions.includes("product-category_create")) {
        // console.log(có quyển)
        // } else {
        // return}
        // If `position` is empty, set it to the current count + 1
        if (req.body.position === "" || req.body.position === undefined) {
            const count = await ProductCategory.countDocuments();
            req.body.position = count + 1; // Increment count by 1
        } else {
            // Convert `position` to a number if provided
            req.body.position = parseInt(req.body.position, 10);
            if (isNaN(req.body.position)) {
                throw new Error('Position must be a valid number');
            }
        }

        const record = new ProductCategory(req.body);
        await record.save();

        // Redirect to the products-category page
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    } catch (error) {
        console.error("Error creating product category:", error);
        res.status(400).json({ error: error.message });
    }
};


// [GET] admin/products-catogory/edit
module.exports.edit = async (req, res) => {

    try {
        const id = req.params.id;
        const data = await ProductCategory.findOne({ _id: id, deleted: false });



        const records = await ProductCategory.find({ deleted: false });


        const newRecords = createTreeHelper.tree(records);
        res.render("admin/pages/products-category/edit", {
            pageTitle: "Tạo danh mục sản phẩm",
            data: data,
            records: newRecords

        }
        )

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-catogory`)
    }
}




module.exports.editPath = async (req, res) => {

    const id = req.params.id;

    req.body.position = parseInt(req.body.position);
    console.log(id);
    console.log(req.body);
    await ProductCategory.updateOne({ _id: id }, req.body);
    res.redirect("back");


}