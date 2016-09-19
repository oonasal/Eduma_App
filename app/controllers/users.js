//controller file for "Users"
//"index" is for the jade template/view called index.jade,
//change when building frontend 

/* GET 'teacherList' page */
module.exports.teacherList = function(req, res){
  res.render('index', { title: 'Teachers' });
};

/* GET 'teacherDetails' page */
module.exports.teacherDetails = function(req, res){
  res.render('index', { title: 'Teacher Details' });
};

/* GET 'teacherReviews' page */
module.exports.teacherReviews = function(req, res){
  res.render('index', { title: 'Teacher Reviews' });
};

/* GET 'studentDetails' page */
module.exports.studentDetails = function(req, res){
  res.render('index', { title: 'Student Details' });
};
