const { authJwt } = require("../middleware");
const controller = require("../controllers/catalog2.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/catalog2/insert",[authJwt.verifyToken,authJwt.isAdmin],controller.insertCatalog2);
  app.get("/api/catalog2/all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.catalog2List);
  app.get("/api/catalog2/active-all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.activeCatalog2List);
  app.put("/api/catalog2/status/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.selectedCatalog1StatusChange);
  app.delete("/api/catalog2/delete/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.deleteSelectedCatalog);

};