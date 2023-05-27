const { Mongoose } = require("mongoose");


const Schema = mongoose.Schema;
const bankAccountSchema = new Schema({
    name: {
        type: String
    },
    acc_no: {
        type: String
    },
    ifsc: {
        type: String
    },
    branch: {
        type: String
    },
    user_id: {
        type: String
    },
    bank_name: {
        type: Number
    }
});

bankAccountSchema.virtual("url").get(function () {
    return `/accounts/banks/${this._id}`;
});

module.exports = mongoose.model("bank_account", bankAccountSchema);