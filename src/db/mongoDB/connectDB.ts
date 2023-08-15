import mongoose from 'mongoose';

console.log(process.env.MONGODB_DB);

// Version fontionnel.
const dbName: string = process.env.MONGODB_DB || "mongodb://localhost:27017/movies_db";

const connectDB = async () => {
    await mongoose.connect(dbName);

    // Écoute les events sur la connection.
    const database = mongoose.connection;
    database.on('error', (error) => {
        console.log(error)
    })
    
    database.once('connected', () => {
        console.log('Database Connected');
    })
}
export default connectDB;