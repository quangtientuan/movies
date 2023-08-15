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
    // ***
    // * Retourne la liste de movies.
    // * http://localhost:3020/api/movies
    // ***
    listMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupérer tous les films triés par title.
                console.log("Entrer dans cette fonction : listeMovie");
                const allMovies = yield modelMovie_1.default.find().sort({ title: 1 });
                res.status(200).render('listMovies', {
                    allMovies: allMovies
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    createMovie(req, res, next) {
        try {
            if (req.method === 'GET') {
                res.status(200).render('createMovie', {});
            }
            else if (req.method === 'POST') {
                res.status(200).send('readMovie - Insérer un movie dans le db.');
            }
        }
        catch (error) {
            console.log(error);
        }
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
    deleteMovie(req, res, next) {
        try {
            res.status(200).send('deleteMovie - deleteMovie un movie dans le db');
        }
        catch (error) {
        }
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