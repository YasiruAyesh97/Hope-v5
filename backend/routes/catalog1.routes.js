const { verifySignUp ,authJwt} = require("../middleware");
const controller = require("../controllers/catalog1.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/catalog1/insert",[authJwt.verifyToken,authJwt.isAdmin],controller.insertCatalog1);
  app.get( "/api/catalog1/all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.catalog1List);
  app.get( "/api/catalog1/active-all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.activeCatalog1List);
  app.put( "/api/catalog1/status/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.selectedCatalog1StatusChange);
  app.delete( "/api/catalog1/delete/:id",[authJwt.verifyToken,authJwt.isAdmin],controller.deleteSelectedCatalog);

};