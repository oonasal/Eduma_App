//this file is required in the db.js file

var mongoose = require( 'mongoose' );

//defining a schema for teachers
var studenSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  title: {type: String, required: true},
  location: String,
  age: {type:Number, required: true, min:5, max:100}
  summary: {type: String, required: true}
});

//compiling the schema into a model
//mongodb collection name for this model will be "teachers"
mongoose.model('Student', studentSchema);