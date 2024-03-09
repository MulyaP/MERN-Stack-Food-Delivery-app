const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        qty:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    }
)

const ordersSchema = new Schema(
    {
        order:{
            type: [cartSchema],
            required: false
        }
    },
    {
        timestamps: true
    }
)

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        m_no: {
            type: Number,
            required: true
        },
        cart: {
            type: [cartSchema],
            required: true
        },
        orders: {
            type: [ordersSchema],
            required: true
        }

    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('user', UserSchema)