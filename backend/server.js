// Les imports de modules Node
const express = require('express');
const path = require('path');
const sequelize_fixtures = require("sequelize-fixtures");

// Base de données
const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("== La base de données est prête");

  // Import des données de test
  //    
  sequelize_fixtures.loadFiles([
                                'fixtures/user.json',
                                'fixtures/category.json',
                                'fixtures/product.json',
                                'fixtures/order.json',
                                'fixtures/orderitem.json'
                              ],db).then(function(){
      console.log("== Données de tests importées");
    });

    // le module de routage
  const router = require('./routes');

  // Les controleurs
  const AppController = require('./controllers/AppController');
  const CategoryController = require('./controllers/CategoryController');
  const ProductController = require('./controllers/ProductController');
  const UserController = require('./controllers/UserController');

  const appController = new AppController();
  const categoryController = new CategoryController();
  const productController = new ProductController();
  const userController = new UserController();

  // Création de l'application Node.js
  const app = express();
  const port = 3000;

  // Parseur JSON pour recevoir les données de requêtes
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());

  //sécurité cors abaissée//
  app.use( ( req, res, next ) => {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
    next();
  } );

  // Définition et appel du router
  app.use('/', router({ 
      db,
      appController,
      categoryController,
      productController,
      userController
    }));

  // Lancement du serveur
  app.listen(port, () => {
      console.log(`== ACMEplus backend démarré sur http://localhost:${port}`)
  });
}).catch((error) => {
  console.error(`*** Erreur :\n*** ${error}`);
});

