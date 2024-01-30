# Creation d'un site permettant à un musicien d’afficher et de gérer la liste des pièces qu’il peut jouer. #  
  
## Features ##  
  
**Administrateur  - Consulter les donnees de mon repertoire**  
FE :  
/admin : Zac 3 h  
BE :  
GET /api/pieces : Thomas 1h  
  
**Administrateur  - Cree une piece en lui specifiant un titre un artiste et une categorie**  
FE :  
/ajouter : Zac 3 h  
router : Bryan 2h  
BE :  
POST /api/pieces/ajouter : Thomas 2h  
  
**Administrateur  - Modifier les donnees d'une piece existante**  
FE :  
/modifier/:id : Bryan 2h  
BE :  
GET /api/pieces/:id : Thomas 1h  
PUT /api/pieces/:id/modifier : Thomas 2h  
  
**Administrateur  - Retirer une pieces de mon repertoire**  
FE :  
/supprimer/:id : Bryan  1h  
BE :  
DELETE /api/pieces/:id/supprimer : Thomas 2h  
  
**Client  - Consulter les donnees du repertoire**  
FE :  
/repertoire : 1h Bryan  
  
**CLIENT - ADMIN - Page d'acceuil**  
FE :  
/ : Bryan 1h  
  
## TOTAL ##  
  
ZAC : 7 h  
BRYAN : 7 h  
THOMAS : 7 h  
  
## SPRINTS ##  
  
**SPRINT 1 -**  
/ Repertoire  
/Admin (Bouttons Non Fonctionnel)  
/ Page Acceuil  
GET /api/pieces : retourne la liste de toutes les pièces  
GET /api/pieces/:id : retourne les informations pour une pièce  
  
**SPRINT 2 -**  
/Admin (Boutton Modifier)  
router  
/modifier/:id  
  
PUT /api/pieces/:id/modifier : envoie les informations pour modifier une pièce existante  
  
**SPRINT 3 -**  
/Admin (Boutton Supprimer)  
/ajouter  
/supprimer/:id  
navbar  
  
POST /api/pieces/ajouter (Bryan Full Stack Last Sprint)  
DELETE /api/pieces/:id/supprimer : supprime une pièce du répertoire  
