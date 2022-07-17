'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user = require("../models/user.js")(sequelize, Sequelize);
db.role = require("../models/role.js")(sequelize, Sequelize);
db.company = require("../models/company.js")(sequelize, Sequelize);
db.catalog_1 = require("../models/catalog_1")(sequelize, Sequelize);
db.catalog_2 = require("../models/catalog_2")(sequelize, Sequelize);
db.catalog_3 = require("../models/catalog_3")(sequelize, Sequelize);
db.document = require("../models/document")(sequelize, Sequelize);

db.users_roles = require("../models/users_roles.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: db.users_roles,
  foreignKey: "roleId",

});

db.user.belongsToMany(db.role, {
  through: db.users_roles,
  foreignKey: "userId",
});


db.company.hasMany(db.user,{foreignKey: 'companyId', sourceKey: 'id'});
db.user.belongsTo(db.company,{foreignKey: 'companyId', targetKey: 'id'});

db.company.hasMany(db.catalog_1,{foreignKey: 'companyId', sourceKey: 'id'});
db.catalog_1.belongsTo(db.company,{foreignKey: 'companyId', targetKey: 'id'});

db.company.hasMany(db.catalog_2,{foreignKey: 'companyId', sourceKey: 'id'});
db.catalog_2.belongsTo(db.company,{foreignKey: 'companyId', targetKey: 'id'});

db.company.hasMany(db.catalog_3,{foreignKey: 'companyId', sourceKey: 'id'});
db.catalog_3.belongsTo(db.company,{foreignKey: 'companyId', targetKey: 'id'});

db.company.hasMany(db.document,{foreignKey: 'companyId', sourceKey: 'id'});
db.document.belongsTo(db.company,{foreignKey: 'companyId', targetKey: 'id'});

db.user.hasMany(db.document,{foreignKey: 'userId', sourceKey: 'id'});
db.document.belongsTo(db.user,{foreignKey: 'userId', targetKey: 'id'});

db.catalog_1.hasMany(db.document,{foreignKey: 'catalog1Id', sourceKey: 'id'});
db.document.belongsTo(db.catalog_1,{foreignKey: 'catalog1Id', targetKey: 'id'});

db.catalog_2.hasMany(db.document,{foreignKey: 'catalog2Id', sourceKey: 'id'});
db.document.belongsTo(db.catalog_2,{foreignKey: 'catalog2Id', targetKey: 'id'});

db.catalog_3.hasMany(db.document,{foreignKey: 'catalog3Id', sourceKey: 'id'});
db.document.belongsTo(db.catalog_3,{foreignKey: 'catalog3Id', targetKey: 'id'});

db.ROLES = ["admin", "usuario"];

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
