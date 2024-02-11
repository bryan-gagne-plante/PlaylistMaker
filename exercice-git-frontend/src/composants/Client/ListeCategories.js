import React, {useEffect, useState} from "react";

export const ListeCategories = ({setCategorieSelectionnee, categorieSelectionnee}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const chargerCategories = async () => {
            try {
                const reponse = await fetch('/api/pieces/');
                if (!reponse.ok) {
                    throw new Error(reponse);
                }
                const donnees = await reponse.json();
                const categories = donnees.map((piece) => piece.categorie);
                const categoriesUniques = Array.from(new Set(categories));
                setCategories(categoriesUniques);
                console.log("Chargement des categories reussi");
            } catch (err) {
                console.error(err);
            }
        };

        chargerCategories();
    }, []);

    const handleCategorieClick = (categorie) => {
        if (categorieSelectionnee === categorie) {
            console.log('Categorie ' + categorie + ' déselectionnee');
            setCategorieSelectionnee(null);
        } else {
            console.log('Categorie sélectionnee : ' + categorie);
            setCategorieSelectionnee(categorie);
        }
    };


    return (
        <>
            <br/>
            <h3>Liste des categories disponible</h3>
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
                            textAlign: "center",
                            border: "1px solid black",
                            cursor: 'pointer',
                            backgroundColor:
                                categorieSelectionnee === categorie ? "#3193ff" : "#f3f3f3",
                            color:
                                categorieSelectionnee === categorie ? "white" : "black",
                            borderRadius: "5px",
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
