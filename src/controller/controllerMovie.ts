import { Router, Request, Response, NextFunction } from 'express';
import modelMovie, { IMovie } from '../model/modelMovie';

export class ControllerMovie {
    constructor() {
    }

    /**
     * Link : http://localhost:3020/api/movies
     * Description: Retourne la liste de movies.
     * @param req : None
     * @param res : Retourne la page listMovie qui contient
     *              tous les movies en format HTML.
     * @param next: None 
     */

    public async listMovie(req: Request, res: Response, next: NextFunction) {
        try {
            // On demande le model de retourner tous les movies dans la table movies.
            const allMovies: IMovie[] = await modelMovie.find().sort({ title: 1 });
            // Merci, j'ai reçu tous les movies.

            // Render = générer page html
            res.status(200).render('listMovies', {
                allMovies: allMovies
            });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Lien        : http://localhost:3020/api/movies/createMovies
     * Description : createMovie with data received.
     * @param req  : title, sypnosis, filePath, version
     * @param res  : if success, Movie has been created. Else, error.
     * @param next : None.
     */

    public async createMovie(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === 'GET') {
                // Render {}, vide, car on ne passe pas les données
                res.status(200).render('createMovie', {});
            } else if (req.method === 'POST') {
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
                await modelMovie.create(movie);

                res.status(200).send(
                    "Movie has been created.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Lien        : http://localhost:3020/api/movies/detailMovie
     * Description : Retourne un objet movie.
     * @param req  : None.
     * @param res  : Retourne un objet movie.
     * @param next : None.
     * @method     : POST.
     */

    // movie = "{ id: 100, title = "abc"}"
    public async postDetailMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId = req.body.idMovie;
            const movie: IMovie = await modelMovie.findById(movieId);
            if (movie) {
                res.status(200).send(JSON.stringify(movie));
            }
            else {
                // Si le film n'est pas trouvé, renvoie une réponse 404
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
        }
    }

    /**
     * Lien        : http://localhost:3020/api/movies/detailMovie/64dd29edc1dedd21c9df5bc1
     * Description : Display detail of the movies
     * @param req  : None.
     * @param res  : Retourne la page detailMovie en html.
     * @param next : None.
     * @method     : GET.
     */

    public async getDetailMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId = req.params.idMovie;
            const movie: IMovie = await modelMovie.findById(movieId);
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
    }

    // ***
    // * Retourne un movie.
    // * Méthode    : GET.
    // * Req        : req.param.idMovie.
    // ***
    public readMovie(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).send(
                'readMovie - retourne un movie dans le db.'
            );
        } catch (error) {
        }
    }

    /**
     * Update un movie en background.
     * @param req req.body.idMovie, title, sypnosis, image et version
     * @param res return if movie exists or not
     * @param next none
     * @method PUT
     */
    public async updateMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const idMovie = req.body.idMovieHidden;
            // On envoie la requête HTTP au serveur avec la méthode PUT.
            // Pour récupérer on va utiliser req.body. 
            const movie = {
                title: req.body.title,
                synopsis: req.body.synopsis,
                image: req.body.filePath,
                __v: req.body.version
            };

            await modelMovie.findOneAndUpdate(
                { _id: idMovie },   // Filtre pour trouver le bon document par son ID
                movie,              // Les modifications que vous souhaitez apporter
                { new: true }      // Pour obtenir la version mise à jour du document
            )
                .then(movieUpdate => {
                    if (!movieUpdate) {
                        res.status(204).send({
                            success: false,
                            msg: 'Aucun film trouvé avec cet ID.',
                            
                        });
                    }
                    else {
                        console.log('Film mis à jour avec succès :', movieUpdate);
                        res.status(200).send({
                            success: true,
                            msg: 'Film mis à jour avec succès :',
                            movieUpdate: JSON.stringify(movieUpdate)
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        success: false,
                        msg: 'Erreur lors de la mise à jour du film',
                        error: JSON.stringify(err)
                    });
                });
        } catch (error) {
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

    public async deleteMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId = req.params.idMovie;
            const movie = await modelMovie.findByIdAndDelete(movieId);
            if (movie) {
                res.status(204).json({ success: 'Film supprimé avec succès' });
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

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