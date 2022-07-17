const { authJwt } = require("../middleware");
const controller = require("../controllers/document.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/document/insert",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.insertDocument);
  app.get( "/api/document/all/:companyId",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.documentList);
  app.get( "/api/document/:id",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.selectedDocumentDetails);
  app.get( "/api/document/expiresoon/:companyId",controller.expireSoonDocumentList);
  app.put( "/api/document/status/:id",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.selectedDocumentStatusChange);
  app.put( "/api/document/:id",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.selectedDocumentUpdate);
  app.delete( "/api/document/delete/:id",[authJwt.verifyToken,authJwt.isAdminOrUser],controller.deleteSelectedDocument);

};