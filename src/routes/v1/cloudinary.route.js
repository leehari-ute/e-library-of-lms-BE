const express = require('express');

const router = express.Router();
const fileUploader = require('../../config/cloudinary');

router.post('/', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ url: req.file.path });
});

module.exports = router;
