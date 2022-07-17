module.exports = (sequelize, DataTypes) => {
  const Catalog_1 = sequelize.define("catalog_1", {
    // TODO Corregir nombre de propiedad y verificar duplicados en BD
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  });

  return Catalog_1;
}