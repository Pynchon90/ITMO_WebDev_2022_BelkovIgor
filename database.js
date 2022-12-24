const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('user.db', (err) => {
  console.log('> database -> init: err =', err);
  if (err) {
    console.error(err);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text, 
      surname text, 
      email text UNIQUE, 
      password text
      )`, (err) => {
      console.log('err', err);
    });
  }
});

module.exports = db;

module.exports = db;