const socketio = require('socket.io')
const { redis, saveUser } = require('./redis')
const { Chat } = require('../models')
const sessionsMap = {}

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', socket => {
      console.log('connected user', socket.id)

      socket.on('join', (payload) => {
        sessionsMap[payload.email] = socket.id;
        console.log(sessionsMap)
      })

      socket.on('send', (payload) => {
        const receiverId = sessionsMap[payload.whoget.email];
        const messageData = {
          message: 'Hello someone chat you',
          sender: payload.sender.email
        };
        socket.broadcast.to(receiverId).emit('send', messageData);
      });

      socket.on('chat', data => {
        const receiverId = sessionsMap[data.email];
        socket.broadcast.to(receiverId).emit('chat', data.message);
        Chat.findOne({ user_a: data._id, user_b: data.from }, (err, chatdata) => {
          if(err) throw err
          if(chatdata) {
            Chat.updateOne( { _id: chatdata._id }, { $push: { message: {
              from: data.from,
              type: 'Text',
              text: data.message
              }}
            }, { safe: true, upsert: true }, (err, data) => console.log(data))
          } else {
            Chat.create({ user_a: data._id, user_b: data.from, message: [{
                from: data.from,
                type: 'Text',
                text: data.message
              }]
            })
          }
        })
      })

    })
  return io
}