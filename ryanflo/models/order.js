const { Schema, models, default: mongoose } = require("mongoose");

const orderSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    isFinished: {
        type: Boolean,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    orderInfo: {
        type: Array,
        require: true
    },
    
}, { timestamps: true })
const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order
