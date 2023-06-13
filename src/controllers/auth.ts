import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import { signinSchema, signupSchema } from "../validates/auth";
import  crypto  from "crypto";
import dotenv from 'dotenv'
dotenv.config()
const { MAIL_USERNAME } = process.env
const { MAIL_PASSWORD } = process.env
const { MAIL_FROM_ADDRESS } = process.env
const { SECRET_CODE } = process.env;
export const Signup = async (req, res) => { 
    try {
        // Tạo liên kết xác thực
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const link = `http://localhost:3000/signin?token=${token}`;
        const { name, email, password } = req.body;

        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Tài khoản đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user: any = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        user.password = undefined;

        // Gửi email khi đăng ký thành công
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${MAIL_USERNAME}`,
                pass: `${MAIL_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: `${MAIL_FROM_ADDRESS}`,
            to: email,
            subject: 'Xác thực tài khoản',
            text: `Chào mừng ${name} đến với trang web của chúng tôi. Vui lòng nhấp vào liên kết sau để xác thực tài khoản của bạn: ${link}`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: error
                })
            } else {
                return res.status(200).json({
                    message: info.response
                })
            }
        });

        return res.status(201).json({
            message: "Đăng ký thành công. Vui lòng kiểm tra email của bạn để xác thực tài khoản và đăng nhập",
            user,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
};

export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = signinSchema.validate({ email, password }, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }

        const user: any = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Không đúng mật khẩu",
            });
        }
        // Gửi email cảnh báo khi đăng nhập thành công
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${MAIL_USERNAME}`,
                pass: `${MAIL_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: `${MAIL_FROM_ADDRESS}`,
            to: email,
            subject: 'cảnh báo bảo mật',
            text: `Chúng tôi phát hiện thấy có một yêu cầu đăng nhập mới vào Tài khoản Google của bạn trên một thiết bị lạ. Nếu đây là yêu cầu của bạn, thì bạn không phải làm gì thêm. Nếu đây không phải là yêu cầu của bạn, thì chúng tôi sẽ giúp bạn bảo mật tài khoản.`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: error
                })
            } else {
                return res.status(200).json({
                    message: info.response
                })
            }
        });

        const token = jwt.sign({ _id: user._id }, SECRET_CODE, { expiresIn: "1h" });
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Tạo liên kết xác thực
        // Tạo một password ngẫu nhiên có độ dài là 8 ký tự
        const passwordNew = crypto.randomBytes(4).toString('hex')
        const user: any = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản của bạn không tồn tại",
            });
        }
        // Cập nhật mật khẩu mới và mã hõa của người dùng trong cơ sở dữ liệu
        user.password = await bcrypt.hash(passwordNew, 10); 
        await user.save();
        // Gửi email mật khẩu mới
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${MAIL_USERNAME}`,
                pass: `${MAIL_PASSWORD}`,
            },
        });
        const mailOptions = {
            from: `${MAIL_FROM_ADDRESS}`,
            to: email,
            subject: 'Quên mật khẩu',
            text: `Bạn vừa quên mật phải không ?. Mật khẩu mới của bạn là: ${passwordNew}`,
        };
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({
                    message: error
                })
            } else {
                return res.status(200).json({
                    message: info.response
                })
            }
        });
        return res.status(200).json({
            message: "Chúng tôi đã gửi cho bạn mật khẩu mới",
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
};