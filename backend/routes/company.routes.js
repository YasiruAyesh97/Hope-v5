const { authJwt } = require("../middleware");
const controller = require("../controllers/company.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post( "/api/company/register",[authJwt.verifyToken,authJwt.isSuperAdmin],controller.registerCompany);
  app.get( "/api/company/all",[authJwt.verifyToken,authJwt.isSuperAdmin],controller.companyList);
  app.get( "/api/company/active-all",[authJwt.verifyToken,authJwt.isSuperAdmin],controller.activeCompanyList);
  app.put( "/api/company/status/:id",[authJwt.verifyToken,authJwt.isSuperAdmin],controller.selectedCompanyStatusChange);
  app.delete( "/api/company/delete/:id",[authJwt.verifyToken,authJwt.isSuperAdmin],controller.deleteSelectedCompany);

};