const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { uploadFile, getFile } = require('./s3');
const { isFileSizeValid, isFileTypeValid } = require('./utils');

const upload = multer(); // hold file in memory

const app = express();

// enable CORS request
app.use(cors())

app.get('/images/:key', (req, res) => {
    try {
        const key = req.params.key;
        console.log(`serving file for key: ${key}`);
        const readStream = getFile(key);
        res.type('png');
        res.set('Cache-control', 'public, max-age=604800')  // cache image for 7 days
        readStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(404).send({message: 'Image not found'});
    }
});

app.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
    console.log(file);
    if (!isFileTypeValid(file)){
        console.log(`Bad Request: Invalid file type: ${file.mimetype}`);
        res.status(400).send({message: 'file must be of type .jpeg, .jpg or .png'});
        return;
    } 
    if (!isFileSizeValid(file)) {
        console.log('Bad Request: File size exceeds limit');
        res.status(400).send({message: 'file size must be less than 2 MB'});
        return;
    }
    try {
        const result = await uploadFile(file);
        console.log(result);
        console.log('Success: file uploaded successfully');
        res.send({
            imagePath: `/images/${result.Key}`
        });
    } catch (error) {
        console.error(error.message);
        res.send({message: 'Something went wrong'});
    }
});

app.get('/health', (req, res) => {
    console.log('Entering in health endpoint');
    res.send('OK');
});

module.exports = app;

