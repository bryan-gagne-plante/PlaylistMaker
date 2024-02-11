import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PageAdmin = () => {   
    const [repertoires, setRepertoir] = useState([]);
    useEffect(() => {
        const chargerChansons = async () => {
            try {
                const response = await fetch(`/api/pieces/`);
                if (!response.ok) {
                    console.error(response);
                }
                const donnees = await response.json();

                setRepertoir(donnees);
            } catch (err) {
                console.error(err);
            }
        };
        chargerChansons();
    });
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
    
    const SupprimerChanson = async (chanson) => {
        try {
            const response = await fetch(`/api/pieces/${chanson._id}/supprimer`, {
                method: "DELETE"
            });
            if (!response.ok) {
                console.error(response);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <h1>Page Admin</h1>
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
            {Object.keys(trierParCategories()).map(categorie => (
                <Row key={categorie}>
                    <h2>{categorie}</h2>
                        {trierParCategories()[categorie].map((item, index) => (
                            <Row key={index}>
                                <Col>
                                    {item.titre}
                                </Col>
                                <Col>
                                    {item.artiste}
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={() => SupprimerChanson(item)}>Supprimer </Button>
                                </Col>
                                <Col>
                                    <Button variant="warning" as={Link} to={"/modifier"} state={item}>Modifier</Button>
                                </Col>
                            </Row>
                        ))}
                </Row>
            ))}
        </Container>
    );
};