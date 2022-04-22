
module.exports = (sequelize, DataTypes) => {
  
    const OrderItem = sequelize.define("orderitem", {
      orderItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        key: true,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        key: true,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(6,2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    },{
    // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
    timestamps: false,
    // Pas de createdAt
    createdAt: false,
    // Pas de updatedAt
    updatedAt: false,
  });
  
    return OrderItem;
  };