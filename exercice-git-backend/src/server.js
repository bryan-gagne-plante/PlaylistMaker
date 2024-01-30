import express from 'express';
// import { MongoClient } from 'mongodb';

const app = express();
// app.use(express.json());

let repertoire = [
    { "id": 1, "titre": "My life", "artiste": "DJ NoName", "categorie": "Électronica" },
    { "id": 2, "titre": "Growing Up", "artiste": "A.L.E.X", "categorie": "LoFi" },
    { "id": 3, "titre": "Cities Of The Future", "artiste": "Infected Mushroom", "categorie": "Électronica" },
    { "id": 4, "titre": "Gamma Goblins", "artiste": "Infected Mushroom", "categorie": "Électronica" },
    { "id": 5, "titre": "Hard days", "artiste": "Loupol", "categorie": "Rock" },
    { "id": 6, "titre": "Money", "artiste": "Pink Floyd", "categorie": "Rock" },
    { "id": 7, "titre": "Betrayal", "artiste": "Céline Dion", "categorie": "Pop" },
    { "id": 8, "titre": "Goes On", "artiste": "Céline Dion", "categorie": "Soft" },
    { "id": 9, "titre": "Sad World", "artiste": "Céline Dion", "categorie": "Variété française" },
    { "id": 10, "titre": "Red flowers", "artiste": "Hipster2.0", "categorie": "Emo" },
    { "id": 11, "titre": "Loser", "artiste": "Hipster2.0", "categorie": "Emo" },
    { "id": 12, "titre": "Sunny", "artiste": "The Good Band", "categorie": "Pop" },
    { "id": 13, "titre": "My Girl", "artiste": "Motown", "categorie": "Soul" },
    { "id": 14, "titre": "Strawberry Letter 23", "artiste": "The Brothers Johnson", "categorie": "Soul" },
    { "id": 15, "titre": "Stomp!", "artiste": "The Brothers Johnson", "categorie": "Soul" }
  ]

// const utiliserDB = async (operations, reponse) => {
//     try {
//         // Connection au client Mongo
//         const client = await MongoClient.connect('mongodb://localhost:27017');
//         // Connection à la base de données
//         const db = client.db('repertoire');

//         // Exécution des opérations demandées
//         await operations(db);

//         // Fermeture de la connexion
//         client.close();
//     } catch (err) {
//         reponse.status(500).send('Erreur de connexion à la BD', err);
//     }

app.get('/hello', (req, res) => res.send('Salut tout le monde!'));

// GET /api/pieces
app.get('api/pieces', async (req, res) => {
    res.status(200).json(repertoire); // Solution temporaire
});

// GET /api/pieces/:id
app.get('api/pieces/:id', async (req, res) => {
    const { id } = req.params;

    const piece = repertoire.find(piece => piece.id === id);
    res.status(200).json(piece); // Solution temporaire
});

// POST /api/pieces/ajouter
app.post('api/pieces/ajouter', async (req, res) => {
    const piece = req.body;

    repertoire.push(piece);
    res.status(200).json(repertoire); // Solution temporaire
});

// PUT /api/pieces/:id/modifier
app.put('api/pieces/:id/modifier', async (req, res) => {
    const { id } = req.params;
    const piece = req.body;

    repertoire = repertoire.map(p => p.id === id ? piece : p);
    res.status(200).json(repertoire); // Solution temporaire

});

// DELETE /api/pieces/:id/supprimer
app.delete('api/pieces/:id/supprimer', async (req, res) => {
    const { id } = req.params;

    // utiliserDB(async (db) => {
    //     try {
    //         await db.collection('pieces').deleteOne({ id: id });
    //         res.status(204).send();
    //     } catch (err) {
    //         res.status(500).send('Erreur lors de la suppression de la pièce', err);
    //     }
    // }, res);

    repertoire = repertoire.filter(p => p.id !== id);
    res.status(204); // Solution temporaire
});


app.listen(8000, () => console.log('Ecoute sur le port 8000'));