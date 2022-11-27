const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: process.env.maxPoolSize,
};

mongoose.connect("mongodb+srv://admin:admin@cluster0.jojfycv.mongodb.net/?retryWrites=true&w=majority", options, (err, res) => {
  if (err) {
    console.error('MongoDB Connection Failed');
    console.error(err);
  } else {
    console.log('MongoDB Connected');
  }
});

module.exports = mongoose;
