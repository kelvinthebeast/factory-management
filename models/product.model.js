const { default: mongoose, model } = require("mongoose");
const productSchema = new mongoose.Schema({
    
    title: String,
    price: Number,
    quantity: Number,
    status: String,
    total: Number,
    discountPercentage: Number,
    discountedTotal: Number,
    thumbnail: String,
    deleted: Boolean,
    deletedAt: Date
})
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;