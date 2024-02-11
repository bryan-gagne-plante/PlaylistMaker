import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";


export const PageCreer = () => {
    const [nombreCategorie, setNombreCategorie] = useState(0);
    const [redirect, setRedirect] = useState(false);
    console.log(nombreCategorie);

    const creerChanson = async () => {
        const titre = document.getElementById("Titre").value;
        const artiste = document.getElementById("Artiste").value;
        const categorie = document.getElementById("Categorie").value;
        const chansonCreee = {
            titre: titre,
            artiste: artiste,
            categorie: categorie
        }
        try {
            const response = await fetch(`/api/pieces/ajouter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(chansonCreee)
            });
            if (!response.ok) {
                console.error(response);
            }
        } catch (err) {
            console.error(err);
        }
        setRedirect(true);
    }
    return (
        <Form>
            {redirect && <Navigate to="/admin" />}
            <Row>
                <h1>Créer une chanson</h1>
            </Row>
            <Row xs={4}>
                <Col>
                    <Form.Group className="mb-3" controlId="Titre">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Numb" />
                    </Form.Group>
                </Col>
            </Row>
            <Row xs={4}>
                <Col>
                    <Form.Group className="mb-3" controlId="Artiste">
                        <Form.Label>Artiste</Form.Label>
                        <Form.Control type="text" placeholder="Linkin park" />
                    </Form.Group>
                </Col>
            </Row>
            <Row xs={4}>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control onChange={e => setNombreCategorie(e.target.value)} type="number" placeholder="nombre de categorie" />
                        {Array.from({ length: nombreCategorie }).map((_, index) => (
                            <Form.Control id="Categorie" key={index} type="text" placeholder={`Categorie ${index + 1}`} />
                        ))}
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" onClick={creerChanson}>Submit</Button>
        </Form>
    );
}
