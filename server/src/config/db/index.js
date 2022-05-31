const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect database successfully!!");
    }
    catch (err) {
        console.log("Connect db err: "  + err.message);
    }
}

module.exports = {
    connect
};