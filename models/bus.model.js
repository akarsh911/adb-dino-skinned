const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const busSchema = new Schema({
    brand: {
        type: String
    },
    color: {
        type: String
    },
    owner_id: {
        type: Schema.Types._id,
        ref: "owner"
    },
    earnings: {
        type: String
    },
    bus_number: {
        type: String
    },
    photo_url: {
        type: String
    },
    max_capacity: {
        type: Number
    },
    rc_number: {
        type: String
    },
    chasis_number: {
        type: String
    },
    insurance_number: {
        type: String
    },
    bus_type: {
        type: Number
    },
    date_leased_till: {
        type: Date
    },
    lease_time_start: {
        type: String
    },
    lease_time_end: {
        type: Number
    },
    rc_url: {
        type: String
    },
    insurance_url: {
        type: String
    },
    trips_history: {
        type: Schema.Types.ObjectId,
        ref: "bus_trips"
    },
    fuel_history: {
        type: Schema.Types.ObjectId,
        ref: "bus_fuel"
    },
    maintinance_history: [{
        type: Schema.Types.ObjectId,
        ref: "bus_maintinance"
    }]
});


busSchema.virtual("url").get(function () {
    return `/buses/${this._id}`;
});

module.exports = mongoose.model("bus", busSchema);