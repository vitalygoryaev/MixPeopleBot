var TarantoolConnection = require('tarantool-driver');
var conn = new TarantoolConnection({port: 3301});
conn.connect()
.then(function(){
  //auth for login, password
  console.log('connected')
  return conn.auth('worker', 'workwork');
}).then(function(){
  // select arguments space_id, index_id, limit, offset, iterator, key
  return conn.select(512, 0, 1, 0, 'eq', [50]);
})
.then(function(results) {
  console.log(results)
})
.catch(error => console.log(error))

console.log("SUCCESSSSSSSSSS")