import { IonItem, IonLabel, IonList } from '@ionic/react';

import CFE from '../img/CFE.png';
import Recargas from '../img/recargasxd.jpg';
import Curp from '../img/curp.png';

const Services = () => {
    return (
        <div className="bg-zinc-900 rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Servicios</h2>
            <IonList>
                <IonItem>
                    <a href="https://www.gob.mx/curp/" target="_blank" rel="noopener noreferrer">
                        <img src={Curp} alt="CURP" className="mr-2" style={{ width: '1.5rem', height: '1.5rem' }} />
                        <IonLabel>CURP</IonLabel>
                    </a>
                </IonItem>
                <IonItem>
                    <a href="https://www.cfe.mx/Pages/Inicio.aspx" target="_blank" rel="noopener noreferrer">
                        <img src={CFE} alt="CFE" className="mr-2" style={{ width: '1.5rem', height: '0.75rem' }} />
                        <IonLabel>Recibo de luz</IonLabel>
                    </a>
                </IonItem>
                <IonItem>
                    <a href="https://www.recargas.com/" target="_blank" rel="noopener noreferrer">
                        <img src={Recargas} alt="Recargas" className="mr-2" style={{ width: '1.5rem' }} />
                        <IonLabel>Recargas</IonLabel>
                    </a>
                </IonItem>
            </IonList>
        </div>
    );
};

export default Services;
