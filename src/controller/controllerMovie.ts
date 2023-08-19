import { Router, Request, Response, NextFunction } from 'express';
import modelMovie, { IMovie } from '../model/modelMovie';

export class ControllerMovie {
    constructor() {
    }

    // ***
    // * Retourne la liste de movies.
    // * http://localhost:3020/api/movies
    // * Méthode    : GET.
    // ***
    public async listMovie(req: Request, res: Response, next: NextFunction) {
        try {
            // Récupérer tous les films triés par title.
            // console.log("Entrer dans cette fonction : listeMovie");

            // On veut trier le titre en ordre ascendant 
            const allMovies: IMovie[] = await modelMovie.find().sort({ title: 1 });

            //  Patch si le trie ne fonctionne pas.
            //  allMovies.sort((a, b) => a.title.localeCompare(b.title));

            res.status(200).render('listMovies', {
                allMovies: allMovies
            });
        } catch (error) {
            console.log(error);
        }
    }

    public async createMovie(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === 'GET') {
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
                    title: req.body.title as string,
                    synopsis: req.body.synopsis as string,
                    image: req.body.filePath as string,
                    __v: req.body.version as number
                };
                await modelMovie.create(movie);

                res.status(200).send(
                    'readMovie - Insérer un movie dans le db.');
            }
        } catch (error) {
            console.log(error);
        }
    }


    // ***
    // * Retourne un movie.
    // * Méthode    : POST.
    // * Req        : req.param.idMovie.
    // ***
    public detailMovie(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).send(
                'detailMovie - retourne un movie dans le db.'
            );
        } catch (error) {
        }
    }


    // ***
    // * Retourne les informations du film.
    // * Méthode    : GET.
    // * Req        : req.param.idMovie.
    // *////////////////////////////////////////
    // * Ex: http://localhost:3020/api/movies/64dd29edc1dedd21c9df5bc1
    // ***
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


    public updateMovie(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).send(
                'updateMovie - update un movie dans le db'
            );
        } catch (error) {
        }
    }

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