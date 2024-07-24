import React from 'react';
import Camera from '../../components/Scanner';
import Search from '../../components/Search';
import Table from '../../components/Table';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

function Inventario() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventario</IonTitle>
          <Search />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Camera />
        <Table />
        <IonButton routerLink="/home" expand="full" color="primary">
          Volver a Inicio
        </IonButton>
      </IonContent>
    </>
  );
}

export default Inventario;
