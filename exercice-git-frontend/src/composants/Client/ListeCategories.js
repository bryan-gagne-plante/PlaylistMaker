import React, {useEffect, useState} from "react";
import {Container, ListGroup, ListGroupItem} from "react-bootstrap";

import {ListeChansonsCategorie} from "./ListeChansonsCategorie";

export const ListeCategories = () => {
    const [categories, setCategories] = useState([]);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState(null);

    useEffect(() => {
        const chargerCategories = async () => {
            try {
                const reponse = await fetch('/api/pieces/');
                if (!reponse.ok) {
                    console.error(reponse);
                }
                const donnees = await reponse.json();
                const categories = donnees.map((piece) => piece.categorie)
                const categoriesUniques = Array.from(new Set(categories));
                setCategories(categoriesUniques);
            } catch (err) {
                console.error(err);
            }
        };
        chargerCategories();
    }, []);

    const handleClick = (categorie) => {
        setCategorieSelectionnee(categorie);
    }

    return (
        <Container>
            <h1>Liste des catégories disponible</h1>
            <ListGroup>
                {categories.map((categorie, index) => (
                    <ListGroupItem
                        key={categorie}
                        style={{cursor: 'pointer'}}
                        onClick={() => handleClick(categorie)}
                    >
                        {categorie}
                    </ListGroupItem>
                ))}
            </ListGroup>

            {categorieSelectionnee && <ListeChansonsCategorie categorie={categorieSelectionnee}/>}
        </Container>
    );
}