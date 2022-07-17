module.exports = (sequelize, DataTypes) => {
    const Users_Roles = sequelize.define("users_roles", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        roleId : {
            type: DataTypes.INTEGER,
        },
        userId : {
            type: DataTypes.INTEGER,
        },
    });

    return Users_Roles;
};