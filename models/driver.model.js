const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const driverSchema = new Schema({
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
    rating: {
        type: Number
    },
    dues_balance: {
        type: Number
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "bank_account"
    },
    blood_group: {
        type: String
    },
    dl_number: {
        type: String
    },
    driver_type: {
        type: Number
    },
    id_url: {
        type: String
    },
    address: {
        type: String
    },
    home_contact: {
        type: String
    },
    trip_history: [{
        type: Schema.Types.ObjectId,
        ref: "bus_trips"
    }]
});
driverSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.f_name && this.l_name) {
        fullname = `${this.f_name}, ${this.l_name}`;
    }
    return fullname;
});

driverSchema.virtual("url").get(function () {
    return `/drivers/${this._id}`;
});

module.exports = mongoose.Model("driver", driverSchema);