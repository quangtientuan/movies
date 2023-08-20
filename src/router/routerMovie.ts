import { Router } from 'express';
import { ControllerMovie } from '../controller/controllerMovie';

export class RouterMovie {

    private _router: Router;
    private _controllerMovie: ControllerMovie;

    // ***
    // * Initialiser le router
    // ***
    constructor() {
        this._controllerMovie = new ControllerMovie();
        this._router = Router();
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

        // /**
        //  * Affiche le movie en détail.
        //  * http://localhost:3020/api/movies/detailMovie
        //  * Méthode : POST.
        //  * TODO : Vérifier.
        //  */

        // this._router.post('/detailMovie', this._controllerMovie.postDetailMovie.bind(this));

        /**
         * Affiche le movie en détail.
         * http://localhost:3020/api/movies/detailMovie
         * Méthode : GET.
         */
        this._router.get('/detailMovie/:idMovie' , this._controllerMovie.getDetailMovie.bind(this));

        /**
         * On route la page /create
         * On reçoit HTTP Request du navigateur.
         * http://localhost:3020/api/createMovie
         * Méthode : POST.
         */
        this._router.post('/createMovie', this._controllerMovie.createMovie.bind(this));

        // this._router.get('/:movieId', this._controllerMovie.readMovie.bind(this));
        // // Post-createMovie.
        // this._router.put('/:movieId', this._controllerMovie.updateMovie.bind(this));

        /**
         * Delete movie from db
         * http://localhost:3020/api/movies/detailMovie
         * Méthode : DELETE.
         */
        this._router.delete('/deleteMovie/:idMovie' , this._controllerMovie.deleteMovie.bind(this));

    }
}

export const routerMovie = new RouterMovie();
routerMovie.init();

