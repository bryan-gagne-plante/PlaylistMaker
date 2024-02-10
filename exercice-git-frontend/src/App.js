import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { BarreNavigation } from "./composants/BarreNavigation";
import { PageAccueil } from "./pages/PageAccueil";
import { PageAdmin } from "./pages/PageAdmin";
import { PageClient } from "./pages/PageClient";

function App() {
    return (
        <BrowserRouter>
            <Container>
                <BarreNavigation/>
                <Routes>
                    <Route path="/" element={<PageAccueil/>}/>
                    <Route path="/admin" element={<PageAdmin/>}/>
                    <Route path="/client" element={<PageClient/>}/>
                    { /* exemple d'utilisation : <Route path={"/test-navigation"} element={<NavigationTest/>}/>*/ }
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
