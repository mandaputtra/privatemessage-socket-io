const socketio = require('socket.io')
const { redis, saveUser } = require('./redis')
const { Chat } = require('../models')
const sessionsMap = {}

function updateChat(id, data_from, message) {
  Chat.updateOne( { _id: id }, { $push: { message: {
    from: data_from,
    type: 'Text',
    text: message
    }}
  }, { safe: true, upsert: true }, (err, data) => console.log(data))
}

function createChat(user_a, user_b, message) {
  Chat.create({ user_a, user_b, message: [{
    from: user_b,
    type: 'Text',
    text: message
    }]
  })
}

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
        socket.broadcast.to(receiverId).emit('chat', data.message)
        // find another user with same chat first if there isn't create one
        // TODO: Make room approach
        Chat.findOne({ user_a: data._id, user_b: data.from }, (err, chatdata) => {
          if(err) throw err
          if(chatdata) {
            updateChat(chatdata._id, data.from, data.message)
          } else {
            // find another user with same chat first if there isn't create one
            Chat.findOne({ user_a: data.from, user_b: data._id }, (err, chatdata) => {
              if(err) throw err
              if(chatdata) {
                updateChat(chatdata._id, data.from, data.message)
              } else {
                createChat(data._id, data.from, data.message)
              }
            })
          }
        })
      })

    })
  return io
}