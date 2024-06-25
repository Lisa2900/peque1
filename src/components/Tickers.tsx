import React from 'react';
import { IonButton } from '@ionic/react';

const TicketPrinter = ({ ticketInfo }) => {
  const handlePrint = () => {
    // Lógica para imprimir el ticket
    window.print();
  };
  {/*<div className="flex justify-end mt-10">
  <Receipt receiptInfo={receiptInfo} />
</div>  
  */}
  return (
    <div>
      <h2>Ticket</h2>
      <div>
        {/* Renderiza la información del ticket */}
        <p>Información del ticket: {ticketInfo}</p>
      </div>
      <IonButton onClick={handlePrint}>Imprimir Ticket</IonButton>
    </div>
  );
};

export default TicketPrinter;
