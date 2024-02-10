import {utiliserDB} from "../connection";

export function ajouteDemande(req, res) {
    const {nomClient, chansons} = req.body;

    if (nomClient !== undefined && chansons !== undefined) {
        let dateDemande = new Date().toISOString().slice(0, 10);
        let actif = true;

        utiliserDB(async (db) => {
            await db.collection('demandes').insertOne({
                nomClient: nomClient,
                chansons: chansons,
                dateDemande: dateDemande,
                actif: actif
            });

            res.status(200).send('Demande ajoutee');
        }, res).catch(
            () => res.status(500).send('Erreur : demande non ajoutee')
        );
    } else {
        res.status(500).send('Erreur : parametre manquant');
    }
}