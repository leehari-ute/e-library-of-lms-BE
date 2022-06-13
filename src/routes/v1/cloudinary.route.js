const express = require('express');
const cloudinary = require('cloudinary').v2;

const router = express.Router();
const fileUploader = require('../../config/cloudinary');

router.post('/', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ url: req.file.path });
});

router.post('/uploadRaw', fileUploader.single('file'), async (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'raw' }, async function (error, result) {
    if (error) return res.status(400).send(error);
    return res.status(200).send(result);
  });
});

module.exports = router;
