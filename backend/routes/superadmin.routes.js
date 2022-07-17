const { authJwt } = require("../middleware");
const controller = require("../controllers/superadmin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post(
  //   "/api/auth/signup",
  //   [
  //     // verifySignUp.checkDuplicateUsernameOrEmail,
  //     // verifySignUp.checkRolesExisted
  //   ],
  //   controller.signup
  // );
  //
  app.get("/api/super-admin/user-list",[authJwt.verifyToken,authJwt.isSuperAdmin],controller.usersList);
  app.post("/api/super-admin/selected-user",[authJwt.verifyToken,authJwt.isSuperAdmin], controller.selectedUser);
  app.put("/api/super-admin/edit-user/:id",[authJwt.verifyToken,authJwt.isSuperAdmin], controller.selectedUserEdit);
  app.put("/api/super-admin/status/:id",[authJwt.verifyToken,authJwt.isSuperAdmin], controller.selectedRUserAdminStatusChange);
  app.delete("/api/super-admin/delete-user/:id",[authJwt.verifyToken,authJwt.isSuperAdmin], controller.deleteSelectedUser);
};