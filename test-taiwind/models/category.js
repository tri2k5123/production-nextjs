const { Schema, models, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    }
})
const Category = models.Category || mongoose.model("Category", categorySchema);
export default Category;
