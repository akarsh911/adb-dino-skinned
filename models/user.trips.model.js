const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const userTripSchema = new Schema({
    bus_id: {
        type: Schema.Types.ObjectId,
        ref: "bus"
    },
    stop_start: {
        type: Schema.Types.ObjectId,
        ref: "stop"
    },
    stop_end: {
        type: Schema.Types.ObjectId,
        ref: "stop"
    },
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: "driver"
    },
    route_id: {
        type: Schema.Types.ObjectId,
        ref: "route"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    transaction_id: {
        type: Schema.Types.ObjectId,
        ref: "transaction"
    },
    total_time: {
        type: String
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    stops_count: {
        type: Number
    },
    total_cost: {
        type: Number
    },
    date: {
        type: Date
    },
});

userTripSchema.virtual("url").get(function () {
    return `/users/trips/${this._id}`;
});

module.exports = mongoose.model("user_trips", userTripSchema);