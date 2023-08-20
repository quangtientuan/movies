"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_flash_plus_1 = __importDefault(require("express-flash-plus"));
const body_parser_1 = __importDefault(require("body-parser"));
//import * as path from 'path';
// Importer les routers.
const routerMovie_1 = require("./router/routerMovie");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.middleware();
        this.routes();
        // https://expressjs.com/en/starter/static-files.html
        const path = require('path');
        this.expressApp.use('/static', express_1.default.static(path.join(__dirname, 'public')));
        // C'est ce répertoire qu'on va mettre les fichiers css et
        // javascript.
        this.expressApp.use(express_1.default.static(__dirname + '/public'));
        this.expressApp.set('view engine', 'pug');
        //this.expressApp.set('views', path.join(__dirname, 'views')); // Définit le chemin du répertoire des vues
        console.log(__dirname);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use((0, morgan_1.default)('dev'));
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(express_1.default.urlencoded({ extended: false }));
        // AJOUT by NQT 20 août 2023.
        this.expressApp.use(body_parser_1.default.urlencoded({ extended: false }));
        this.expressApp.use((0, cookie_parser_1.default)());
        this.expressApp.use((0, express_flash_plus_1.default)());
        this.expressApp.use((0, express_session_1.default)({
            secret: 'My Secret Key',
            resave: false,
            saveUninitialized: true
        }));
    }
    // Configure API endpoints.
    routes() {
        const titreBase = 'Gestion des movies.';
        let router = express_1.default.Router();
        /***
         * Route de base.
         * Affiche la page acceuil.
         * http://localhost:3020/
         */
        router.get('/', (req, res, next) => {
            // Debug.
            try {
                //res.send('Liste des movies ==> Route de base.');
                //////////////////////////////////
                // Envoyer la réponse au browser.
                res.status(201).render('accueil', {});
            }
            catch (error) {
                console.log(error);
            }
        });
        // Router de base.
        this.expressApp.use('/', router);
        // Route pour les movies.
        // http://localhost:3020/api/movies
        this.expressApp.use('/api/movies', routerMovie_1.routerMovie.router);
    }
}
exports.default = new App().expressApp;
//# sourceMappingURL=app.js.map