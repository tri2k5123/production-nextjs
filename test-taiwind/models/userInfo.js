const { Schema, default: mongoose, models } = require("mongoose");

const userInfoSchema = new Schema({
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
});

const UserInfo = models.UserInfo || mongoose.model("UserInfo", userInfoSchema);
export default UserInfo;