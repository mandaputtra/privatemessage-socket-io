var socketio = require('socket.io')

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', socket => {
      console.log('coneccted user', socket)
    })

    return io
}