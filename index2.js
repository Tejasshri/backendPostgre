const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const { format } = "date-fns";

const { request } = require("http");
const { log } = require("console");

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3005;
const dbPath = path.join(__dirname, "todoApplication.db");
let db;

const initilizeDBAndServer = async () => {
  try {
    db = await new Pool({
      connectionString:
        "postgres://mydb_avgf_user:iLVoIHBWmX6dOScVcGS7SA2ilSpbfWmd@dpg-ckdsqhtjhfbs73803ts0-a.oregon-postgres.render.com/mydb_avgf?ssl=true",
    });
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (err) {
    console.log(`Error occured in Server Starting: ${err}`);
    process.exit(1);
  }
};

initilizeDBAndServer();

const updateTime = async (id) => {
  try {
    const date = new Date();
    const query = `
      UPDATE user_data
      SET last_update = '${date}'
      WHERE id = ${id} ;
    `;
    const response = await db.query(query);
    console.log("Okay");
  } catch (error) {
    console.log(`Error in set datetime ${error}`);
  }
};

const userAuthentication = (request, response, next) => {
  try {
    const authorization = request.headers.authorization;
    let token;
    if (authorization !== undefined) {
      token = authorization.split(" ")[1];
    }
    if (token === undefined) {
      response.status(400);
      response.send({ msg: "Missing Token" });
    } else {
      jwt.verify(token, "XXYY", (err, payload) => {
        if (err) {
          response.status(400);
          response.send({ msg: "Invalid Token" });
        } else {
          request.userId = payload.user_id;
          updateTime(payload.user_id);
          request.username = payload.username;
          next();
        }
      });
    }
  } catch (error) {
    console.log(`Error occured in Middleware: ${error}`);
  }
};

app.post("/register", async (request, response) => {
  setTimeout(() => {
    console.clear();
  }, 15000);
  try {
    const { username, password, mobileNo, dob } = request.body;
    console.log(username, password, mobileNo, dob);
    const checkQuery = `
      SELECT * FROM user_data
      WHERE username = '${username}' OR mobile_no = '${mobileNo}'
    `;
    const dbUser = await db.query(checkQuery);
    console.log(dbUser.rows);
    if (dbUser.rows.length === 0) {
      if (password.length < 7) {
        response.status(400);
        response.send({ msg: "Password is too short" });
      } else if (String(mobileNo).length !== 10) {
        response.status(400);
        response.send({ msg: "Not a valid Number" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const query = `
          INSERT INTO user_data
            (username, password, mobile_no, dob) 
          VALUES
            ('${username}', '${hashPassword}', '${mobileNo}', '${dob}') ;
        `;
        const dbResponse = await db.query(query);
        const lastId = dbResponse.lastID;
        response.send({
          msg: "Registeded Successfully",
        });
      }
    } else {
      const checkNoQuery = `select * from user_data WHERE mobile_no = '${mobileNo}'`;
      const result = await db.query(checkNoQuery);
      if (result.rows.length !== 0) {
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
    const query = `select * from user_data WHERE username = '${username}' `;
    const result = await db.query(query);
    console.log(result.rows);
    if (result.rows.length !== 0) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (isPasswordMatched) {
        const payload = {
          username: result.rows[0].username,
          user_id: result.rows[0].id,
        };
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
  const query = `select * from user_data;`;
  const dbResponse = await db.query(query);
  response.send(dbResponse.rows);
});

app.get(
  "/bookmark/user/name",
  userAuthentication,
  async (request, response) => {
    const encryptedName = btoa(request.username);
    response.send({ value: encryptedName });
  }
);

app.post("/bookmark", userAuthentication, async (request, response) => {
  const {
    webLogo = "",
    url = "",
    displayText = "",
    categoryId = 1,
  } = request.body;
  const { userId } = request;
  console.log("UserId: ", userId);
  console.log(webLogo, url, displayText, categoryId);
  const check = await db.query(`
    SELECT * FROM bookmark
    WHERE url = '${url}' ;
  `);
  if (check.rows.length === 0) {
    const query = ` 
        INSERT INTO bookmark 
          (web_logo, url, display_text, user_id, category_id)
        VALUES
          ('${webLogo}', '${url}', '${displayText}', ${userId}, ${categoryId}) ;
      `;
    const data = await db.query(query);
    response.send({ statusCode: 200, msg: "Bookmark added successfully" });
  } else {
    response.send({ statusCode: 400, msg: "Already exist" });
  }
});

const userCheck = async (request, response, next) => {
  try {
    const { userId } = request;
    const { id } = request.params;
    console.log(id, userId);
    const query = `
      SELECT * FROM bookmark 
      WHERE id = ${id}
    `;
    const dbResponse = await db.query(query);
    console.log(dbResponse.rows);
    if (dbResponse.rows[0].user_id === String(userId)) {
      next();
    } else {
      response.status(400);
      response.send({ msg: "It is not your bookmark", statusCode: 400 });
    }
  } catch (error) {
    console.log(`Error occurd in userbook Middleware: ${error}`);
  }
};

app.delete(
  "/bookmark/del/:id",
  userAuthentication,
  userCheck,
  async (request, response) => {
    const { userId } = request;
    const { id } = request.params;
    const query = ` 
        DELETE FROM bookmark
        WHERE id = ${id} and user_id = ${userId} ;
      `;
    const data = await db.query(query);
    response.send({ statusCode: 200, msg: "Deleted Successfully" });
  }
);

app.get("/bookmark", userAuthentication, async (request, response) => {
  try {
    const query = `
      SELECT 
        id,
        web_logo as webLogo,
        url,
        display_text as displayText,
        category_id as categoryId
      FROM bookmark ;
    `;
    const bookMarkList = await db.query(query);
    response.send(bookMarkList.rows);
  } catch (error) {
    console.log(`Error occured in API: ${error}`);
  }
});

//// Writing Todo APi

app.post("/todolist", async (request, response) => {
  try {
    const { isChecked, work = "" } = request.body;
    const query = `
    INSERT INTO todolist
      (is_checked, work)
    VALUES
      (${isChecked}, '${work}')`;
    const dbResponse = await db.query(query);
    const lastId = dbResponse.lastID;
    response.status = 200;
    response.send({ lastId, statusCode: 200, msg: "Successfully Added" });
  } catch (err) {
    console.log(`Error in API: ${err}`);
  }
});

app.get("/todolist", async (request, response) => {
  const query = `SELECT * FROM todolist`;
  const todos = await db.query(query);
  response.send(todos.rows);
});

app.delete("/todolist/todo/:id", async (request, response) => {
  const { id } = request.params;
  const query = `
  DELETE FROM todolist
  WHERE id = ${id}`;
  await db.query(query);
  response.send({ statusCode: 200, msg: "Deleted" });
});

const adminBlocking = async (request, response, next) => {
  try {
    const { userId } = request;
    const blockingQuery = `SELECT * FROM admin WHERE admin_id = ${userId}`;
    const dbResponse = await db.query(blockingQuery);
    if (dbResponse.rows.length !== 0) {
      next();
    } else {
      response.status(401);
      response.send({ msg: "UnAuthorized" });
    }
  } catch (error) {
    console.log(`Error occured in API: ${error}`);
    response.send({ msg: "Server Error", statusCode: 500 });
  }
};

app.get(
  "/admin/block",
  userAuthentication,
  adminBlocking,
  async (request, response) => {
    try {
      const query1 = "SELECT * FROM bookmark";
      const query2 = "SELECT * FROM user_data";
      const query3 = `SELECT * FROM bookmark FULL JOIN
    user_data ON bookmark.user_id = user_data.id 
    ORDER BY user_data.id ASC`;
      const bookmarkList = await db.query(query1);
      const userList = await db.query(query2);
      const combineList = await db.query(query3);
      response.send({
        bookmarkList: bookmarkList.rows,
        userList: userList.rows,
        combineList: combineList.rows,
      });
    } catch (error) {
      console.log(`Error occured in admin API: ${error}`);
    }
  }
);

app.get("/server/okay", async (request, response) => {
  try {
    console.log('Okay Started')
    response.send({ msg: "Okay Started" });
  } catch (error) {
    console.log(`Error got in Server Check: ${error}`);
  }
});
