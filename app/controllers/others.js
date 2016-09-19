//controller file for "Others"

/* GET 'home' page */
module.exports.edumaHome = function(req, res){
  res.render('index', { title: 'Eduma Home' });
};

/* GET 'about' page */
module.exports.about = function(req, res){
  res.render('index', { title: 'About' });
};