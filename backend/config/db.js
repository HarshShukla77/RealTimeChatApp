const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDb connected : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;