const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");


const createTreeHelper = require("../../helpers/createTree")

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
)}



//POST /admin/product-category/create
// module.exports.createPost = async (req, res) => {
//     if(req.body.postiton =="") {
//         const count = await ProductCategory.countDocuments();
//         req.body.position = count + 1;
//     } else {
//         req.body.position = parseInt(req.body.position);
//     }
//     const record = new ProductCategory(req.body);
//     await record.save();
//     // res.redirect(`${systemConfig.prefixAdmin}/products-category`);
//     res.redirect(`${systemConfig.prefixAdmin}/products-category`);
// };


// POST /admin/product-category/create
module.exports.createPost = async (req, res) => {
    try {
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
