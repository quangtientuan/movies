// Importation de modules
//import mongoose, { Schema, Document, model, Model } from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';

// {
//     "title": "Alien",
//     "synopsis": "Le vaisseau commercial Nostromo et son équipage, sept hommes et femmes, rentrent sur Terre avec une importante cargaison de minerai. Mais lors d'un arrêt forcé sur une planète déserte, l'officier Kane se fait agresser par une forme de vie inconnue, une arachnide qui étouffe son visage.\r\nAprès que le docteur de bord lui retire le spécimen, l'équipage retrouve le sourire et dîne ensemble. Jusqu'à ce que Kane, pris de convulsions, voit son abdomen perforé par un corps étranger vivant, qui s'échappe dans les couloirs du vaisseau...",
//     "image": "/data/uploads/alien.jpg",
//     "__v": 0
// }

/***
 * Définir le type IMovie
 * On peut utiliser comme type (Number, string ...).
 */

export interface IMovie extends Document{
    title   : string;
    synopsis: string;
    image   : string;
    __v     : number;
}
    

/*
* Créer un objet schemaMovie.
* ça ressemble beaucoup avec Create Table.
* colonne : type.
*/
export const schemaMovie : Schema = new Schema({
    title:
    {
        type    : String,
        require : true
    },
    synopsis:
    {
        type    : String,
        require : true
    },
    image:
    {
        type    : String,
        require : true
    },
    __v:
    {
        type    : Number,
        require : true
    },
});


// Export l'objet modelMovie.
const modelMovie : Model<IMovie> = model<IMovie>('Movies', schemaMovie);
export default modelMovie;
