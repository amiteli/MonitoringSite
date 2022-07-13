const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { users } = require("./users/users");
const JWT = require("jsonwebtoken");
const fs = require("fs");

const TIME_MODE = 3; // change to number 2 when working in winter
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((oneUserInArr) => {
    return (
      oneUserInArr.username === username && oneUserInArr.password === password
    );
  });
  if (user) {
    //Generate a JSON-WEB-TOKEN to the user
    const accessToken = JWT.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      unitAccess: user.unitAccess,
      accessToken,
    });
  } else res.status(400).json("Username or password incorrect");
});

// VERIFYING-JWT
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // authHeader = "bearer AUTH_KEY"
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, payload) => {
      if (err) return res.status(403).json("Token is not valid!");
      //   req.user = payload;
      next();
    });
  } else {
    res.status(401).json("Authorization not allowed");
  }
};

app.get("/api/users", verifyJWT, (req, res) => {
  res.status(200).json("good by here");
});

app.get("/radioStates/:id", (req, res) => {
  const { id } = req.params;
  // To read as a text file, you have to specify the correct
  // encoding.
  try {
    fs.readFile(
      `./RCGW/json files/${id}/communication 0.json`,
      "utf8",
      (err, data) => {
        // You should always specify the content type header,
        // when you don't use 'res.json' for sending JSON.
        res.set("Content-Type", "application/json");
        res.send(JSON.parse(data));
      }
    );
  } catch (err) {
    res.send(JSON.parse(err));
  }
});

app.get("/headerList", (req, res) => {
  // To read as a text file, you have to specify the correct
  // encoding.
  fs.readFile("././RCGW/json files/headerList.json", "utf8", (err, data) => {
    // You should always specify the content type header,
    // when you don't use 'res.json' for sending JSON.
    res.set("Content-Type", "application/json");
    res.send(JSON.parse(data));
  });
});

app.get("/userController/:id", (req, res) => {
  const { id } = req.params;
  // To read as a text file, you have to specify the correct
  // encoding.
  fs.readFile(
    `././RCGW/json files/userController/${id}.json`,
    "utf8",
    (err, data) => {
      // You should always specify the content type header,
      // when you don't use 'res.json' for sending JSON.
      res.set("Content-Type", "application/json");
      res.send(JSON.parse(data));
    }
  );
});

app.get("/api/charts/rcgw-chart-data/:id", (req, res) => {
  const { id } = req.params;
  // To read as a text file, you have to specify the correct
  // encoding.
  fs.readFile(
    `./RCGW/json files/statistics/${id}.json`,
    "utf8",
    (err, data) => {
      // You should always specify the content type header,
      // when you don't use 'res.json' for sending JSON.
      res.set("Content-Type", "application/json");
      // console.log(data);
      res.send(JSON.parse(data));
    }
  );
});

app.get("/api/last-modified-date/:id", (req, res) => {
  const { id } = req.params;

  fs.stat(`./RCGW/json files/${id}/communication 0.json`, (err, stats) => {
    if (err) {
      console.log(err);
      res.status(403).json(err);
    } else {
      let lastModifiedTime = JSON.stringify(stats.mtime);
      lastModifiedTime = lastModifiedTime
        .split(".")[0]
        .replaceAll('"', "")
        .split("T");
      let date = lastModifiedTime[0].split("-");
      let day = date.pop();
      let month = date.pop();
      let year = date;
      lastModifiedTime[0] = `${day}/${month}/${year}`;

      let time = lastModifiedTime[1].split(":");
      let hours = (parseInt(time[0].replace("0", "")) + TIME_MODE) % 24;
      let minutes = time[1];
      let seconds = time[2];
      lastModifiedTime[1] = `${hours}:${minutes}:${seconds}`;
      console.log(lastModifiedTime[1]);
      res.status(200).json(lastModifiedTime);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/api/users`);
  console.log(`get headerList from http://localhost:${PORT}/headerList`);
});
