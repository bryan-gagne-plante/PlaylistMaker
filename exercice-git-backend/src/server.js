import express from 'express';

import {getPieces} from './bd/getPieces.js';
import {getPiece} from './bd/getPiece.js';
import {ajouterPiece} from './bd/ajouterPiece.js';
import {modifierPiece} from './bd/modifierPiece.js';
import {supprimerPiece} from './bd/supprimerPiece.js';

const app = express();
app.use(express.json());

app.get('/api/pieces', getPieces);
app.get('/api/pieces/:id', getPiece);
app.post('/api/pieces/ajouter', ajouterPiece);
app.put('/api/pieces/:id/modifier', modifierPiece);
app.delete('/api/pieces/:id/supprimer', supprimerPiece);

app.listen(8000, () => console.log('Ecoute sur le port 8000'));