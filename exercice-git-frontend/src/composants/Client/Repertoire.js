import React, {useState} from "react";
import {Container} from "react-bootstrap";

import {ListeCategories} from "./ListeCategories";
import {ListeChansons} from "./ListeChansons";
import {DemandesSpeciales} from "./DemandesSpeciales";

export const Repertoire = () => {
    const [categorieSelectionnee, setCategorieSelectionnee] = useState(null);
    const [chansonsDemandees, setChansonsDemandees] = useState([]);


    // Je ne vois pas comment faire autrement que de passer mes etats en props
    // mais ca me semble pas tres propre comme facon de faire ...

    // TODO : Refactoriser ici ?
    const ajouterChansonListeDemande = (chanson) => {
        const dejaPresentTableau = chansonsDemandees.some(ch => ch._id === chanson._id);

        if (!dejaPresentTableau) {
            setChansonsDemandees([...chansonsDemandees, chanson]);
            // [...n] : spread operator (au lieu de concat ou push dans un for each)
            // doc : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals
            console.log("Chanson : " + chanson._id + " ajoutee a la liste");
        }
    };


    const retirerChansonListeDemande = (idChanson) => {
        setChansonsDemandees(chansonsActuelles => chansonsActuelles.filter(chanson => chanson._id !== idChanson));
        console.log("Chanson : " + idChanson + " retiree de la liste");
    };

    const viderListeDemande = () => {
        setChansonsDemandees([]);
        console.log("Liste videe");
    };


    return (
        <Container>
            <ListeCategories
                setCategorieSelectionnee={setCategorieSelectionnee}
                categorieSelectionnee={categorieSelectionnee}
            />
            <ListeChansons
                categorieSelectionnee={categorieSelectionnee}
                ajouterADemandesSpeciales={ajouterChansonListeDemande}
                retirerDeDemandesSpeciales={retirerChansonListeDemande}
                chansonsDemandees={chansonsDemandees}
            />
            <DemandesSpeciales
                chansonsDemandees={chansonsDemandees}
                viderDemandesSpeciales={viderListeDemande}
            />
        </Container>
    );
}
