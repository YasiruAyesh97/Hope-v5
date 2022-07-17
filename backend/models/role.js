module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
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

  return Role;
}