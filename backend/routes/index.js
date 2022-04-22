const express = require('express');
const router = express.Router();

const appRoute = require('./app');
const categoryRoute = require('./category');
const productRoute = require('./product');
const userRoute = require('./user');

module.exports = (params) => {

    router.use('/', appRoute(params));
    router.use('/category', categoryRoute(params));
    router.use('/product',productRoute(params));
    router.use('/user', userRoute(params));

    router.use('/', (requete, reponse) => {
        reponse.status(404).send('API inexistant');
    });

    return router;
}