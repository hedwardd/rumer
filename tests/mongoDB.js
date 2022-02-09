require('dotenv').config();
const mongoose = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO_TEST_URI, dbOptions);
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
