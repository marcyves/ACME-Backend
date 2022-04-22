const express = require('express');
const router = express.Router();

module.exports = (params) => {

    const { db, userController } = params;

    router.post('/tobasket', async (requete, reponse) => {
        console.log(requete);
        const data = await userController.tobasket(requete.body);
        reponse.json(data);
    });

    router.get('/basket', async (requete, reponse) => {
        const data = await userController.basket();
        reponse.json(data);
    });

    router.get('/checkout', async (requete, reponse) => {
        const data = await userController.checkout();
        reponse.json(data);
    });

    router.get('/orders', async (requete, reponse) => {
        const data = await userController.orders();
        reponse.json(data);
    });

    router.get('/order/:orderId', async (requete, reponse) => {
        const data = await userController.order(requete.params.orderId);
        reponse.json(data);
    });

    router.get('/profile', async (requete, reponse) => {
        const data = await userController.profile();
        reponse.json(data);
    });

    router.get('/crud', async (requete, reponse) => {
        const data = await userController.crud();
        reponse.json(data);
    });

    router.get('/edit', async (requete, reponse) => {
        const data = await userController.edit();
        reponse.json(data);
    });

    router.get('/edit/:userId', async (requete, reponse) => {
        const data = await userController.edit(requete.params.userId);
        reponse.json(data);
    });

    router.get('/delete/:userId', async (requete, reponse) => {
        const data = await userController.delete(requete.params.userId);
        reponse.json(data);
    });

    router.post('/save', async (requete, reponse) => {
        const data = await userController.save();
        reponse.json(data);
    });

    router.get('/signin', async (requete, reponse) => {
        const data = await userController.signin();
        reponse.json(data);
    });

    router.post('/login', async (requete, reponse) => {
        const data = await userController.login();
        reponse.json(data);
    });

    router.get('/logout', async (requete, reponse) => {
        const data = await userController.logout();
        reponse.json(data);
    });

    router.get('/password_1', async (requete, reponse) => {
        const data = await userController.password_1();
        reponse.json(data);
    });

    router.post('/password_2', async (requete, reponse) => {
        const data = await userController.password_2(req.body);
        reponse.json(data);
    });

    router.get('/password_3', async (requete, reponse) => {
        const data = await userController.password_3();
        reponse.json(data);
    });

    router.post('/password_4', async (requete, reponse) => {
        const data = await userController.password_4(req.body);
        reponse.json(data);
    });

return router;

}