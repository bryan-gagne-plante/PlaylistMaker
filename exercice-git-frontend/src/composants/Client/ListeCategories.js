import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";

export const ListeCategories = ({setCategorieSelectionnee, categorieSelectionnee}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const chargerCategories = async () => {
            try {
                const reponse = await fetch('/api/pieces/');
                if (!reponse.ok) {
                    console.error(reponse);
                }
                const donnees = await reponse.json();
                const categories = donnees.map((piece) => piece.categorie);
                const categoriesUniques = Array.from(new Set(categories));
                setCategories(categoriesUniques);
            } catch (err) {
                console.error(err);
            }
        };
        chargerCategories();
    }, []);

    const handleCategorieClick = (categorie) => {
        console.log('Avant: ', categorieSelectionnee); // Log avant la mise à jour
        if (categorieSelectionnee === categorie) {
            console.log('Categorie déselectionnée');
            setCategorieSelectionnee(null);
        } else {
            console.log('Categorie sélectionnée : ' + categorie);
            setCategorieSelectionnee(categorie);
        }
        console.log('Après: ', categorieSelectionnee); // Ce log s'exécutera avant la mise à jour réelle de l'état
    };


    return (
        <>
            <h1>Liste des catégories disponible</h1>
            <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                {categories.map((categorie) => (
                    <div
                        key={categorie}
                        style={{
                            width: "100px",
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ccc",
                            cursor: 'pointer',
                            backgroundColor: categorieSelectionnee === categorie ? "#007bff" : "#f8f9fa",
                            color: categorieSelectionnee === categorie ? "white" : "black",
                            borderRadius: "5px", // Ajouté pour un peu de style
                        }}
                        onClick={() => handleCategorieClick(categorie)}
                    >
                        {categorie}
                    </div>
                ))}
            </div>
        </>
    );
}
