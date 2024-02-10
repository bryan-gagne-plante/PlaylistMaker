import { MongoClient } from 'mongodb';

export const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('repertoire');
        await operations(db);
        await client.close();
    } catch (err) {
        reponse.status(500).send('Erreur de connexion a la BD', err);
    }
}