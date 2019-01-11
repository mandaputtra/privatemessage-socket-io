const { Chat } = require("../models");
const { to, ReE, ReS } = require("../services/util.service");

const find = async (req, res) => {
  const { userid } = req.params;
  let err, chat;

  [err, chat] = await to(Chat.findOne({ $or: {
      user_a: userid, user_b: req.query.f
    }}
  ))
  if (err) return ReE(res, err, 500)

  if(chat) {
    return ReS(res, { data: chat }, 200)
  } else {
    return ReE(res, "no message")
  }
}
module.exports.find = find
