import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonList, IonItem, IonLabel, IonButton, IonGrid, IonRow, IonCol, IonModal ,IonToolbar, IonTitle, IonInput} from '@ionic/react';
import Logo from '../img/LOGO copy.png';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup function to clear interval on unmount
  }, []);

  return (
    <IonHeader style={{ backgroundColor: 'red' }}>
      <IonGrid>
        <IonRow className="ion-align-items-center mt-[-20px]">
          <IonCol size="6" className="ion-text-center sm:ion-text-left">
            <img src={Logo} alt="CFE" className="mr-2" style={{ width: '80%', maxWidth: '150px' }} />
          </IonCol>
          <IonCol size="6" className="ion-text-right">
            <p>
              {currentTime.toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              }).toUpperCase()}
            </p>
            <p>{currentTime.toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
  );
};
export default Header