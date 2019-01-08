const { User } = require("../models");
const { to, ReE, ReS } = require("../services/util.service");

let isLogedInUser = async (req, res, next) => {
  let err, user;

  [err, user] = await to(User.findOne({ _id: req.user._id }));
  if(err) return ReE(res, "error user not found");

  if(!user) return ReE(res, "User not found");

  userLogin = req.user._id;
  if(userLogin.toString() != user._id.toString())
    return ReE(res, "you dont had permission to update");

  req.user = user;
  next();
}
module.exports.isLogedInUser = isLogedInUser;
