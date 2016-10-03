var TarantoolConnection = require('tarantool-driver');
var conn = new TarantoolConnection({host: 'tarantool', port: 3301});
conn.connect()
.then(function(){
  //auth for login, password
  console.log('connected');
  console.log('authenticating as worker:123');
  return conn.auth('worker', '123');
}).then(() => {
    return conn.call('getUser', 'facebook', 12345, 'dima');
})
.then(function(result) {
  console.log(result);
})
.catch(error => console.log(error));