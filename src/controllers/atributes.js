import Atribute from "../models/atributes.js";

export const getAllAtribute = async (req, res) => {
    try {
        const atribute = await Atribute.find().populate("Product_id");
        if (atribute.length === 0) {
            return res.json({
                message: "Không có thuộc tính nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: atribute
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const getOneAtribute = async function (req, res) {
    try {
        const atribute = await Atribute.findById(req.params.id).populate("Product_id");
        if (!atribute) {
            return res.json({
                message: "Không có thuộc tính nào",
            });
        }
        return res.status(200).json({
            message: "thành công",
            data: atribute
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const createAtribute = async function (req, res) {
    try {
        const { error } = Atributechema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const atribute = await Atribute.create(req.body);
        if (!atribute) {
            return res.status(404).json({
                message: "Không thêm được thuộc tính",
            });
        }
        return res.status(200).json({
            message: "Thêm thuộc tính thành công",
            data: atribute
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updateAtribute = async function (req, res) {
    try {
        const atribute = await Atribute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!atribute) {
            return res.status(404).json({
                message: "Cập nhật thuộc tính không thành công",
            });
        }
        return res.status(200).json({
            message: "Cập nhật thuộc tính thành công",
            data: atribute
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const removeAtribute = async function (req, res) {
    try {
        const atribute = await Atribute.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Xóa thuộc tính thành công",
            data: atribute,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};