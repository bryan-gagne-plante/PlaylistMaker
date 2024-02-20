import React, {useState} from 'react';
import {Button, Form, ListGroup} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const DemandesSpeciales = ({chansonsDemandees, viderDemandesSpeciales}) => {
    const { t } = useTranslation();
    const [nom, setNom] = useState('');

    const envoyerDemandes = async () => {
        try {
            if (!nom) {
                alert('Veuillez entrer votre nom');
                return;
            }

            const titreChansons = chansonsDemandees.map(chanson => chanson.titre);
            console.log(titreChansons);

            const reponse = await fetch('/api/demandes/ajouter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomClient: nom,
                    chansons: titreChansons,
                }),
            });

            if (!reponse.ok) {
                throw new Error('Probleme lors de l\'envoi de la demande');
            }

            alert('Demande envoyees avec succes!');
            viderDemandesSpeciales();
            setNom('');
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue lors de l\'envoi de la demande');
        }
    };

    return (
        <div>
            <br/>
            <h3>{t('DemandesSpecials-Titre')}</h3>
            <Form.Group>
                <Form.Label>{t('DemandesSpecials-Nom')}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={t('DemandesSpecials-NomPlaceholder')}
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
            </Form.Group>
            <ListGroup>
                {chansonsDemandees.map(chanson => (
                    <ListGroup.Item key={chanson._id} className="d-flex justify-content-between align-items-center">
                        {chanson.titre} - {chanson.artiste} - {chanson.categorie}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button
                variant="primary"
                onClick={envoyerDemandes}
                disabled={chansonsDemandees.length === 0 || !nom}
            >
                {t('DemandesSpecials-Envoyer')}
            </Button>
        </div>
    );
};
