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
        // ***
        // * Afficher la listes des movies.
        // * '/' ==> http://localhost:3020/api/movies
        // * Méthode : GET.
        // ****
        this._router.get('/', this._controllerMovie.listMovie.bind(this));
        // ***
        // * Insérer un movie.
        // * http://localhost:3020/api/movies/createMovie
        // * Méthode : GET.
        // ****
        this._router.get('/createMovie', this._controllerMovie.createMovie.bind(this));
        // ***
        // * Affiche le movie en détail.
        // * http://localhost:3020/api/movies/detailMovie
        // * Méthode : POST.
        // * TODO : Vérifier,
        // ****
        this._router.post('/detailMovie', this._controllerMovie.detailMovie.bind(this));
        // ***
        // * Affiche le movie en détail.
        // * http://localhost:3020/api/movies/detailMovie
        // * Méthode : GET.
        // ****
        this._router.get('/detailMovie', this._controllerMovie.getDetailMovie.bind(this));
        this._router.post('/createMovie', this._controllerMovie.createMovie.bind(this));
        // this._router.get('/:movieId', this._controllerMovie.readMovie.bind(this));
        // // Post-createMovie.
        // this._router.put('/:movieId', this._controllerMovie.updateMovie.bind(this));
        // this._router.delete('/:movieId', this._controllerMovie.deleteMovie.bind(this));
    }
}
exports.RouterMovie = RouterMovie;
exports.routerMovie = new RouterMovie();
exports.routerMovie.init();
//# sourceMappingURL=routerMovie.js.map