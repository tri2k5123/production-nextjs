const { Schema, default: mongoose, models } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
}, { timestamps: true });

const User = models.User || mongoose.model("User", userSchema);
export default User;