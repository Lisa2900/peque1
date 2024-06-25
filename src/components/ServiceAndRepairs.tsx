import React from 'react'
import Repairs from './Repairs';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import CFE from '../img/CFE.png';
import Esta from '../img/Esta.png';
import Logo from '../img/LOGO copy.png';
import Recargas from '../img/recargasxd.jpg';
import Curp from '../img/curp.png';
import Receipt from './Receipt';

const Services = () => {
    return (
      <div className="bg-zinc-900 rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Servicios</h2>
        <IonList>
          <IonItem>
            <img src={Curp} alt="CURP" className="mr-2" style={{ width: '1.5rem', height: '1.5rem' }} />
            <IonLabel>CURP</IonLabel>
          </IonItem>
          <IonItem>
            <img src={CFE} alt="CFE" className="mr-2" style={{ width: '1.5rem', height: '0.75rem' }} />
            <IonLabel>Recibo de luz</IonLabel>
          </IonItem>
          <IonItem>
            <img src={Recargas} alt="Recargas" className="mr-2" style={{ width: '1.5rem' }} />
            <IonLabel>Recargas</IonLabel>
          </IonItem>
        </IonList>
      </div>
    );
  };
  
  

function ServiceAndRepairs() {
  return (
    <div className="p-4 text-white mb-4">
    <Services />
    <Repairs />
  </div>
  )
}

export default ServiceAndRepairs