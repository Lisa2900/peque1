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

  // W-full and h-12 in movil, sm:h10 and sm:w1/6 in screen big
  return (
    <>
<IonRow>
  <IonCol size="12" className="flex justify-start gap-4">
    <Button 
      className="
        transition 
        ease-in-out 
        delay-150 
        bg-red-800 
        hover:-translate-y-1 
        hover:scale-110 
        hover:bg-white-1000 
        duration-300 
        h-12 
        w-1/2 
        sm:w-1/6 
        text-white
      " 
      onClick={handleSalesButtonClick}
    >
      Ventas
    </Button>
    <Button 
      className="
        transition 
        ease-in-out 
        delay-150 
        bg-red-800 
        hover:-translate-y-1 
        hover:scale-110 
        hover:bg-white-1000 
        duration-300 
        h-12 
        w-1/2 
        sm:w-1/6 
        text-white
      " 
      onClick={handleServiceButtonClick}
    >
      Servicios
    </Button>
  </IonCol>
</IonRow>


      <BuscarProducto showModal={showBuscarProductoModal} setShowModal={setShowBuscarProductoModal} />
      <RegistrarReparacion showModal={showRegistrarReparacionModal} setShowModal={setShowRegistrarReparacionModal} />
    </>
  );
};

export default VenderReparar;
