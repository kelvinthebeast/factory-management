const { default: mongoose, model } = require("mongoose");

const cartSchema = new mongoose.Schema({

    user_id: String,
    products: [{
        product_id: String,
        quantity: Number
    }],

}, {
    timestamps: true  // Thêm timestamps cho thoi gian tạo và cập nhật sản phẩm
})
const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;