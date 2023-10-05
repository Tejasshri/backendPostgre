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

const pool = new Pool({
  host: "postgres://dpg-ckdsqhtjhfbs73803ts0-a.oregon-postgres.render.com",
  port: 5432,
  database: "mydb_avgf_user",
  user: "mydb_avgf",
  password: "iLVoIHBWmX6dOScVcGS7SA2ilSpbfWmd",
});

app.get("/", async (request, response) => {
  try {
    const result = await pool.query(
      "select * from user_details JOIN bookmark ON user_details.id = bookmark.user_id"
    );
    console.log(result);
    response.send(result.rows);
  } catch (err) {
    console.log("Error got in API: ", err);
  }
});

app.listen(port, () => console.log("Server is running on port: ", port));
