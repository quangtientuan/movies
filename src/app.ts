
import express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import ExpressSession from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import flash from 'express-flash-plus';
import bodyParser from 'body-parser';

//import * as path from 'path';
// Importer les routers.
import { routerMovie } from './router/routerMovie';


// Creates and configures an ExpressJS web server.
class App {

  
  // Application Express.
  public expressApp : express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();

    // https://expressjs.com/en/starter/static-files.html
    const path = require('path');  
    this.expressApp.use('/static', express.static(path.join(__dirname, 'public'))) as express.RequestHandler; 
    // C'est ce répertoire qu'on va mettre les fichiers css et
    // javascript.
    this.expressApp.use(express.static(__dirname + '/public') as express.RequestHandler); 
    
    this.expressApp.set('view engine', 'pug');
    
    //this.expressApp.set('views', path.join(__dirname, 'views')); // Définit le chemin du répertoire des vues

    console.log(__dirname);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev') as express.RequestHandler);
    this.expressApp.use(express.json() as express.RequestHandler);
    this.expressApp.use(express.urlencoded({ extended: false }) as express.RequestHandler);
    // AJOUT by NQT 20 août 2023.
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(flash());
    this.expressApp.use(ExpressSession(
      {
        secret: 'My Secret Key',
        resave: false,
        saveUninitialized: true
      }));
  }


  // Configure API endpoints.
  private routes(): void {

    const titreBase = 'Gestion des movies.';
    let router = express.Router();
    
    /***
     * Route de base.
     * Affiche la page acceuil.
     * http://localhost:3020/
     */
    router.get('/', (req:Request, res : Response, next : NextFunction) => {
      // Debug.
      try {
      //res.send('Liste des movies ==> Route de base.');
        //////////////////////////////////
        // Envoyer la réponse au browser.
        res.status(201).render('accueil', {});
      }
      catch(error){
        console.log(error);
      }
    });



    // Router de base.
    this.expressApp.use('/', router);

    // Route pour les movies.
    // http://localhost:3020/api/movies
    this.expressApp.use('/api/movies', routerMovie.router);
  }

}

export default new App().expressApp;
