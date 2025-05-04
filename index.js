const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "test",
  user: "postgres",
  password: "9595",
};
const pgp = require("pg-promise")();
const db = pgp(dbConfig);

db.connect()
  .then((obj) => {
    console.log("Connected to the database successfully!");
    obj.done();
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error.message || error);
  });

app.get("/", (req, res) => {
  db.any("SELECT * FROM test_database.users")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message || error });
    });
});

app.get("/array", (req, res) => {
  const array = {
    Users: {
      1: { name: "John", lastname: "Doe" },
      2: { name: "Villi", lastname: "God" },
    },
    Posts: {
      1: { title: "Hola", comment: "mensaje" },
      2: { title: "Hola 2", comment: "mensaje 2" },
    },
  };
  if (res.status(200)) {
    res.status(200).json(array);
  } else {
    res.status(500).json({ error: "Error al obtener la informacion" });
  }
});

app.post("/api/user", (req, res) => {
  const { name, lastname } = req.body;
  db.none("INSERT INTO test_database.users(name, lastname) VALUES($1, $2)", [
    name,
    lastname,
  ])
    .then(() => {
      res.status(200).json({ message: "User added successfully!" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message || error });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
