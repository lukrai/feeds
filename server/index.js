const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Comment');
require('./models/Feed');
require('./models/Like');
require('./services/passport');

mongoose.connect(keys.mongoURI);

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
require('./routes/commentRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: "bla"});
});

const PORT = process.env.PORT || 5000; 
//app.listen(PORT);

const server = app.listen(PORT, function(err) {  
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${PORT}`);
  }
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {  
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});