const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const open = require('open');
const keys = require('./config/keys');

require('./models/User');
require('./models/Comment');
require('./models/Feed');
require('./models/Message');
require('./models/Like');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const Message = mongoose.model('messages');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 100,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/feedRoutes')(app);
require('./routes/messageRoutes')(app);
require('./routes/commentRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: "bla"});
});

const PORT = process.env.PORT || 5000; 
//app.listen(PORT);
const server = app.listen(PORT);
// const server = app.listen(PORT, function(err) {  
//   if (err) {
//     console.log(err);
//   } else {
//     open(`http://localhost:${PORT}`);
//   }
// });



const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
 
  socket.on('room', function(data) {
    console.log('in joining room in SERVER')
    socket.join(data.room);

  });

  socket.on('SEND_MESSAGE', function(data) {
    console.log('SEND_MESSAGE');
    console.log(data);

    data.date = new Date().toISOString();
    var newMsg = new Message({ room: data.room, author: data.author, date: data.date, text: data.text});
    data._id = newMsg._id;
    newMsg.save(function(err) {
      if(err) {
        console.log(err);
      }
    });


    socket.to(data.room).emit('RECEIVE_MESSAGE', data);
  })

  socket.on('leave room', function(data) {
    console.log('user left')
    socket.broadcast.to(data.room).emit('user left room', {user: data.user})
    socket.leave(data.room)
  })

});