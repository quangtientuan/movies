"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMovie = exports.RouterMovie = void 0;
const express_1 = require("express");
const controllerMovie_1 = require("../controller/controllerMovie");
class RouterMovie {
    // ***
    // * Initialiser le router
    // ***
    constructor() {
        this._controllerMovie = new controllerMovie_1.ControllerMovie();
        this._router = (0, express_1.Router)();
        this.init();
    }
    get router() {
        return this._router;
    }
    // Create : POST www.example.com/customers
    // Read : GET www.example.com/customers/3814
    // Update : PUT www.example.com/customers/3814
    // Destroy : DELETE www.example.com/customer/3814
    init() {
        /**
         * Afficher la listes des movies.
         * On reçoit HTTP Request du navigateur.
         * http://localhost:3020/api/movies
         * Méthode : GET.
         */
        this._router.get('/', this._controllerMovie.listMovie.bind(this));
        /**
         * On va aller chercher la page /create avec controller
         * On reçoit HTTP Request du navigateur.
         * http://localhost:3020/api/createMovie
         * Méthode : GET.
         */
        this._router.get('/createMovie', this._controllerMovie.createMovie.bind(this));
        /**
         * Affiche le movie en détail.
         * http://localhost:3020/api/movies/detailMovie
         * Méthode : POST.
         * Retourne un objet Movie.
         */
        this._router.post('/postDetailMovie', this._controllerMovie.postDetailMovie.bind(this));
        /**
         * Affiche le movie en détail.
         * http://localhost:3020/api/movies/detailMovie/64dd29edc1dedd21c9df5bc1
         * Méthode : GET.
         */
        this._router.get('/detailMovie/:idMovie', this._controllerMovie.getDetailMovie.bind(this));
        /**
         * On route la page /create
         * On reçoit HTTP Request du navigateur.
         * http://localhost:3020/api/createMovie
         * Méthode : POST.
         */
        this._router.post('/createMovie', this._controllerMovie.createMovie.bind(this));
        // this._router.get('/:movieId', this._controllerMovie.readMovie.bind(this));
        // Post-createMovie.
        /**
         * Update l'info du movie.
         * http://localhost:3020/api/movies/updateMovie
         * Méthode : POST.
         * Retourne un objet Movie.
         */
        this._router.put('/updateMovie', this._controllerMovie.updateMovie.bind(this));
        /**
         * Delete movie from db
         * http://localhost:3020/api/movies/detailMovie
         * Méthode : DELETE.
         */
        this._router.delete('/deleteMovie/:idMovie', this._controllerMovie.deleteMovie.bind(this));
    }
}
exports.RouterMovie = RouterMovie;
exports.routerMovie = new RouterMovie();
exports.routerMovie.init();
//# sourceMappingURL=routerMovie.js.map