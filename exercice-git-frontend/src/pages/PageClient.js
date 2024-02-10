import React from "react";
import {Container} from "react-bootstrap";

import {ListeCategories} from "../composants/Client/ListeCategories";

export const PageClient = () => {
    return (
        <Container>
            <ListeCategories/>
        </Container>
    );
}