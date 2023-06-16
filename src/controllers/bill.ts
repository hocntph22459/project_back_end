import Bill from "../models/bill";
import dotenv from 'dotenv'
import nodemailer from "nodemailer"
import BillSchema from "../validates/bill";
import Product from "../models/product"
dotenv.config()
const { MAIL_USERNAME } = process.env
const { MAIL_PASSWORD } = process.env
const { MAIL_FROM_ADDRESS } = process.env

export const getAllBill = async (req, res) => {
    try {
        const bill = await Bill.find()
        if (bill.length === 0) {
            return res.status(404).json({
                message: "Không có đơn hàng nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: bill
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const getOneBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id)
        if (!bill) {
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: bill
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const getBillByUser = async function (req, res) {
    try {
        const bill = await Bill.find({ User_id: req.params.User_id });
        if (bill.length === 0) {
            return res.status(404).json({
                message: "bạn chưa có đơn hàng nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: bill
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
export const createBill = async function (req, res) {
    try {
        const { error } = BillSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }

        for (const item of req.body.items) {
            const product: any = await Product.findById(item._id);

            let sizeFound = false;
            for (const size of product.sizes) {
                if (size.size === item.size) {
                    sizeFound = true;
                    if (size.quantity < item.quantity) {
                        return res.status(404).json({
                            message: "Sản phẩm không đủ số lượng để bán",
                        });
                    }
                    size.quantity -= item.quantity;
                    if (size.quantity === 0) {
                        product.sizes = product.sizes.filter((s) => s.size !== size.size);
                    }
                    break;
                }
            }
            if (!sizeFound) {
                return res.status(404).json({
                    message: "Sản phẩm không có size này để bán",
                });
            }

            product.quantity -= item.quantity;
            await product.save();
        }

        const bill = await Bill.create(req.body);

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: MAIL_FROM_ADDRESS,
            to: req.body.email,
            subject: "Cảm ơn bạn đã mua hàng",
            html: `
            <p>Xin chào ${req.body.name},</p>
            <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và sẽ được vận chuyển trong thời gian sớm nhất.</p>
            <p>Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi.</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ của chúng tôi</p>
          `,
        };
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: "Tạo đơn hàng thành công",
            data: bill,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updateBill = async function (req, res) {
    try {
        const { error } = BillSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bill) {
            return res.status(404).json({
                message: "Cập nhật đơn hàng không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật đơn hàng thành công",
            data: bill,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const removeBill = async function (req, res) {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa đơn hàng thành công",
            bill,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};