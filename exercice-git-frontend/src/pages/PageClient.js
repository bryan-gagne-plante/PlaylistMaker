import React from "react";
import { Container } from "react-bootstrap";

import { Repertoire } from "../composants/Client/Repertoire";

export const PageClient = () => {
    return (
        <Container>
            <h1>Page Client</h1>
            <Repertoire/>
        </Container>
    );
}