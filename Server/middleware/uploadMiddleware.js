import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to upload multiple images to Cloudinary
const uploadMiddleware = (req, res, next) => {
  upload.array('images', 10)(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return next(); // No files to upload
    }

    try {
      const imageUploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: 'properties' }, // optional folder
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );

          const readableStream = Readable.from(file.buffer);
          readableStream.pipe(uploadStream);
        });
      });

      const uploadedImageUrls = await Promise.all(imageUploadPromises);
      req.body.images = uploadedImageUrls;

      next();
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      return res.status(500).json({
        message: 'Failed to upload images to Cloudinary.',
        error: error.message || error,
      });
    }
  });
};

export default uploadMiddleware;
