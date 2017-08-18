const mysql = require('nodejs-mysql').default;

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'chat',
};

const db = mysql.getInstance(config);

export function insert(data) {
  db.exec('insert into message set ?', {
    name: data.name,
    message: data.msg,
  });
}

export function loadMessage(callback) {
  db.exec('select * from message').then(rows => callback(rows));
}
