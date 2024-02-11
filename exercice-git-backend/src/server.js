import express from 'express';

import {getPieces} from './bd/pieces/getPieces.js';
import {getPiece} from './bd/pieces/getPiece.js';
import {ajouterPiece} from './bd/pieces/ajouterPiece.js';
import {modifierPiece} from './bd/pieces/modifierPiece.js';
import {supprimerPiece} from './bd/pieces/supprimerPiece.js';

import {getDemandes} from './bd/demandes/getDemandes.js';
import {getDemande} from './bd/demandes/getDemande.js';
import {ajouteDemande} from './bd/demandes/ajouteDemande.js';
// import {modifierDemande} from './bd/demandes/modifierDemande.js';
import {supprimerDemande} from './bd/demandes/supprimerDemande.js';

const app = express();
app.use(express.json());

// PIECES
app.get('/api/pieces', getPieces);
app.get('/api/pieces/:id', getPiece);
app.post('/api/pieces/ajouter', ajouterPiece);
app.put('/api/pieces/:id/modifier', modifierPiece);
app.delete('/api/pieces/:id/supprimer', supprimerPiece);

// DEMANDES
app.get('/api/demandes', getDemandes);
app.get('/api/demandes/:id', getDemande);
app.post('/api/demandes/ajouter', ajouteDemande);
// app.put('/api/demandes/:id/modifier', modifierDemande);
app.delete('/api/demandes/:id/supprimer', supprimerDemande);

app.listen(8000, () => console.log('Ecoute sur le port 8000'));