import mongoose from "mongoose";
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const BillModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [
        {
            image: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            size: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: true
    },
    User_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'đang chờ duyệt'
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.createdAt = moment(ret.createdAt).format('DD/MM/YYYY HH:mm:ss');
            ret.updatedAt = moment(ret.updatedAt).format('DD/MM/YYYY HH:mm:ss');
            delete ret.id;
        },
    },
})

export default mongoose.model("Bill", BillModel)