import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary';


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'uploads', // Pasta onde os arquivos serão armazenados no Cloudinary
//         allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos de arquivo permitidos

//     },
// });

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 },
    dest: 'uploads' 
});

export { upload };

