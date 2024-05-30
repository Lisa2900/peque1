import React, { useState, useEffect } from "react";
import { IonButton, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import UserCreation from '../components/NewProduct/UserCreation';
import EditIcon from './Botones/EditIcon';
import DeleteButton from './Botones/DeleteButton'; // Importa el nuevo componente
import UpdateUser from '../components/NewProduct/UpdateUser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { db } from '../firebase'; // Importa la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias de Firebase Firestore
import { pencil } from "ionicons/icons";

interface InventarioItem {
    id: string;
    nombre: string;
    codigo: string;
    cantidad: number;
    categoria: string;
}

interface jsPDFWithAutoTable extends jsPDF {
    autoTable: (options: any) => jsPDF;
}

const App: React.FC = () => {
    const [estadoFrom, setCerraFrom] = useState<boolean>(false);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<InventarioItem | null>(null);
    const [tableLoaded, setTableLoaded] = useState<boolean>(false);
    const [inventario, setInventario] = useState<InventarioItem[]>([]);

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'inventario'));
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as InventarioItem[];
        setInventario(data);
        setTableLoaded(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleExportToPDF = () => {
        if (!tableLoaded) {
            console.error("Error: Table not loaded yet");
            return;
        }

        const tempTable = document.createElement('table');
        tempTable.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre Del Producto</th>
          <th>Código del Producto</th>
          <th>Cantidad</th>
          <th>Categoría</th>
        </tr>
      </thead>
      <tbody>
        ${inventario.map(item => `
          <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.codigo}</td>
            <td>${item.cantidad}</td>
            <td>${item.categoria}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

        const doc = new jsPDF() as jsPDFWithAutoTable;
        doc.autoTable({ html: tempTable });
        doc.save('tabla.pdf');
    };

    return (
        <IonContent>
            <div className="container mt-4 px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex flex-row space-x-2">
                        <IonButton color="primary" onClick={() => setCerraFrom(!estadoFrom)}>
                            Agregar nuevo producto
                        </IonButton>
                        <IonButton onClick={handleExportToPDF}>
                            Exportar a PDF
                        </IonButton>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <IonList id="table-to-export" className="min-w-full divide-y divide-gray-200">
                        <IonItem className="bg-gray-100 flex flex-col md:flex-row">
                            <IonLabel className="w-full md:w-1/5 text-center font-medium p-2">Código del Producto</IonLabel>
                            <IonLabel className="w-full md:w-1/5 text-center font-medium p-2">Nombre Del Producto</IonLabel>
                            <IonLabel className="w-full md:w-1/5 text-center font-medium p-2">Cantidad</IonLabel>
                            <IonLabel className="w-full md:w-1/5 text-center font-medium p-2">Categoría</IonLabel>
                            <IonLabel className="w-full md:w-1/5 text-center font-medium p-2">Acciones</IonLabel>
                        </IonItem>
                        {inventario.map(item => (
                            <IonItem key={item.codigo} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                                <IonLabel className="w-full md:w-1/5 text-center p-2">{item.codigo}</IonLabel>
                                <IonLabel className="w-full md:w-1/5 text-center p-2">{item.nombre}</IonLabel>
                                <IonLabel className="w-full md:w-1/5 text-center p-2">{item.cantidad}</IonLabel>
                                <IonLabel className="w-full md:w-1/5 text-center p-2">{item.categoria}</IonLabel>
                                <div className="w-full md:w-1/5 flex justify-center md:justify-end items-center space-x-2 p-2">
                                    <IonButton fill="clear" className="p-0 m-0" onClick={() => { setSelectedItem(item); setOpenForm(true); }}>
                                        <IonIcon icon={pencil} className="icon-edit" />
                                    </IonButton>
                                    <DeleteButton itemId={item.id} onDeleteSuccess={fetchData} />
                                </div>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            </div>

            {estadoFrom && (
                <UserCreation
                    abrir={estadoFrom}
                    cerra={() => setCerraFrom(false)}
                />
            )}
            {openForm && selectedItem && (
                <UpdateUser
                    open={openForm}
                    close={() => setOpenForm(false)}
                    item={selectedItem}
                />
            )}
        </IonContent>
    );
};

export default App;
