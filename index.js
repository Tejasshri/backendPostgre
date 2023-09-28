const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const path = require("path");
const { request } = require("http");
const { log } = require("console");

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3004;
const dbPath = path.join(__dirname, "todoApplication.db");
let db;

const initilizeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (err) {
    console.log(`Error occured in Server Starting: ${err}`);
    process.exit(1);
  }
};

initilizeDBAndServer();

app.post("/", async (request, response) => {
  try {
    const { isChecked, work = "" } = request.body;
    const query = `
    INSERT INTO mytodo
      (is_checked, work)
    VALUES
      (${isChecked}, '${work}')`;
    const dbResponse = await db.run(query);
    const lastId = dbResponse.lastID;
    response.status = 200;
    response.send({ lastId, statusCode: 200, msg: "Successfully Added" });
  } catch (err) {
    console.log(`Error in API: ${err}`);
  }
});

app.get("/", async (request, response) => {
  const query = `SELECT * FROM mytodo`;
  const todos = await db.all(query);
  response.send(todos);
});

app.delete("/todo/:id", async (request, response) => {
  const { id } = request.params;
  const query = `
  DELETE FROM mytodo
  WHERE id = ${id}`;
  await db.run(query);
  response.send({ statusCode: 200, msg: "Deleted" });
});

app.delete("/delete/all", async (request, response) => {
  const query = `DELETE FROM mytodo WHERE 0 = 0`;
  await db.run(query);
  response.send({ statusCode: 200, msg: "Deleted ALL" });
});

app.put("/todo/:id", async (request, response) => {
  const { id } = request.params;
  const { isChecked } = request.query;
  const query = `
    UPDATE mytodo 
    SET is_checked = ${isChecked}
    WHERE id = ${id}
  `;
  await db.run(query);
  response.send({ statusCode: 200, msg: "Updated Successfully" });
});
