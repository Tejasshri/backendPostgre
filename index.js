const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const userAuthentication = (request, response, next) => {
  try {
    const authorization = request.headers.authorization;
    let token;
    if (authorization !== undefined) {
      token = authorization.split(" ")[1];
    }
    if (token === undefined) {
      response.status(400);
      response.send({ msg: "Invalid Token" });
    } else {
      jwt.verify(token, "XXYY", (err, payload) => {
        if (err) {
          response.status(400);
          response.send({ msg: "Invalid Token" });
        } else {
          request.userId = payload.user_id;
          request.username = payload.username;
          next();
        }
      });
    }
  } catch (error) {
    console.log(`Error occured in Middleware: ${error}`);
  }
};

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

app.get("/bookmark", userAuthentication, async (request, response) => {
  try {
    const query = `
      SELECT 
        id,
        web_logo as webLogo,
        url,
        display_text as displayText
      FROM bookmark ;
    `;
    const bookMarkList = await db.all(query);
    response.send(bookMarkList);
  } catch (error) {
    console.log(`Error occured in API: ${error}`);
  }
});

app.post("/bookmark", userAuthentication, async (request, response) => {
  const { webLogo = "", url = "", displayText = "" } = request.body;
  console.log(webLogo, url, displayText);
  const check = await db.get(`
    SELECT * FROM bookmark
    WHERE url = '${url}' ;
  `);
  if (check === undefined) {
    const query = ` 
        INSERT INTO bookmark 
          (web_logo, url, display_text)
        VALUES
          ('${webLogo}', '${url}', '${displayText}') ;
      `;
    const data = await db.run(query);
    response.send({ statusCode: 200, msg: "Bookmark added successfully" });
  } else {
    // esponse.status(400);
    response.send({ statusCode: 400, msg: "Already exist" });
  }
});

app.delete(
  "/bookmark/del/:id",
  userAuthentication,
  async (request, response) => {
    const { id } = request.params;
    const query = ` 
        DELETE FROM bookmark
        WHERE id = ${id} ;
      `;
    const data = await db.run(query);
    response.send({ statusCode: 200, msg: "Deleted Successfully" });
  }
);

app.post("/register", async (request, response) => {
  setTimeout(() => {
    console.clear();
  }, 15000);
  try {
    const { username, password, mobileNo, dob } = request.body;
    console.log(username, password, mobileNo, dob);
    const checkQuery = `
      SELECT * FROM user 
      WHERE username = '${username}' OR mobile_no = ${mobileNo}
    `;
    const dbUser = await db.get(checkQuery);
    if (dbUser === undefined) {
      if (password.length < 7) {
        response.status(400);
        response.send({ msg: "Password is too short" });
      } else if (String(mobileNo).length !== 10) {
        response.status(400);
        response.send({ msg: "Not a valid Number" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const query = `
          INSERT INTO user 
            (username, password, mobile_no, dob) 
          VALUES
            ('${username}', '${hashPassword}', ${mobileNo}, '${dob}') ;
        `;
        const dbResponse = await db.run(query);
        const lastId = dbResponse.lastID;
        response.send({
          msg: "Registeded Successfully",
        });
      }
    } else {
      const checkNoQuery = `select * from user WHERE mobile_no = ${mobileNo}`;
      const result = await db.get(checkNoQuery);
      if (result !== undefined) {
        response.status(400);
        response.send({ msg: "Mobile number registed already try another" });
      } else {
        response.status(400);
        response.send({ msg: "Username already exists" });
      }
    }
  } catch (error) {
    console.log("Error occured in API: ", error);
  }
});

app.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;
    const query = `select * from user WHERE username = '${username}' `;
    const result = await db.get(query);
    if (result !== undefined) {
      const isPasswordMatched = await bcrypt.compare(password, result.password);
      if (isPasswordMatched) {
        const payload = { username: result.username, user_id: result.id };
        const jwtToken = jwt.sign(payload, "XXYY");
        response.send({ jwtToken });
      } else {
        response.status(400);
        response.send({ msg: "Wrong Password" });
      }
    } else {
      response.status(400);
      response.send({ msg: "Invalid Username" });
    }
  } catch (error) {
    console.log(`Error occured in API: ${error}`);
  }
});

app.get("/check/pass/my", userAuthentication, async (request, response) => {
  const query = `select * from user;`;
  const dbResponse = await db.all(query);
  response.send(dbResponse);
});

app.get(
  "/bookmark/user/name",
  userAuthentication,
  async (request, response) => {
    const encryptedName = btoa(request.username);
    response.send({ value: encryptedName });
  }
);
