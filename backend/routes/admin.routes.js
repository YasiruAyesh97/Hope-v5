const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/admin/user-list/:id",[authJwt.verifyToken,authJwt.isAdmin], controller.regularUsersList);
  app.post("/api/admin/add",[authJwt.verifyToken,authJwt.isAdmin], controller.regularUserRegister);
  app.put( "/api/admin/status/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.selectedRegularUserStatusChange);
  app.delete("/api/admin/delete-user/:id",[authJwt.verifyToken,authJwt.isAdmin], controller.deleteSelectedRegularUser);
};