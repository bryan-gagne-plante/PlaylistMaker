import {utiliserDB} from "../connection";

export function getDemandes(req, res) {
    utiliserDB(async (db) => {
        const demandes = await db.collection('demandes').find().toArray();
        res.status(200).json(demandes);
    }, res).catch(() => {
        res.status(500).send('Erreur lors de la recherche des demandes');
    });
}