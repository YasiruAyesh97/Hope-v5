const { authJwt } = require("../middleware");
const controller = require("../controllers/catalog3.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/catalog3/insert",[authJwt.verifyToken,authJwt.isAdmin],controller.insertCatalog1);
  app.get("/api/catalog3/all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.catalog1List);
  app.get("/api/catalog3/active-all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.activeCatalog1List);
  app.put("/api/catalog3/status/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.selectedCatalog1StatusChange);
  app.delete("/api/catalog3/delete/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.deleteSelectedCatalog);

};