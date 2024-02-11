import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export const PageDemandeSpecial = () => {
    const [demandeSpeciale, setDemandeSpeciale] = useState([]);
    useEffect(() => {
        const chargerDemandeSpeciale = async () => {
            try {
                const response = await fetch(`/api/pieces/demandeSpeciale`);
                if (!response.ok) {
                    console.error(response);
                }
                const donnees = await response.json();

                setDemandeSpeciale(donnees);
            } catch (err) {
                console.error(err);
            }
        };
        chargerDemandeSpeciale();
    });
    return (
        <Container>
            <h1>Demande spéciale</h1>
            <Row>
                <Col>
                    <h3>Titre</h3> 
                </Col>
                <Col>
                    <h3>Artiste</h3>
                </Col>
                <Col>
                    <h3>Supprimer</h3>
                </Col>
                <Col>
                    <h3>Modifier</h3>
                </Col>
            </Row>
        </Container>
    );
}