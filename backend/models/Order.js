const User = require("./User");

module.exports = (sequelize, DataTypes) => {
  
    const Order = sequelize.define("order", {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderDatetime:{
        type: DataTypes.DATE,
      },
      amount: {
        type: DataTypes.DECIMAL(8,2),
      }
    },{
    // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
    timestamps: false,
    // Pas de createdAt
    createdAt: false,
    // Pas de updatedAt
    updatedAt: false,
  });
  
    return Order;
  };