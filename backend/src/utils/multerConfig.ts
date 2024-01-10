import multer from 'multer';
import path from 'path';

const imgDirectory = path.join(__dirname, '../../public/img/')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgDirectory) 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

export default upload;
