module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define("documents", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
    },
    agentName: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    catalog1Id: {
      type: DataTypes.INTEGER,
    },
    catalog2Id: {
      type: DataTypes.INTEGER,
    },
    catalog3Id: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    companyId: {
      type: DataTypes.INTEGER,
    },
  });

  return Document;
}