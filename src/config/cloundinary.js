import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Product from '../models/product';

// Khởi tạo app và cấu hình cloudinary
const app = express();
cloudinary.v2.config({
  cloud_name: 'dpy2w5vus',
  api_key: '963653836188253',
  api_secret: 'TPbr8e-zww2LUEouD1KDtT-oW1I'
});

// Thiết lập multer storage
const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'duancanhan',
  params: {
    format: async (req, file) => 'png', // thay đổi định dạng của ảnh
    public_id: (req, file) => 'computed-filename-using-request-fields',
  },
});

// Thiết lập multer và routes
const upload = multer({ storage });

app.post('/upload', upload.array('photos', 10), async (req, res, next) => {
  try {
    // req.files sẽ chứa thông tin các files đã được upload lên cloudinary
    const result = await Promise.all(req.files.map(file => cloudinary.v2.uploader.upload(file.path)));
    const photoPublicIds = result.map(item => item.public_id); // Lấy public_id của các ảnh đã upload lên cloudinary
    const { name, price, description } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      images: photoPublicIds, // Lưu thành một mảng public_id
    });
    res.send(`Thêm sản phẩm ${product.name} thành công.`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server, vui lòng thử lại sau.');
  }
});
