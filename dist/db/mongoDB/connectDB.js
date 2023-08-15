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
const mongoose_1 = __importDefault(require("mongoose"));
console.log(process.env.MONGODB_DB);
// Version fontionnel.
const dbName = process.env.MONGODB_DB || "mongodb://localhost:27017/movies_db";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(dbName);
    // Écoute les events sur la connection.
    const database = mongoose_1.default.connection;
    database.on('error', (error) => {
        console.log(error);
    });
    database.once('connected', () => {
        console.log('Database Connected');
    });
});
exports.default = connectDB;
//# sourceMappingURL=connectDB.js.map