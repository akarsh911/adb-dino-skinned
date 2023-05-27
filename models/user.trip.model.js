const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const userTripSchema = new Schema({
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
    balance: {
        type: Number
    },
    trip_count: {
        type: Number
    },
    linked_payment: {
        type: String
    },
    user_type: {
        type: Number
    },
    trip_history: [{
        type: Schema.Types.ObjectId,
        ref: "user_trips"
    }]
});
    
userTripSchema.virtual("url").get(function () {
    return `/users/trips/${this._id}`;
});

module.exports = mongoose.Model("user", userTripSchema);