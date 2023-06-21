const { Mongoose } = require("mongoose");


const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    amount: {
        type: String
    },
    status: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: "user"
    },
    reference: {
        type: String
    }
});

transactionSchema.virtual("url").get(function () {
    return `/accounts/banks/${this._id}`;
});

module.exports = mongoose.model("bank_account", transactionSchema);