//this file is required in the db.js file

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Course = mongoose.model("Course");
var Schema = mongoose.Schema;

//defining a schema for teachers
var teacherSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    title: { type: String },
    location: String,
    summary: { type: String, required: true },
    experience: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    courses: [{type: Schema.Types.ObjectId, ref: Course}]
});

//compiling the schema into a model
//mongodb collection name for this model will be "teachers"
var Teacher = module.exports = mongoose.model('Teacher', teacherSchema);

module.exports.createTeachers = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.passwrod = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getTeacherByUsername = function(username, callback){
	var query = {username: username};
	Teacher.findOne(query, callback);
}

module.exports.getTeacherById = function(id, callback){
	Teacher.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}