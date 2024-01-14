const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpotSchema = new Schema(
    {
        status:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true,
        }
    },{ versionKey: false }
);

module.exports = mongoose.model("Spot", SpotSchema);