const { to, ReE, ReS } = require('../services/util.service');

const chatroom = function(req, res){
	let user = req.user.id;
	return res.json({ success:true, message:'it worked', data: user });
}
module.exports.chatroom = chatroom;



