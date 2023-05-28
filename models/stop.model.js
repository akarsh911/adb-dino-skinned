const { mongoose } = require("mongoose");


const Schema = mongoose.Schema;
const stopSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    image_url: {
        type: String
    },
    avg_users: {
        type: Number
    }
});

stopSchema.virtual("url").get(function () {
    return `/stops/${this._id}`;
});

module.exports = mongoose.model("stop", stopSchema);