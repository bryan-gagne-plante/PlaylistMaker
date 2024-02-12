import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

export const Top5PieceDemande = () => {
    const [demandeSpeciale, setDemandeSpeciale] = useState([]);
    const [pieces, setPieces] = useState([]);
    

    useEffect(() => {
        const chargerDemandeSpeciale = async () => {
            try {
                const response = await fetch(`/api/demandes`);
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
    }, []); 

    useEffect(() => {
        const chargerPieces = async () => {
            try {
                const response = await fetch(`/api/pieces`);
                if (!response.ok) {
                    console.error(response);
                }
                const donnees = await response.json();

                setPieces(donnees);
            } catch (err) {
                console.error(err);
            }
        };
        chargerPieces();
    }, []);

    const nombrePiecesDemande = (piece) => {
        let nombre = 0;
        demandeSpeciale.forEach((demande) => {
            demande.chansons.forEach((chanson) => {
                if (chanson === piece.titre) {
                    nombre++;
                }
            });
        });
        return nombre;
    }

    const piecesTrie = [...pieces].sort((a, b) => {
        return nombrePiecesDemande(b) - nombrePiecesDemande(a);
    }).concat().slice(0, 5);

    return (
        <Container>
            <h1>Top 5 chanson demande</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Artiste</th>
                        <th>Nombre de demande</th>
                    </tr>
                </thead>
                <tbody>
                    {piecesTrie.map((piece) => {
                        return (
                            <tr key={piece._id}>
                                <td>{piece.titre}</td>
                                <td>{piece.artiste}</td>
                                <td>{nombrePiecesDemande(piece)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}