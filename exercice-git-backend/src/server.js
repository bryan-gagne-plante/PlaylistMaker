import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';

const app = express();
app.use(express.json());

// MONGODB SHEMATIC
// {
//     "titre": "nom de la piece",
//     "artiste": "L'auteur de la piece",
//     "categorie": "La categorie de la piece"
// }

const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('repertoire');
        await operations(db);
        client.close();
    } catch (err) {
        reponse.status(500).send('Erreur de connexion a la BD', err);
    }
};

// GET /api/pieces
app.get('/api/pieces', async (req, res) => {
    utiliserDB(async (db) => {
        const pieces = await db.collection('pieces').find().toArray();

        // Je ne retourne pas un erreur 404 si la liste est vide
        // car ce n'est pas une erreur, c'est juste que le dataset est vide
        res.status(200).json(pieces);
    }, res);
});

// GET /api/pieces/:id - Assuming ID is a string
app.get('/api/pieces/:id', async (req, res) => {
    utiliserDB(async (db) => {
        const id = req.params.id;

        // Directly using the string ID for lookup
        const piece = await db.collection('pieces').findOne({_id: new ObjectId(id)});
        if (piece) {
            res.status(200).json(piece);
        } else {
            res.status(404).send('Aucune pièce trouvée avec l\'ID : ' + id);
        }
    }, res).catch(() => {
        res.status(500).send('Erreur lors de la recherche de la pièce');
    });
});

// POST /api/pieces/ajouter
app.post('/api/pieces/ajouter', async (req, res) => {
    const {titre, artiste, categorie} = req.body;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({
                titre: titre,
                artiste: artiste,
                categorie: categorie
            });

            res.status(200).send('Pièce ajoutee');
        }, res).catch(
            () => res.status(500).send('Erreur : piece non ajoutee')
        );
    } else {
        res.status(500).send('Erreur : parametre manquant');
    }
});

// PUT /api/pieces/:id/modifier
app.put('/api/pieces/:id/modifier', async (req, res) => {
    const {id} = req.params;
    const {titre, artiste, categorie} = req.body;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('pieces').updateOne({_id: new ObjectId(id)}, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categorie: categorie
                }
            });

            const pieceMAJ = await db.collection('pieces').findOne({_id: new ObjectId(id)});
            res.status(200).json(pieceMAJ);
        }, res).catch(
            () => res.status(500).send('Erreur : piece non modifiee')
        );
    } else {
        res.status(500).send('Erreur : parametre manquant');
    }
});

// DELETE /api/pieces/:id/supprimer
app.delete('/api/pieces/:id/supprimer', async (req, res) => {
    const {id} = req.params;

    utiliserDB(async (db) => {
        const resultat = await db.collection('pieces').deleteOne({_id: new ObjectId(id)});

        if (resultat.deletedCount === 1) {
            res.status(200).send('Piece supprimee');
        } else {
            res.status(500).send('Erreur : piece non supprimee');
        }
    }, res).catch(
        () => res.status(500).send('Erreur : piece non supprimee')
    );
});

app.listen(8000, () => console.log('Ecoute sur le port 8000'));