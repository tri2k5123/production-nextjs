const { Schema, models, default: mongoose } = require("mongoose");

const historyOrderSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        require: true
    }
}, { timestamps: true })
const HistoryOrder = models.HistoryOrder || mongoose.model("HistoryOrder", historyOrderSchema);
export default HistoryOrder;
