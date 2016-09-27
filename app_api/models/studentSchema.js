//this file is required in the db.js file

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


//defining a schema for teachers
var studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String },
    age: { type: Number, required: true, min: 5, max: 100 },
    summary: { type: String }
});

//compiling the schema into a model
//mongodb collection name for this model will be "teachers"
var Student = module.exports = mongoose.model('Student', studentSchema);

module.exports.createStudents = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.passwrod = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getStudentByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getStudentById = function(id, callback){
	User.findById(id, callback);
}
