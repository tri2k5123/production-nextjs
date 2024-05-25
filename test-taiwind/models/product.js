const { Schema, default: mongoose, models } = require("mongoose");

const productSchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    colors: {
        type: Array,
        require: true
    },
    sizes: {
        type: Array,
        require: true
    },
    basePrice: {
        type: Number,
        require: true
    },
    percentPrice: {
        type: Number,
        require: true
    },
    initialPrice: {
        type: Number,
        require: true
    },
    imgs: {
        type: Array,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    remaining: {
        type: Number,
        require: true
    }
});

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;