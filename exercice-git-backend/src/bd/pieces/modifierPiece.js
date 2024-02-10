import {utiliserDB} from "../connection";
import {ObjectId} from 'mongodb';

export function modifierPiece(req, res) {
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
}