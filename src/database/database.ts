import mongoose from 'mongoose'

   //Connection with Docker
async function connectDB() {
    mongoose.connect('mongodb://mongodb/tybatest')
    .then(db => console.log('Db is connected to', db.connection.host))
    .catch(err => console.error(err));
}

connectDB()

