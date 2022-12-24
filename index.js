// console.log("Welcome Node");

// let count = 0;

// const func = () => {
//   console.log(`Counter ${++count}`);
//   if (count > 3) clearInterval(intervalId);
// }

// const intervalId = setInterval(func, 1000);

require('dotenv').config();

const express = require('express');
const fs = require('node:fs/promises');
const sqlDB = require('./database.js');
const app = express();

async function saveDB() {
  await fs.writeFile('./db.json', JSON.stringify(db));
}

process.on("exit", () => {
  console.log("Goodbay Node");
})

app.use('/site', express.static('public'))

app.get('/', (req, res) => {
  const { name } = req.query;
  res.send(`
    Welcome ${name} to users application!
    ${JSON.stringify(db.users)}
    <form  action="/users" method="post">
      <div class="form-example">
        <label for="name">Enter your name: </label>
        <input id="btnSubmit" type="text" name="name" id="name" required>
        <label for="surname">Enter your name: </label>
        <input type="text" name="surname" id="surname" required>
      </div>
      <div class="form-example">
        <input type="submit" value="Submit!">
      </div>
      
    </form>
    <script>
      document.getElementById('btnSubmit').onkeyup = () => console.log("Clicked");
    </script>
  `);
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.get('/users', (req, res) => {
  const sql ='SELECT * FROM user';
  sqlDB.all(sql, [], (err, rows) => {
    console.log("SELECT -> err:", err);
    console.log("SELECT -> rows:", rows);
    if (err) {
      res.status(500).json({"error":err.toString()});
    } else res.status(200).json({ rows: rows });
  });
});

app.post('/users', async (req, res) => {
  const data = req.body;
  const errors=[]
  if (!data.name){
    errors.push("No name specified");
  }
  if (!data.password){
    errors.push("No password specified");
  }
  if (!data.email){
    errors.push("No email specified");
  }
  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }
  const sql ='INSERT INTO user (name, surname, email, password) VALUES (?,?,?,?)'
  console.log(data);
  sqlDB.run(sql, [data.name, data.surname, data.email, data.password], (err) => {
    if (err) {
      console.log('INSERT error:', err);
      res.status(500).json({"error":err.toString()});
    } else {
      res.status(200).json({ "ok": true });
    }
  })
});

// app.get('/users/:id', (req, res) => {
//   const userId = parseInt(req.params.id);
//   console.log('> userId', userId);
//   const user = db.users.find((user) => user.id === userId);
//   if (user) res.status(200).json(user);
//   else res.status(500).json({ message: `User with id(${userId}) not found` });
// });

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log('> userId', userId);
  const sql ='SELECT * FROM user WHERE id=?';
  sqlDB.get(sql, [userId], (err, row) => {
    console.log("SELECT ID -> err:", err);
    console.log("SELECT ID -> row:", row);
    if (err) {
      res.status(500).json({"error":err.toString()});
    } else res.status(200).json({ data: row });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  console.log('> userId', userId);
  const sql ='DELETE FROM user WHERE id=?';
  sqlDB.run(sql, [userId], (err) => {
    console.log("DELETE ID -> err:", err);
    if (err) {
      res.status(500).json({"error":err.toString()});
    } else res.status(200).json({ ok: true });
  });
});

// to support URL-encoded bodies
app.use((req, res, next) => {
  res.status(404).send(
      `
      <h1>Wrong URL</h1>
      <a href="/">Home</a>
      `
  )
});

let db;

app.listen(process.env.PORT || 3000, async () => {
  try {
    db = JSON.parse(await fs.readFile('./db.json', 'utf8'));
  } catch (e) {
    db = {
      users: []
    };
    saveDB();
  }

  console.log(`Example app listening on port ${process.env.PORT}`, db)
});