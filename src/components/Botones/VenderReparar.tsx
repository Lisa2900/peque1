import {
  IonButton,
  IonCol,
  IonRow
} from '@ionic/react';
import React, { useState } from 'react';
import BuscarProducto from '../Modales/BuscarProducto';
import RegistrarReparacion from '../Modales/RegistrarReparacion';
import {Button} from "@nextui-org/react";

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
          <Button color="primary" variant="solid" onClick={handleSalesButtonClick}>Ventas</Button>
        </IonCol>
      </IonRow>
      <IonRow >
        <IonCol size="12" className='ml-[90px] mt-[-50px]'>
          <Button color="primary" variant="solid" onClick={handleServiceButtonClick}>Servicios</Button>
        </IonCol>
      </IonRow>
      <BuscarProducto showModal={showBuscarProductoModal} setShowModal={setShowBuscarProductoModal} />
      <RegistrarReparacion showModal={showRegistrarReparacionModal} setShowModal={setShowRegistrarReparacionModal} />
    </>
  );
};

export default VenderReparar;
