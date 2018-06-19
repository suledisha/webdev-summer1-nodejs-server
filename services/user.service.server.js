module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/register', findUserByUsername)
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateProfile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);

    var userModel = require('../models/user/user.model.server');

    function login(req,res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user){
                if(user==null){
                    res.json({
                        _id: -1
                    })
                }
                else {
                    req.session['currentUser'] = user;
                    res.json(user);
                }
            })
    }

    function findUserByUsername(req,res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user){
                if(user==null){
                    res.json({
                        _id: -1
                    })
                }
                else {
                    res.json(user);
                }
            })
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

   function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function updateProfile(req,res) {
        var user = req.body;
        userModel
            .updateUser(user)
            .then(function () {
                req.session['currentUser']=user;
                res.json(user);
            })
    }

}