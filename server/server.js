const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const { mongoURI } = require('./config/keys');
const http = require('http');
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const io = require('socket.io').listen(server).sockets;

//Connect to socket.io
io.on('connection', (socket) => {
  console.log('New client connected');

  sendStatus = (s) => {
    socket.emit('status', s);
  }

  //Handle input events
  socket.on('input', (data) => {
    let name = data.name;
    let message = data.message;
    let streamId = data.streamId;
    console.log(data);

    if(name == '' || message == ''){
      sendStatus('Please enter a name and message');
    } else {
      io.emit('output', [data]);

      sendStatus({message: 'Message sent', clear: true});
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

})

// Load Routes
const streams = require('./routes/api/streams');
const users = require('./routes/api/users');


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to mongodb
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/streams', streams);
app.use('/api/users', users);
