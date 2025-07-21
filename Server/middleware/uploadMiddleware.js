import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary (ensure environment variables are set)
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for uploading multiple images to Cloudinary
const uploadMiddleware = (req, res, next) => {
  // Use upload.array to handle multiple files from a field named 'images'
  upload.array('images', 10)(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    // If no files are attached, move to the next middleware
    if (!req.files || req.files.length === 0) {
      return next();
    }

    try {
      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinaryV2.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result.secure_url);
            }
          );
          const stream = Readable.from(file.buffer);
          stream.pipe(uploadStream);
        });
      });

      // Wait for all uploads to complete
      const imageUrls = await Promise.all(uploadPromises);
      
      // Attach the array of URLs to the request body
      req.body.images = imageUrls;
      
      next();
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      res.status(500).json({ message: 'Failed to upload images to Cloudinary.', error });
    }
  });
};

export default uploadMiddleware;

