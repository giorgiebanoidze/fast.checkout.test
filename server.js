var express = require('express');
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload');
var morgan = require('morgan');
var cors = require('cors');
var db = require('./config');
const http = require('http');
var app = express();
var socketIO = require('socket.io');
var server = http.createServer(app);
const io = socketIO(server);
var users = [];
var offlineUsers = [];
app.get('/get', (req, res) => {
    io.on("connection", socket => {
        console.log("New client connected"), setInterval(
            () => {
                getApiAndEmit(socket);
                socket.on("disconnect", () => console.log("Client disconnected"));
            },
            10000
        );
    });
})


io.on('connection', (socket) => {
    console.log('a user connected---',socket.handshake.query.user_id);
    // var sql = `update user SET is_user_online= 1 where user_id=${socket.handshake.query.user_id}`
    // db.query(sql, (error, result) => {
        console.log('----------------------check socket--------------');
        // console.log(sql.sql);
        users.push(socket.handshake.query.user_id);
        console.log(users);
        io.emit('online', { userIds: socket.handshake.query.user_id, user_status: 'online', onlineUsers: users });
    // });
    socket.on('disconnect', () => {
      console.log('user disconnected');
      console.log('one socket disconnected-------------------------------', socket.handshake.query.user_id);
        //   console.log('io.engine.clientsCount after disconnect' , io.engine.clientsCount);
        // var sql = `update user SET is_user_online= 0 where user_id=${socket.handshake.query.user_id}`
        // db.query(sql, (error, result) => {
            // offlineUsers.push(socket.handshake.query.user_id);
            console.log("offline users--------------");
            var index = users.indexOf(socket.handshake.query.user_id);
            if (index > -1) {
                users.splice(index, 1);
            }
            console.log(users);
            // console.log('+++++++++++++++++++++++++check socket+++++++++++++++++++++++++');
            io.emit('online', { userIds: socket.handshake.query.user_id, user_status: 'offline',  onlineUsers: users  });
        // })
    });

    socket.on('typing', (data)=>{
        console.log("we are in typing.................");
        console.log(data);
    //     if(data.typing==true)
    //        io.emit('display', data)
    //     else
    //        io.emit('display', data)
      })
  });


var routes = require('./router/router')

app.use(function (req, res, next) {
    console.log('here in app.use');
    res.io = io;
    next();
});


app.use(function(req, res, next) {
var allowedOrigins = ['http://localhost:8080/api/','http://localhost:3000/'];
var origin = req.headers.origin;
if(allowedOrigins.indexOf(origin) > -1){
       // res.setHeader('Access-Control-Allow-Origin', origin);
}
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.header('Access-Control-Allow-Credentials', true);
return next();
});

// enable files upload
app.use(express.static('public')); //to access the files in public folder
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api', routes);



app.get('/fast/v1/create', (request, response) => {
  // 1. entity_type: the type of entity being created

  // 2. possible values: ["ENTITY_ORDER"]
  // order: wrapper object for the order. metadata is kept in the top level outside of the inner order
  
  // 3. is_cart: boolean indicating if order is in cart phase
  // 4. request_id: idempotency key of request. ensure that your operations are idempotent against this field
  // 5. app_id: store identifier within fast
})
app.post('/fast/v1/read', (req, res) => {
  // 1. entity_type: the type of entity being read

  // possible values: ["ENTITY_ORDER", "ENTITY_SHIPPING_OPTION"]
  // 2. order: FastOrder data entity
  
  //  - is_cart: boolean indicating if the order is in cart phase
  //  - rder_id: uuid value string that is the fast unique identifier
  //  - externalorderid: the seller or integrators order_id
  // 3. app_id: store identifier within fast
})
app.post('/fast/v1/update', (req, res) => {
  // 1. entity_type: the type of entity being updated

  //  Possible values: ["ENTITY_ORDER"]
  // 2. order: FastOrderUpdateRequest data entity
  // 3. request_id: idempotency key
  // 4. app_id: store identifier within fast
})
app.post('/fast/v1/delete', (req, res) => {
  // 1. entity_type: the type of entity being updated

  //  Possible values: ["ENTITY_ORDER"]
  // 2. entity: wrapper object for the request

  //  order: FastOrderDeleteRequest data entity
  // 3. request_id: idempotency key
})

server.listen(8080, () => {
	console.log('GEMS Server is running on 8080 Port Number')
})

