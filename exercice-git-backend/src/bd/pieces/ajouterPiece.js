import {utiliserDB} from "../connection";

export function ajouterPiece(req, res) {
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
}