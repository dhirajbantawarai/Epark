const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
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
        },
        question:{
            type: String,
        },
        answer:{
            type: String,
        }
    },{ versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);