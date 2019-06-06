var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'qdm182656686.my3w.com',
  user     : 'qdm182656686',
  password : '123123123',
  debug: true,
  insecureAuth: true,
  ssl: false,
  authSwitchHandler:function(){
      console.log(arguments)
  }
});

connection.connect(function(err) {
  if (err) {
    console.error('连接错误: ' + err.stack);
    return;
  }

  console.log('连接ID ' + connection.threadId);
});