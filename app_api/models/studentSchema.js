//this file is required in the db.js file

var mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//defining a schema for students
var studentSchema = new mongoose.Schema({
    //studentId: {type: Number, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    //username: { type: String, required: true },
    email: { type: String, required: true },
    //title: { type: String },
    age: { type: Number },
    summary: { type: String },
    location: {type: String},
    role: {type: String, required: true},
    hash: {type: String},
    salt: {type: String}
});

//generating salt and hash for users based on their password
studentSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    //this.save();
};

//validating a submitted password (hashing and comparing to stored value)
studentSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;    
};

//generating a json web token 
studentSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // token is saved for 7 days

    return jwt.sign({
        _id : this._id,
        email: this.email,
        //name: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role,
        age: this.age,
        location: this.location,
        summary: this.summary,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};

//compiling the schema into a model
//mongodb collection name for this model will be "teachers"
mongoose.model('Student', studentSchema);

//NEEDED?
/*var Student = module.exports = mongoose.model('Student', studentSchema);

module.exports.createStudents = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getStudentByUsername = function(username, callback){
    var query = {"username": username};
    return Student.findOne(query, callback);
};

module.exports.getStudentByStudentId = function(studentId, callback){
    var query = {"studentId": studentId};
    return Student.findOne(query, callback);
};

module.exports.getStudentById = function(id, callback){
    Student.findById(id, callback);
};*/


