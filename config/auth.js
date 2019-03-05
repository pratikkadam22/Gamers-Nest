module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('errormsg', 'Please log in first');
        res.redirect('/users/login');
    }
}