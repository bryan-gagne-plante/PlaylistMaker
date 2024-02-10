import React from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { repertoire } from "../repertoire";

export const PageModifier = () => {
    const location = useLocation();
    const chanson = location.state;

    const modifierChanson = () => {
        const titre = document.getElementById("Titre").value;
        const artiste = document.getElementById("Artiste").value;
        const categorie = document.getElementById("Categorie").value;
        const index = repertoire.indexOf(chanson);
         repertoire[index] = { "titre": titre, "artiste": artiste, "categorie": categorie };
        console.log(repertoire);
    }
    
    return (
        <Form>
            <Form.Group className="mb-3" controlId="Titre">
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" placeholder={chanson.titre} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Artiste">
                <Form.Label>Artiste</Form.Label>
                <Form.Control type="text" placeholder={chanson.artiste} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Categorie">
                <Form.Label>Catégorie</Form.Label>
                <Form.Control type="text" placeholder={chanson.categorie} />
            </Form.Group>
            <Button variant="primary" onClick={() => modifierChanson()}>Submit</Button>
        </Form>
    );
}