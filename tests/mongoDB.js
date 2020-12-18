require('dotenv').config();
const mongoose = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = {
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO_URI, dbOptions);
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
