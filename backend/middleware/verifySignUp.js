const db = require("../models");
const ROLES = db.role;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "user already registered"
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {

    ROLES.findOne({
      where: {
        id: req.body.roles
      }
    }).then(role => {
      console.log("role find")
      if (!role) {
        res.status(400).send({
          message: "Error! No role find"
        });
        return;
      }
      next();
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  }

  next();
};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Error! El rol " + req.body.roles[i] + " no existe"
//         });
//         return;
//       }
//     }
//   }
//
//   next();
// };

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;