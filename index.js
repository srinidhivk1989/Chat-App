var express=require('express');
var socket=require('socket.io');

//App setup
var app = express();
var server = app.listen(process.env.PORT || 4000,function(){
  console.log("Listening to request on port 4000");
});
app.use(express.static('public'));
//socket set up
var io=socket(server);
io.on('connection',function(socket){
  console.log("connection made",socket.id);

  socket.on('chat',function(data){
    io.sockets.emit('chat',data);
  });
  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data)
  });
});
