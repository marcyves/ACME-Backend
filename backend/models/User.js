const Order = require("./Order");

module.exports = (sequelize, DataTypes) => {
  
    const User = sequelize.define("user", {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pwd: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pwdDatetime: {
        type: DataTypes.DATE,
      },
      level: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment:  '1 = dealer, 2 = administrator'
      },
      CMR: {
        type: DataTypes.TINYINT,
      }
    },{
    // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
    timestamps: false,
    // Pas de createdAt
    createdAt: false,
    // Pas de updatedAt
    updatedAt: false,
  });
  
//    User.hasMany(Order, {foreignKey: 'userId'});

    return User;
  };