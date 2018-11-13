const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

// connecting the model to a collection in m-lab called Book.
module.exports = mongoose.model('Book', bookSchema);