const { Schema, models, default: mongoose } = require("mongoose");

const userCartSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    cartInfo: {
        type: Array,
        require: true
    }
})
const UserCart = models.UserCart || mongoose.model("UserCart", userCartSchema);
export default UserCart;
