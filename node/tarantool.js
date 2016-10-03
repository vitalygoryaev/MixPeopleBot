var TarantoolConnection = require('tarantool-driver');
var conn = new TarantoolConnection({host: 'tarantool', port: 3301});
conn.connect()
.then(function(){
  //auth for login, password
  console.log('connected')
  return conn.auth('worker', 'workwork');
}).then(() => {
    return conn.call('getUser', 'facebook', 12345, 'dima');
})
.then(function(result) {
  console.log(result);
})
.catch(error => console.log(error));
