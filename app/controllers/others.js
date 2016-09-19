//controller file for "Others"
//"index" is for the jade template/view called index.jade,
//change when building frontend 

/* GET 'home' page */
module.exports.edumaHome = function(req, res){
  res.render('index', { title: 'Eduma Home' });
};

/* GET 'about' page */
module.exports.about = function(req, res){
  res.render('index', { title: 'About' });
};