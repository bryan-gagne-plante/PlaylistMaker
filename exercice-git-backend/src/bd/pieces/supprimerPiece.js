import {utiliserDB} from "../connection";
import {ObjectId} from 'mongodb';

export function supprimerPiece(req, res) {
    const id = req.params.id;

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
}