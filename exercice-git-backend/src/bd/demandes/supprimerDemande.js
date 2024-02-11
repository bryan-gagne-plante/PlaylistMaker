import {utiliserDB} from "../connection";
import {ObjectId} from 'mongodb';

export function supprimerDemande(req, res) {
    const id = req.params.id;

    utiliserDB(async (db) => {
        const resultat = await db.collection('demandes').deleteOne({_id: new ObjectId(id)});

        if (resultat.deletedCount === 1) {
            res.status(200).send('Demande supprimee');
        } else {
            res.status(500).send('Erreur : demande non supprimee');
        }
    }, res).catch(
        () => res.status(500).send('Erreur : demande non supprimee')
    );
}