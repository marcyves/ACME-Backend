const { sequelize } = require("../models");
const db = require('../models/index');

class CategoryController {

  constructor() {
    this.Category = db.category;
  }

  list(){
    return this.Category.findAll();
  }

  edit(categoryId){
    return this.Category.findOne({
        where: { categoryId: categoryId }
      });
  }

  async delete(categoryId){
    let aCategory = await this.Category.findOne({where: { categoryId: categoryId }});
      
    if(aCategory) {
      this.Category.destroy({ where: {categoryId: categoryId}})
      .then(() => {
        console.log(`** Category ${aCategory.name} effacée`);
      })
      .catch((err) => {
          console.error(`** Category [${categoryId}] non effacée : `, err.message);
      });
    } else {
        console.error(`** Category ${categoryId} non trouvée`);
    };
      
    return ["OK"];
  }

  async save(data){

    let { id, name } = data;
    let aCategory = await this.Category.findOne({where: { categoryId: id }});

    if(aCategory){
      console.log(`Modification category ${aCategory.name} en ${name}`);
      this.Category.update(
        { name: name},
        {where: { categoryId: id }}
      );
    }else{
      console.log(`Création nouvelle category ${name}`);
      this.Category.create({ name: name});
    }

    return ["OK"];
}
}
module.exports = CategoryController;