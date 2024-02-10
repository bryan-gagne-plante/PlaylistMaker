import {utiliserDB} from "../connection";
import {ObjectId} from 'mongodb';

// shema de "demandes"
// {
//   "nomClient": "string",
//   "chansons": ["string"],
//   "dateDemande": "YYYY-MM-DD",
//   "actif": "boolean"
// }

export function getDemande(req, res) {
    const id = req.params.id;

    utiliserDB(async (db) => {
        const demande = await db.collection('demandes').findOne({_id: new ObjectId(id)});
        if (demande) {
            res.status(200).json(demande);
        } else {
            res.status(404).send('Aucune demande trouvée avec l\'ID : ' + id);
        }
    }, res).catch(() => {
        res.status(500).send('Erreur lors de la recherche de la demande');
    });
}