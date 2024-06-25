import {
  IonButton,
  IonCol,
  IonRow
} from '@ionic/react';
import React, { useState } from 'react';
import BuscarProducto from '../Modales/BuscarProducto';
import RegistrarReparacion from '../Modales/RegistrarReparacion';

const VenderReparar: React.FC = () => {
  const [showBuscarProductoModal, setShowBuscarProductoModal] = useState(false);
  const [showRegistrarReparacionModal, setShowRegistrarReparacionModal] = useState(false);

  const handleSalesButtonClick = () => {
    setShowBuscarProductoModal(true);
  };

  const handleServiceButtonClick = () => {
    setShowRegistrarReparacionModal(true);
  };

  return (
    <>
      <IonRow>
        <IonCol size="12">
          <IonButton expand="full" onClick={handleSalesButtonClick}>Ventas</IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonButton expand="full" onClick={handleServiceButtonClick}>Servicios</IonButton>
        </IonCol>
      </IonRow>
      <BuscarProducto showModal={showBuscarProductoModal} setShowModal={setShowBuscarProductoModal} />
      <RegistrarReparacion showModal={showRegistrarReparacionModal} setShowModal={setShowRegistrarReparacionModal} />
    </>
  );
};

export default VenderReparar;
