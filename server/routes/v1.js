/* eslint-disable */

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const HomeController = require('../controllers/home.controller');


const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/users/register', UserController.create);                                                     // C
router.get('/users', passport.authenticate('jwt', { session:false }), UserController.get);        // R
router.get('/users/getall', passport.authenticate('jwt', { session:false }), UserController.getAll);        // R
router.get('/users/:id', passport.authenticate('jwt', { session:false }), UserController.getOne);        // R
router.put('/users', passport.authenticate('jwt', { session:false }), custom.isLogedInUser, UserController.update);     // U
router.delete('/users', passport.authenticate('jwt', { session:false }), custom.isLogedInUser, UserController.remove);  // D
router.post('/users/login', UserController.login);

// Chat app
router.post('/chat/:store/:customer', passport.authenticate('jwt', {session: false}), UserController.get);

router.get('/dash', passport.authenticate('jwt', {session:false}), HomeController.Dashboard);

//********* API DOCUMENTATION **********
module.exports = router;
