//this file is required in the db.js file

var mongoose = require( 'mongoose' );

//defining a schema for teachers
var teacherSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  title: {type: String, required: true},
  location: String,
  summary: {type: String, required: true},
  experience: {type: String, required: true},
  rating: {type: Number, min: 0, max: 5}
});

//compiling the schema into a model
//mongodb collection name for this model will be "teachers"
mongoose.model('Teacher', teacherSchema);