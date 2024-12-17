const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        title: String,
        user_id: String,
        cart_id: String,
        description: String,
        userInfo: {
            fullName: String,
            email: String,
            phone: String,
            address: String
        },
        products: [
            {
                product_id: String,
                quantity: Number,
                discountPercentage: Number,
                price: Number
            }
        ],
        permissions: {
            type: Array,
            default: []
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true // Đặt timestamps ở đây, trong phần tùy chọn schema
    }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
