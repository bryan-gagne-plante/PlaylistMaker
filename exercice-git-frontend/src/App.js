import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BarreNavigation } from "./composants/BarreNavigation";
import { PageAccueil } from "./pages/PageAccueil";
import { PageAdmin } from "./pages/PageAdmin";
import { PageClient } from "./pages/PageClient";
import { PageCreer } from "./pages/PageCreer";
import { PageDemandeSpecial } from "./pages/PageDemandeSpecial";
import { PageModifier } from "./pages/PageModifier";
import Langages from "./composants/Langages";

function App() {
    return (
        <BrowserRouter>
            <Container>
                <Langages/>
                <BarreNavigation/>
                <Routes>
                    <Route path="/" element={<PageAccueil/>}/>
                    <Route path="/admin" element={<PageAdmin/>}/>
                    <Route path="/modifier" element={<PageModifier/>}/>
                    <Route path="/creer" element={<PageCreer/>}/>
                    <Route path="/client" element={<PageClient/>}/>
                    <Route path="/demandeSpecial" element={<PageDemandeSpecial/>}/>
                    { /* exemple d'utilisation : <Route path={"/test-navigation"} element={<NavigationTest/>}/>*/ }
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
