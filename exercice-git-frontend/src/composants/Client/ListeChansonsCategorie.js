import React, {useEffect, useState} from 'react';
import {Container, ListGroup, ListGroupItem} from 'react-bootstrap';

export const ListeChansonsCategorie = ({categorie}) => {
    const [chansons, setChansons] = useState([]);

    useEffect(() => {
        const chargerChansons = async () => {
            try {
                const response = await fetch(`/api/pieces/`);
                if (!response.ok) {
                    console.error(response);
                }
                const donnees = await response.json();
                const chansons = donnees.filter((piece) => piece.categorie === categorie);

                setChansons(chansons);
            } catch (err) {
                console.error(err);
            }
        };
        chargerChansons();
    }, [categorie]);

    return (
        <Container>
            <h2>Chansons disponible pour la catégorie : {categorie}</h2>
            <ListGroup>
                {chansons.map((chanson) => (
                    <ListGroupItem key={chanson._id} style={{cursor: 'pointer'}}>{chanson.titre}</ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
}