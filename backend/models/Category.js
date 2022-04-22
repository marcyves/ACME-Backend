
module.exports = (sequelize, DataTypes) => {
  
    const Category = sequelize.define("category", {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      }
    },{
    // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
    timestamps: false,
    // Pas de createdAt
    createdAt: false,
    // Pas de updatedAt
    updatedAt: false,
  });
  
    return Category;
  };