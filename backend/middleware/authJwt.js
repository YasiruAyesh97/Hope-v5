const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token found"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Invalid token"
      });
    }
    // let dateNow = new Date();
    // if(decoded.exp < Math.round(dateNow.getTime()/1000)){
    //   return res.status(403).send({
    //     message: "Expire token"
    //   });
    // }
    req.userId = decoded.id;
    next();
  });
};

isSuperAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superadmin") {
          console.log("superadmin comes")
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Se requiere rol admin!"
      });
      return;
    }) .catch(err => {
      res.status(500).send({ message: err.message });
    });
  });
};

isAdmin = (req, res, next) => {

  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Se requiere rol moderador!"
      });
    }) .catch(err => {
      res.status(500).send({ message: err.message });
    });;
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Se requiere un rol de moderador o de admin!"
      });
    }) .catch(err => {
      res.status(500).send({ message: err.message });
    });;
  });
};

isAdminOrUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user" ||roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Se requiere un rol de moderador o de admin!"
      });
    }) .catch(err => {
      res.status(500).send({ message: err.message });
    });;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isSuperAdmin: isSuperAdmin,
  isAdmin: isAdmin,
  isUser: isUser,
  isAdminOrUser:isAdminOrUser,

};

module.exports = authJwt;