import React from 'react';
import { IonButton } from '@ionic/react';


const TicketPrinter: React.FC<{ ticketInfo: string }> = ({ ticketInfo }) => {
  const handlePrint = () => {
    // Lógica para imprimir el ticket
    window.print();
  };

  return (
    <div>
      <h2>Ticket</h2>
      <div>
        {/* Renderiza la información del ticket */}
        <p>Información del ticket: {ticketInfo}</p>
      </div>

      {/* Bloque comentado correctamente */}
      {/* <div className="flex justify-end mt-10">
        <Receipt receiptInfo={receiptInfo} />
      </div> */}

      <IonButton onClick={handlePrint}>Imprimir Ticket</IonButton>
    </div>
  );
};

export default TicketPrinter;
