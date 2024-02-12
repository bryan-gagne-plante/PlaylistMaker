import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";

export const DemandeSpecialActive = () => {
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

    const listeDemandeFiltrees = demandeSpeciale
        .filter(demandeSpecial => (demandeSpecial.nomClient.toLowerCase().includes(filtre.toLowerCase())));

    return (
        <Container>
            <h1>Demande spéciale Active</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Rechercher ..."
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
                    </tr>)}
                </thead>
                <tbody>
                    {demandeSpeciale.length > 0 && listeDemandeFiltrees.filter((demande) => demande.actif === true).map((demande) => (
                        <tr key={demande._id}>
                            <td>{demande.nomClient}</td>
                            <td>{demande.chansons.join(", ")}</td>
                            <td>{demande.dateDemande}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}