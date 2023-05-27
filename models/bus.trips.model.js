const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const busTripSchema = new Schema({
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
    trips_ids: [{
        type: Schema.Types.ObjectId,
        ref: "user_trips"
    }],
    stops: [{
        stop_id: {
            type: Schema.Types.ObjectId,
            ref: "stop"
        },
        arrival_time: {
            type: String
        },
        departure_time: {
            type: String
        },
        onborard_users: {
            count: {
                type: Number
            },
            users: [{
                type: Schema.Types.ObjectId,
                ref: "user"
            }]
        },
        deborard_users: {
            count: {
                type: Number
            },
            users: [{
                type: Schema.Types.ObjectId,
                ref: "user"
            }]
        }
    }],
    date: {
        type: Date
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
    total_earning: {
        type: Number
    }
});

busTripSchema.virtual("url").get(function () {
    return `/buses/trips/${this._id}`;
});

module.exports = mongoose.Model("bus_trips", busTripSchema);