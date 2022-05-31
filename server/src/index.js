const express = require('express');
const port = 5000;
const app = express();
const route = require('./routes');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const convertToSlug = require('./utils/convertToSlug');
// log all request to server
app.use(morgan('combined'));

require('dotenv').config();
const db = require('./config/db');

// Connect database
db.connect();

// Allow json on request
app.use(express.json());

// Make static folder images
app.use(express.static(path.join(__dirname, '../public')));


// init route
route(app);


// upload file


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        // cb(null, "hello.png");
        cb(null, convertToSlug(req.body.name));

    },
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

// done

app.listen(port, () => {
    // console.log(`listening on http://localhost:${port}`);
    console.log("Backend is running at: " + process.env.SERVER_URL);
});

