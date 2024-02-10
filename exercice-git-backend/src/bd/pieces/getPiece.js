import {ObjectId} from 'mongodb';
import {utiliserDB} from "../connection";

export function getPiece(req, res) {
    const id = req.params.id;

    utiliserDB(async (db) => {
        const piece = await db.collection('pieces').findOne({_id: new ObjectId(id)});
        if (piece) {
            res.status(200).json(piece);
        } else {
            res.status(404).send('Aucune piece trouvée avec l\'ID : ' + id);
        }
    }, res).catch(() => {
        res.status(500).send('Erreur lors de la recherche de la piece');
    });
}