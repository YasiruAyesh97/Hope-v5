module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("company", {
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

  return Company;
}