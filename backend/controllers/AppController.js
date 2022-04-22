
class AppController {
    home(reponse) {
      reponse.redirect("/product/collection");
    }

    error_404(reponse) {
      reponse.status(404).send('API inexistant');
    }
}

module.exports = AppController;