//middleware JWT User
const jwt = require("jsonwebtoken");

const authenticateTokenUser = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    var data = jwt.verify(token, process.env.TOKEN_SECRET);
    if (data.role == 0) {
      next(); // pass the execution off to whatever request the client intended
    } else {
      res.status(403);
      res.send({ message: "UNAUTHORIZED" });
    }
  } catch (err) {
    console.log("UNAUTHORIZED");
    res.status(403);
    res.send({ message: "UNAUTHORIZED" });
  }
};

//middleware JWT ADMIN
//http://localhost/login
//http://localhost/admin/create

//
const authenticateTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    var data = jwt.verify(token, process.env.TOKEN_SECRET);
    if (data.role == 1) {
      next(); // pass the execution off to whatever request the client intended
    } else {
      res.status(403);
      res.send({ message: "UNAUTHORIZED" });
    }
  } catch (err) {
    console.log("UNAUTHORIZED");
    res.status(403);
    res.send({ message: "UNAUTHORIZED" });
  }
};

//middleware JWT Reset Passwod
const authenticateTokenResetPassword = (req, res, next) => {
  const token = req.params.token;
  try {
    var data = jwt.verify(token, process.env.TOKEN_SECRET);
    if (data.reset_password == 1) {
      next();
    } else {
      res.status(403);
      res.send({ message: "UNAUTHORIZED" });
    }
  } catch (err) {
    console.log("UNAUTHORIZED");
    res.status(403);
    res.send({ message: "UNAUTHORIZED" });
  }
};

const generateAccessToken = (username)=> {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

  module.exports = {
    authenticateTokenAdmin,
    authenticateTokenUser,
    authenticateTokenResetPassword,
    generateAccessToken
  };
