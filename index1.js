const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool, Client } = require("pg");
const bodyParser = require("body-parser");

const { request } = require("http");
const { log } = require("console");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//External DB URL:  postgres://mydb_avgf_user:iLVoIHBWmX6dOScVcGS7SA2ilSpbfWmd@dpg-ckdsqhtjhfbs73803ts0-a.oregon-postgres.render.com/mydb_avgf

// const pool = new Pool({
//   host: "postgres://dpg-ckdsqhtjhfbs73803ts0-a.oregon-postgres.render.com",
//   port: 5432,
//   database: "mydb_avgf_user",
//   user: "mydb_avgf",
//   password: "iLVoIHBWmX6dOScVcGS7SA2ilSpbfWmd",
// });

const pool = new Pool({
  connectionString:
    "postgres://mydb_avgf_user:iLVoIHBWmX6dOScVcGS7SA2ilSpbfWmd@dpg-ckdsqhtjhfbs73803ts0-a.oregon-postgres.render.com/mydb_avgf?ssl=true",
});

app.get("/", async (request, response) => {
  try {
    const result = await pool.query(
      "select * from user_details JOIN bookmark ON user_details.id = bookmark.user_id"
    );
    console.log(result.rows);
    response.send(result.rows);
  } catch (err) {
    console.log("Error got in API: ", err);
  }
});

app.get("/bookmark", async (request, response) => {
  try {
    const result = await pool.query(
      "select * from user_details"
    );
    console.log(result.rows);
    response.send(result.rows);
  } catch (err) {
    console.log("Error got in API: ", err);
  }
});

app.post("/", async (request, response) => {
  try {
    const {username, password, mobile_no, dob} = request.body
    console.log(username, password, mobile_no, dob)
    const query = `
    INSERT INTO user_data 
      (username, password, mobile_no, dob)
    VALUES
      ('${username}', '${password}', '${mobile_no}', '${dob}')
    `
    const result = await pool.query(query);
    console.log(result.rows);
    response.send({msg: 'Successfully Registered'});
  } catch (err) {
    console.log("Error got in API: ", err);
  }
});

app.listen(port, () => console.log("Server is running on port: ", port));
