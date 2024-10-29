const { default: mongoose, model } = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    
    title: String,
    price: Number,
    quantity: Number,
    status: String,
    description: String, 
    total: Number,
    position: Number,
    discountPercentage: Number,
    discountedTotal: Number,
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
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;