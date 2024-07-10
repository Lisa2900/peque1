import React, { useState, useEffect } from 'react';
import { IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {Button} from "@nextui-org/react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Sale {
  producto: string;
  codigo: string;
  cantidad: number;
  precio: number;
}

function SalesSection() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => jsPDF;
}

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesCollection = collection(db, 'ventas');
        const salesSnapshot = await getDocs(salesCollection);
        const salesData = salesSnapshot.docs.map(doc => doc.data() as Sale);
        setSales(salesData);

        const total = salesData.reduce((acc, curr) => acc + curr.precio, 0);
        setTotalSales(total);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();
  }, []);

  const generateReport = () => {
    if (!sales.length) {
      console.error("No hay ventas para generar el reporte");
      return;
    }

    const doc = new jsPDF() as jsPDFWithAutoTable;

    const title = "Reporte de ventas del día";
    const fontSize = 18;
    doc.setFontSize(fontSize);
    const pageWidth = doc.internal.pageSize.width;
    const titleWidth = doc.getStringUnitWidth(title) * fontSize / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;

    doc.text(title, titleX, 20);

    const tempTable = document.createElement('table');
    tempTable.innerHTML = `
      <thead>
        <tr>
          <th>Nombre del Producto</th>
          <th>Código del Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        ${sales.map(sale => `
          <tr>
            <td>${sale.producto}</td>
            <td>${sale.codigo}</td>
            <td>${sale.cantidad}</td>
            <td>$${sale.precio}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    doc.autoTable({
      html: tempTable,
      startY: 30,
      styles: { overflow: 'linebreak' },
      columnStyles: { text: { cellWidth: 'wrap' } },
    });

    doc.save('reporte_ventas.pdf');
  };
  return (
    <div className="p-4 bg-zinc-900 rounded-lg shadow-md text-white mb-4">
      <h2 className="text-xl font-bold mb-4">Ventas del día</h2>
      <SalesList sales={sales} />
      <p className="font-bold">Total de venta: ${totalSales}</p>
      <div className="flex justify-end mt-4">
        <Button color="danger" className='mr-2'>Ver reportes anteriores</Button>
        <Button color="primary" onClick={generateReport}>Generar reporte</Button>
      </div>
    </div>
  );
}

const SalesList: React.FC<{ sales: Sale[] }> = ({ sales }) => {
  return (
    <IonList>
      {sales.map((sale, index) => (
        <IonItem key={index}>
          <IonLabel>{sale.producto}</IonLabel>
          <IonLabel>{sale.codigo}</IonLabel>
          <IonLabel>{sale.cantidad}</IonLabel>
          <IonLabel>${sale.precio}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default SalesSection;
