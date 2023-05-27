const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const routeSchema = new Schema({
    name: {
        type: String
    },
    loc_start: {
        type: String
    },
    loc_end: {
        type: String
    },
    route_timings: {
        count:{type:Number},
        timings:[{
            start_time:{type:Number},
            days:{type:Date}
        }]
    },
    stops_data:{
        hot_stop_count:{
            type:Number
        },
        stop_count:{
            type:Number
        },
        stop:[{
            stop_id:{type:Schema.Types.ObjectId,ref:"stop"},
            time:{type:String},
            stop_type:{type:Number}
        }]
    },
    avg_speed: {
        type: String
    },
    avg_users:{
        type:Number
    }
});

routeSchema.virtual("url").get(function () {
    return `/routes/${this._id}`;
});

module.exports = mongoose.model("route", routeSchema);