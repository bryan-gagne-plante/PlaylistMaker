import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { repertoire } from "../repertoire.js";

export const PageAdmin = () => {
    const [repertoires, setRepertoir] = useState(repertoire);
    const trierParCategories = () => {
        const repertoireTri = {};
        repertoires.forEach(item => {
        if (!repertoireTri[item.categorie]) {
          repertoireTri[item.categorie] = [];
        }
        repertoireTri[item.categorie].push(item);
        });
        return repertoireTri;
    }
    
    const SupprimerChanson = (chanson) => {
        repertoires.splice(repertoires.indexOf(chanson), 1);
    }
    
    const modifierChanson = (chanson) => {
        repertoires.splice(repertoires.indexOf(chanson), 1);
    }

    return (
        <div>
          {Object.keys(trierParCategories()).map(categorie => (
            <div key={categorie}>
              <h2>{categorie}</h2>
              <ul>
                {trierParCategories()[categorie].map((item, index) => (
                  <li key={index}>
                    <strong>Titre:</strong> {item.titre}, <strong>Artiste:</strong> {item.artiste}
                    <Button variant="danger" onClick={() => SupprimerChanson(item)}>Supprimer </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    );
};


