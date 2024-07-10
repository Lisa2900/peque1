import React from 'react';
import jsPDF from 'jspdf';
import { IonButton } from '@ionic/react';
import logo from '../img/Logonuevoxd.png'; // Asegúrate de tener la imagen en tu proyecto

interface ReciboProps {
  repair: {
    id: string;
    title: string;
    description: string;
    date: string;
    brand: string;
    model: string;
    deviceType: string;
    repairType: string;
    status: string;
  };
}

const Recibo: React.FC<ReciboProps> = ({ repair }) => {
  const handlePrintReceipt = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 150] // Ancho y alto similar a un ticket
    });

    // Añadir un logo en la esquina superior izquierda
    const img = new Image();
    img.src = logo; // La ruta de la imagen o la imagen base64
    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 60, 30); // Ajusta la posición y tamaño del logo (60x30 mm)

      // Agregar la fecha y línea debajo de ella
      doc.setFontSize(10);
      const fecha = new Date().toLocaleDateString();
      doc.text(`Fecha: ${fecha}`, 10, 45);
      doc.setLineWidth(0.5); // Grosor de la línea
      doc.line(10, 48, 70, 48); // Línea horizontal debajo de la fecha

      doc.setFontSize(12);
      doc.text('Recibo de Reparación', 10, 60);

      doc.setFontSize(10);
      doc.text(`Estado: ${repair.status}`, 10, 70);
      doc.text(`Descripción: ${repair.description}`, 10, 80);
      doc.text(`Marca: ${repair.brand}`, 10, 90);
      doc.text(`Modelo: ${repair.model}`, 10, 100);
      doc.text(`Tipo de dispositivo: ${repair.deviceType}`, 10, 110);
      doc.text(`Tipo de reparación: ${repair.repairType}`, 10, 120);

      doc.save('recibo_reparacion.pdf');
      console.log('Recibo impreso');
    };

    img.onerror = (error) => {
      console.error('Error al cargar la imagen:', error);
    };
  };

  return <IonButton expand="full" onClick={handlePrintReceipt}>Imprimir recibo</IonButton>;
};

export default Recibo;
