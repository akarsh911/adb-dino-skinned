const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ownerSchema = new Schema({
    f_name: {
        type: String
    },
    l_name: {
        type: String
    },
    email: {
        type: String
    },
    ph_no: {
        type: String
    },
    dob: {
        type: Date
    },
    avatar_url: {
        type: String
    },
    pwd_hash: {
        type: String
    },
    dues_balance: {
        type: Number
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "bank_account"
    },
    address: {
        type: String
    },
    bus_owned: {
        type: Schema.Types.ObjectId,
        ref:"bus"
    },
   
});
userSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.f_name && this.l_name) {
        fullname = `${this.f_name}, ${this.l_name}`;
    }
    return fullname;
});


ownerSchema.virtual("url").get(function () {
    return `/owners/${this._id}`;
});

module.exports = mongoose.model("owner", ownerSchema);