"use strict";

var TarantoolConnection = require('tarantool-driver');
var conn = new TarantoolConnection({host: 'tarantool', port: 3301});

function get(user, password) {
  let self = this;

  return conn.connect()
  .then(function(){
    //auth for login, password
    console.log('connected');
    console.log(`authenticating as ${user}:${password}`);
    return conn.auth(user, password);
  }).then(() => {
    self.connection = conn;
    console.log(`authenticated`);

    return {
      getUser: getUser.bind(self),
      next: next.bind(self),
      unlinkAndStop: unlinkAndStop.bind(self),
      link: link.bind(self)
    }
  })
  .catch(console.warn);
}

function getUser(vendor, vendorUserId, name) {
  let connection = this.connection;

  return conn.call('getUser', vendor, vendorUserId, name);
}

function next(userId) {
  
}

function unlinkAndStop(userId) {
  
}

function link(userId) {

}

module.exports = {
	get: get
}