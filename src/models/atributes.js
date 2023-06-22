import mongoose from "mongoose";
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const AtributeModel = new mongoose.Schema({
    Product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
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

export default mongoose.model("AtributeModel", AtributeModel)