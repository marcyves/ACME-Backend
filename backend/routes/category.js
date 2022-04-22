const express = require('express');
const router = express.Router();
const authentification = require('../middleware/auth');

module.exports = (params) => {

    const { categoryController } = params;

    router.get('/crud', async (requete, reponse) => {
        const data = await categoryController.list();
        reponse.json(data);
    });

    router.get('/edit/:categoryId?', authentification, async (requete, reponse) => {
        if (typeof requete.params.categoryId !== 'undefined') {
            var id = requete.params.categoryId;
        }else{
            var id = null;
        }
        
        const data = await categoryController.edit(id);
        reponse.json(data);
    });

    router.get('/delete/:categoryId', authentification, async (requete, reponse) => {
        const data = await categoryController.delete(requete.params.categoryId);
        reponse.json(data);
    });

    router.post('/save', authentification, async (req, rep) => {
        let data = await categoryController.save(req.body);
        rep.json(data);
    });

return router;

}