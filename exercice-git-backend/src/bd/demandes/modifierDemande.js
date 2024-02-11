import {utiliserDB} from "../connection";
import {ObjectId} from 'mongodb';

export function modifierDemande(req, res) {
    const {id} = req.params;
    const {nomClient, chansons, dateDemande, actif} = req.body;

    if (nomClient !== undefined && chansons !== undefined && dateDemande !== undefined && actif !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('demandes').updateOne({_id: new ObjectId(id)}, {
                '$set': {
                    nomClient: nomClient,
                    chansons: chansons,
                    dateDemande: dateDemande,
                    actif: actif
                }
            });

            const demandeMAJ = await db.collection('demandes').findOne({_id: new ObjectId(id)});
            res.status(200).json(demandeMAJ);
        }, res).catch(
            () => res.status(500).send('Erreur : demande non modifiee')
        );
    } else {
        res.status(500).send('Erreur : parametre manquant');
    }
}