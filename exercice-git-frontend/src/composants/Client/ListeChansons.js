import React, {useEffect, useState} from "react";
import {ListGroup, Form, Dropdown, InputGroup, Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const ListeChansons = ({
                                  categorieSelectionnee,
                                  ajouterADemandesSpeciales,
                                  retirerDeDemandesSpeciales,
                                  chansonsDemandees
                              }) => {
    const {t} = useTranslation();
    const [chansons, setChansons] = useState([]);
    const [filtre, setFiltre] = useState("");
    const [critereTri, setCritereTri] = useState("titre");
    const [ordreTri, setOrdreTri] = useState("asc");

    useEffect(() => {
        const chargerChansons = async () => {
            try {
                const reponse = await fetch('/api/pieces');
                if (!reponse.ok) {
                    throw new Error(reponse);
                }
                const donnees = await reponse.json();
                setChansons(donnees);
                console.log("Chargement des chansons reussi")
            } catch (err) {
                console.error(err);
            }
        };

        chargerChansons();
    }, []);

    // Filtre et trie des chansons (algorithme inspire des demonstrations sur ce site : https://serversideup.net/filter-sort-and-search-arrays-with-javascript/)
    const listeChansonsFiltreesTriees = chansons
        .filter(chanson => // Debut du filtre
            // Filtrage selon la categorie
            (!categorieSelectionnee || chanson.categorie === categorieSelectionnee) &&
            // Filtrage selon le input : filtre
            (chanson.titre.toLowerCase().includes(filtre.toLowerCase()) ||
                chanson.artiste.toLowerCase().includes(filtre.toLowerCase()) ||
                chanson.categorie.toLowerCase().includes(filtre.toLowerCase()))
        )
        .sort((a, b) => { // Debut du tri
            let comparaison = 0;
            // Comparaison des valeurs selon le critere de tri
            if (a[critereTri].toLowerCase() < b[critereTri].toLowerCase()) {
                comparaison = -1;
            } else if (a[critereTri].toLowerCase() > b[critereTri].toLowerCase()) {
                comparaison = 1;
            }
            // Retourne le resultat selon l'ordre de tri
            return ordreTri === "asc" ? comparaison : -comparaison;
        });

    return (
        <>
            <br/>
            <h3>Liste des chansons</h3>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Rechercher ..."
                    onChange={(e) => setFiltre(e.target.value)}
                />
                <Dropdown as={InputGroup.Append}>
                    <Dropdown.Toggle
                        style={{
                            minWidth: "100px",
                            border: "1px solid black",
                            backgroundColor: "#3193ff"
                        }}
                    >
                        {t('ListeChansons-Trier')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu> {/* https://react-bootstrap.netlify.app/docs/components/dropdowns/ */}
                        <Dropdown.Item onClick={() => {
                            setCritereTri("titre");
                            setOrdreTri("asc");
                        }}>{t('ListeChansons-TitreAsc')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("titre");
                            setOrdreTri("desc");
                        }}>{t('ListeChansons-TitreDesc')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("artiste");
                            setOrdreTri("asc");
                        }}>{t('ListeChansons-ArtisteAsc')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("artiste");
                            setOrdreTri("desc");
                        }}>{t('ListeChansons-ArtisteDesc')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("categorie");
                            setOrdreTri("asc");
                        }}>{t('ListeChansons-CategorieAsc')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setCritereTri("categorie");
                            setOrdreTri("desc");
                        }}>{t('ListeChansons-CategorieDesc')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup>
            <ListGroup>
                {listeChansonsFiltreesTriees.map((chanson) => {
                    const estDemandee = chansonsDemandees.some(demande => demande._id === chanson._id);
                    return (
                        <ListGroup.Item key={chanson._id} className="d-flex justify-content-between align-items-center">
                            {chanson.titre} - {chanson.artiste} - {chanson.categorie}
                            <Button
                                size="sm"
                                onClick={() => estDemandee ? retirerDeDemandesSpeciales(chanson._id) : ajouterADemandesSpeciales(chanson)}
                                style={{
                                    marginLeft: "10px",
                                    minWidth: "30px",
                                    backgroundColor: estDemandee ? '#ff3535' : '#3193ff',
                                    border: "1px solid black"
                                }}
                            >
                                {estDemandee ? '-' : '+'}
                            </Button>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>

        </>
    );
};
