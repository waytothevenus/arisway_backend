const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
  },
});

const Category = mongoose.model('category', CategorySchema);
export default Category;
