const express = require('express');
const router = express.Router();
const authentification = require('../middleware/auth');

module.exports = (params) => {
    const { db, productController } = params;

    router.get('/collection', authentification, async (requete, reponse) => {
        const data = await productController.collection();
        reponse.json(data);
    });

    router.get('/detail/:productId', authentification, async (requete, reponse) => {
        const data = await productController.detail(requete.params.productId);
        reponse.json(data);
    });

    router.get('/crud', authentification, async (requete, reponse) => {
        const data = await productController.list(requete.params.productId);
        reponse.json(data);
    });

    router.get('/edit/:productId?', authentification, async (requete, reponse) => {
        if (typeof requete.params.productId !== 'undefined') {
            var id = requete.params.productId;
        }else{
            var id = null;
        }
        
        const data = await productController.edit(id);
        reponse.json(data);
    });

    router.get('/delete/:productId/all', authentification, async (requete, reponse) => {
        const data = await productController.delete(requete.params.productId, "all");
        reponse.json(data);
    });

    router.get('/delete/:productId/img', authentification, async (requete, reponse) => {
        const data = await productController.delete(requete.params.productId, "img");
        reponse.json(data);
    });

    router.post('/save', authentification,async (requete, reponse) => {
        const data = await productController.save(requete.body);
        reponse.json(data);
    });

return router;

}