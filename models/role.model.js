const { default: mongoose, model } = require("mongoose");

const roleSchema = new mongoose.Schema({
    
    title: String,
    
    description: String, 
    permissions: {
        type: Array,
        default: []
    },
    
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date 
}, {
    timestamps: true  // Thêm timestamps cho thoi gian tạo và cập nhật sản phẩm
})
const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;