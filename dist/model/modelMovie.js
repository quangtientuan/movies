"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMovie = void 0;
// Importation de modules
//import mongoose, { Schema, Document, model, Model } from 'mongoose';
const mongoose_1 = require("mongoose");
/*
* Créer un objet schemaMovie.
* ça ressemble beaucoup avec Create Table.
* colonne : type.
*/
exports.schemaMovie = new mongoose_1.Schema({
    title: {
        type: String,
        require: true
    },
    synopsis: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    __v: {
        type: Number,
        require: true
    },
});
// Export l'objet modelMovie.
const modelMovie = (0, mongoose_1.model)('Movies', exports.schemaMovie);
exports.default = modelMovie;
//# sourceMappingURL=modelMovie.js.map