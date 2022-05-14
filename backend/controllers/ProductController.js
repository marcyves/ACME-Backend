const fs = require("fs");
const db = require('../models/index');

class ProductController {

    constructor() {
        this.Product = db.product;
        this.Category = db.category;
    }

    collection(){
        return this.Product.findAll(
            {include: [{model: this.Category}]}
        );
    }

    detail(productId){
        return this.Product.findAll({
            where: { productId: productId }
          });
    }

    list(){
        return this.Product.findAll(
            {include: [{model: this.Category}]}
        );
    }

    async save(data){
        let { id, name, ref, price, categoryId } = data;
        let aProduct = await this.Product.findOne({where: { productId: id }});
    
        if(aProduct){
          console.log(`Modification product ${aProduct.name} en ${name}`);
          this.Product.update(
            { name: name, ref: ref, },
            {where: { productId: id }}
          );
        }else{
          console.log(`Création nouveau product ${name}`);
          this.Product.create({ name, ref, price, categoryId });
        }

        return ["OK"];
    }

    async delete(productId, flag){
        await this.Product.findOne({
            where: { productId: productId }
          }).then((aProduct) => {
            if(aProduct.productId == productId){
            // Le produit existe
                switch(flag) {
                    case "all":
                        this.#deleteProductById(productId, aProduct.name);
                    case "img":
                        this.#deleteProductImage(productId);
                }
            }
        })
        .catch((err) => {
            console.log(`** Produit ${productId} non trouvé`);
        });
          
        return ["OK"];
    }

    #deleteProductImage(id){
        var image = `./images/products/prod_${id}.jpg`;
                
        try {
            fs.unlinkSync(image);
            console.log(`-- Fichier image ${image} supprimé`);
        } catch (err) {
            console.error(`** Fichier image ${image} non trouvé`);
        }
    }

    #deleteProductById(id, name){
        this.Product.destroy({ where: {productId: id}})
            .then(() => {
                console.log(`-- Produit [${name}] effacé`);
            })
            .catch((err) => {
                console.log(`** Produit [${name}] non effacé`, err.message);
            });
    }

    edit(productId){
        return this.Product.findOne({
            where: { productId: productId }
          });
    }
}

module.exports = ProductController;