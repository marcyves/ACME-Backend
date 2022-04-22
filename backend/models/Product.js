
module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      ref: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      }
      },{
      // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
      timestamps: false,
      // Pas de createdAt
      createdAt: false,
      // Pas de updatedAt
      updatedAt: false,
    });
  
    return Product;
};