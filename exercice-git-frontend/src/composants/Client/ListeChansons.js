import React, {useEffect, useState} from "react";
import {ListGroup, Form, Dropdown, InputGroup} from "react-bootstrap";

export const ListeChansons = ({categorieSelectionnee}) => {
    const [chansons, setChansons] = useState([]);
    const [filtre, setFiltre] = useState("");
    const [critereTri, setCritereTri] = useState("titre");
    const [ordreTri, setOrdreTri] = useState("asc");

    useEffect(() => {
        const chargerChansons = async () => {
            try {
                const reponse = await fetch('/api/pieces');
                if (!reponse.ok) {
                    throw new Error('Probleme lors du chargement des chansons');
                }
                const donnees = await reponse.json();
                setChansons(donnees);
            } catch (err) {
                console.error(err);
            }
        };

        chargerChansons();
    }, []);

    const chansonsFiltreesEtTriees = chansons
        .filter(chanson =>
            (!categorieSelectionnee || chanson.categorie === categorieSelectionnee) &&
            (chanson.titre.toLowerCase().includes(filtre.toLowerCase()) ||
                chanson.artiste.toLowerCase().includes(filtre.toLowerCase()) ||
                chanson.categorie.toLowerCase().includes(filtre.toLowerCase()))
        )
        .sort((a, b) => {
            let comparaison = 0;
            if (a[critereTri].toLowerCase() < b[critereTri].toLowerCase()) {
                comparaison = -1;
            } else if (a[critereTri].toLowerCase() > b[critereTri].toLowerCase()) {
                comparaison = 1;
            }
            return ordreTri === "asc" ? comparaison : -comparaison;
        });

    return (
        <>
            <h1>Liste des chansons</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Rechercher..."
                    onChange={(e) => setFiltre(e.target.value)}
                />
                <Dropdown as={InputGroup.Append}>
                    <Dropdown.Toggle variant="outline-secondary">
                        Trier
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("titre");
                            setOrdreTri("asc");
                        }}>Titre Ascendant</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("titre");
                            setOrdreTri("desc");
                        }}>Titre Descendant</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("artiste");
                            setOrdreTri("asc");
                        }}>Artiste Ascendant</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("artiste");
                            setOrdreTri("desc");
                        }}>Artiste Descendant</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("categorie");
                            setOrdreTri("asc");
                        }}>Catégorie Ascendant</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("categorie");
                            setOrdreTri("desc");
                        }}>Catégorie Descendant</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup>
            <ListGroup>
                {chansonsFiltreesEtTriees.map((chanson) => (
                    <ListGroup.Item key={chanson._id}>
                        {chanson.titre} - {chanson.artiste} - {chanson.categorie}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};
