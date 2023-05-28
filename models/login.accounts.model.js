const { mongoose } = require("mongoose");


const Schema = mongoose.Schema;
const loginAccountSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: String
    },
    session_id: {
        type: String
    },
    status: {
        type:Number
    },
});

loginAccountSchema.virtual("url").get(function () {
    return `/sessions/${this._id}`;
});

module.exports = mongoose.model("login_account", loginAccountSchema);