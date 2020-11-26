const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;

let connection;
const connect = async () => {
  try {
    connection = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
    });
    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
