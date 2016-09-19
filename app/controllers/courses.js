//controller file for "Courses"
//"index" is for the jade template/view called index.jade,
//change when building frontend 

/* GET 'courseList' page */
module.exports.courseList = function(req, res){
  res.render('index', { title: 'Course List' });
};

/* GET 'courseDetails' page */
module.exports.courseDetails = function(req, res){
  res.render('index', { title: 'Course Details' });
};

/* GET 'courseRequests' page */
module.exports.courseRequests = function(req, res){
  res.render('index', { title: 'Course Requests' });
};