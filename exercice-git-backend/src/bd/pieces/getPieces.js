import {utiliserDB} from "../connection";

export const getPieces = async (req, res) => {
    await utiliserDB(async (db) => {
        const pieces = await db.collection('pieces').find().toArray();

        // Je ne retourne pas un erreur 404 si la liste est vide
        // car ce n'est pas une erreur, c'est juste que le dataset est vide
        res.status(200).json(pieces);
    }, res).catch(() => {
        res.status(500).send('Erreur lors de la recherche des pièces');
    });
}