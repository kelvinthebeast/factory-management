const { default: mongoose, model } = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
    
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    status: String,
    description: String, 
    position: Number,
    thumbnail: String,
    slug: {
        type: String,
        slug: 'title',
        unique: true  // chuyển về thành dạng sản phẩm 1
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date 
}, {
    timestamps: true  // Thêm timestamps cho thoi gian tạo và cập nhật sản phẩm
})
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");

module.exports = ProductCategory;