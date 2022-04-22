const express = require('express');
const router = express.Router();

module.exports = (params) => {

    const { appController } = params;

    router.all('/', (requete, reponse) => {
        appController.home(reponse);
    });

    router.all('/error_404', (requete, reponse) => {
        appController.error_404(reponse);
    });

return router;

}