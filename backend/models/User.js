const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        phone:{
            type: Number,
            required: true
        },
        age:{
            type: Number,
            required: true
        }
    },{ versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);