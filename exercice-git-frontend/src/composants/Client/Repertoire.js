import React, {useState} from "react";
import {Container} from "react-bootstrap";

import {ListeCategories} from "./ListeCategories";
import {ListeChansons} from "./ListeChansons";

export const Repertoire = () => {
    const [categorieSelectionnee, setCategorieSelectionnee] = useState(null);

    return (
        <Container>
            <ListeCategories
                setCategorieSelectionnee={setCategorieSelectionnee}
                categorieSelectionnee={categorieSelectionnee}
            />
            <ListeChansons categorieSelectionnee={categorieSelectionnee}/>
        </Container>
    );
}
