import React from 'react';
import { IonButtons, IonBackButton } from '@ionic/react';

const Atras: React.FC = () => {
  return (
    <IonButtons slot="start">
      <IonBackButton />
    </IonButtons>
  );
}

export default Atras;
