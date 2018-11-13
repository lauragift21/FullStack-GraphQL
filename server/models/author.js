const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
});

// connecting the model to a collection in m-lab called Author.
module.exports = mongoose.model('Author', authorSchema);