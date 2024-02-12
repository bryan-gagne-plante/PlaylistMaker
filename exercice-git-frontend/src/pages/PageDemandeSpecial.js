import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { DemandeSpecialActive } from '../composants/Admin/DemandeSpecialActive';
import { Top5PieceDemande } from '../composants/Admin/Top5PieceDemande';
import { TouteLesDemandeSpecial } from '../composants/Admin/TouteLesDemandeSpecial';

export const PageDemandeSpecial = () => {
  return (
    <Tabs
      defaultActiveKey="All"
      id="toutesLesDemandesSpeciales"
      className="mb-3"
    >
        <Tab eventKey="All" title="All">
            <TouteLesDemandeSpecial />
        </Tab>
        <Tab eventKey="Active" title="Active">
            <DemandeSpecialActive />
        </Tab>
        <Tab eventKey="Top5" title="Top5">
            <Top5PieceDemande />
        </Tab>
    </Tabs>
  );
}