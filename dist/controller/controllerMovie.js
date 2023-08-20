"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerMovie = void 0;
const modelMovie_1 = __importDefault(require("../model/modelMovie"));
class ControllerMovie {
    constructor() {
    }
    /**
     * Link : http://localhost:3020/api/movies
     * Description: Retourne la liste de movies.
     * @param req :None
     * @param res allMovies. Je retourne tous les movies en format HTML.
     * @param next None
     */
    listMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // On demande le model de retourner tous les movies dans la table movies.
                const allMovies = yield modelMovie_1.default.find().sort({ title: 1 });
                // Merci, j'ai reçu tous les movies.
                res.status(200).render('listMovies', {
                    allMovies: allMovies
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /**
     * Lien        : http://localhost:3020/api/movies/createMovies
     * Description : createMovie with data received.
     * @param req  : title, sypnosis, filePath, version
     * @param res  : if success, Movie has been created. Else, error.
     * @param next : None.
     */
    createMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.method === 'GET') {
                    res.status(200).render('createMovie', {});
                }
                else if (req.method === 'POST') {
                    const title = req.body.title;
                    const synopsis = req.body.synopsis;
                    const path = req.body.filePath;
                    const version = req.body.version;
                    console.log(title);
                    console.log(synopsis);
                    console.log(path);
                    console.log(version);
                    const movie = {
                        title: req.body.title,
                        synopsis: req.body.synopsis,
                        image: req.body.filePath,
                        __v: req.body.version
                    };
                    yield modelMovie_1.default.create(movie);
                    res.status(200).send("Movie has been created.");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /**
     * Lien        : http://localhost:3020/api/movies/detailMovie
     * Description : Display detailMovies
     * @param req  : None.
     * @param res  : detailMovie - Retourne les données (title, synopsis, filePath, version).
     * @param next : None.
     * @method     : POST.
     */
    postDetailMovie(req, res, next) {
        try {
            res.status(200).send("detailMovie - retourne les infos qui sont dans le db.");
        }
        catch (error) {
        }
    }
    /**
     * Lien        : http://localhost:3020/api/movies/detailMovie/64dd29edc1dedd21c9df5bc1
     * Description : Display detail of the movies
     * @param req  : None.
     * @param res  : readMovie - Retourne les données (title, synopsis, filePath, version)
     * @param next : None.
     * @method     : GET.
     */
    getDetailMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = req.params.idMovie;
                const movie = yield modelMovie_1.default.findById(movieId);
                if (movie) {
                    res.status(200).render('detailMovies', {
                        movieDB: movie
                    });
                }
                else {
                    // Si le film n'est pas trouvé, renvoie une réponse 404
                    res.status(404).json({ error: 'Movie not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    // ***
    // * Retourne un movie.
    // * Méthode    : GET.
    // * Req        : req.param.idMovie.
    // ***
    readMovie(req, res, next) {
        try {
            res.status(200).send('readMovie - retourne un movie dans le db.');
        }
        catch (error) {
        }
    }
    updateMovie(req, res, next) {
        try {
            res.status(200).send('updateMovie - update un movie dans le db');
        }
        catch (error) {
        }
    }
    /**
     * Lien        : http://localhost:3020/api/movies/deleteMovies/64dd29edc1dedd21c9df5bc1
     * Description : Delete movie from database
     * @param req  : idMovie.
     * @param res  : Si le film existe, on supprime. Sinon, not found.
     * @param next : None.
     * @method     : DELETE
     */
    deleteMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = req.params.idMovie;
                const movie = yield modelMovie_1.default.findByIdAndDelete(movieId);
                if (movie) {
                    res.status(204).json({ success: 'Film supprimé avec succès' });
                }
                else {
                    res.status(404).json({ error: 'Movie not found' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.ControllerMovie = ControllerMovie;
// Create : POST www.example.com/customers
// Read : GET www.example.com/customers/3814
// Update : PUT www.example.com/customers/3814
// Destroy : DELETE www.example.com/customer/3814
// res.status(200) // Ok
// res.status(201) // Created
// res.status(204) // No content
// res.status(400) // Bad request
// res.status(401) // Unauthorized
// res.status(403) // Forbidden
// res.status(404) // Not found
// res.status(500) // Server error
//# sourceMappingURL=controllerMovie.js.map