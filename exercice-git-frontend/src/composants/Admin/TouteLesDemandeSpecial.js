import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";

export const TouteLesDemandeSpecial = () => {
    const [demandeSpeciale, setDemandeSpeciale] = useState([]);
    const [ordreTri, setOrdreTrie] = useState(true);
    const [filtre, setFiltre] = useState("");
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

    const afficherActif = (actif) => {
        if (actif === true) {
            return "Oui";
        } else {
            return "Non";
        }
    }

    const mettreDemandeInactevive = async (id) => {
        const demande = demandeSpeciale.find((demande) => demande._id === id);
        if (demande.actif === false) {
            demande.actif = true;
        }
        else {
            demande.actif = false;
        }
        try {
            const response = await fetch(`/api/demandes/${demande._id}/modifier`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(demande),
            });
            if (!response.ok) {
                console.error(response);
            }
            const donnees = await response.json();
            setDemandeSpeciale(donnees);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    }

    const trierParDateDAjout = () => {
        const demandeTrie = [...demandeSpeciale].sort((a, b) => {
            if (ordreTri) {
                return new Date(a.dateDemande) - new Date(b.dateDemande);
            } else {
                return new Date(b.dateDemande) - new Date(a.dateDemande);
            }
        });
        setDemandeSpeciale(demandeTrie);
        setOrdreTrie(!ordreTri);
    }

    const listeDemandeFiltrees = demandeSpeciale.length > 0 &&
        demandeSpeciale.filter(demandeSpecial => (demandeSpecial.nomClient.toLowerCase().includes(filtre.toLowerCase())));

    return (
        <Container>
            <h1>Demande spéciale</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Rechercher nom du client "
                    onChange={(e) => setFiltre(e.target.value)}
                />
            </InputGroup>
            <Button onClick={trierParDateDAjout}> {ordreTri ? 'trie par date asc' : 'trie par date desc'}</Button>
            <Table striped bordered hover>
                <thead>
                    {demandeSpeciale.length > 0 && (
                    <tr key={demandeSpeciale._id}>
                        <th>Nom du client</th>
                        <th>Chansons</th>
                        <th>Date de la demande</th>
                        <th>Actif</th>
                    </tr>)}
                </thead>
                <tbody>
                    {demandeSpeciale.length > 0 && listeDemandeFiltrees.map((demande) => (
                        <tr key={demande._id}>
                            <td>{demande.nomClient}</td>
                            <td>{demande.chansons.join(", ")}</td>
                            <td>{demande.dateDemande}</td>
                            <td>{afficherActif(demande.actif)}</td>
                            <td>
                                <Button onClick={() => mettreDemandeInactevive(demande._id)}>Activer/Désactiver</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}