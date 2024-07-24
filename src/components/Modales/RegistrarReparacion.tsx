import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import NotificationModal from '../Modales/NotificationModal';
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import jsPDF from 'jspdf';

interface RegistrarReparacionProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const RegistrarReparacion: React.FC<RegistrarReparacionProps> = ({
  showModal,
  setShowModal,
}) => {
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [repairType, setRepairType] = useState('');
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [technician, setTechnician] = useState('');
  const [importe, setImporte] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setDeviceType('');
    setBrand('');
    setModel('');
    setRepairType('');
    setDescription('');
    setCustomerName('');
    setContactNumber('');
    setTechnician('');
    setImporte('');
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (e: CustomEvent) => {
    const inputElement = e.target as HTMLIonInputElement;
    setter(inputElement.value as string);
  };

  const generateUniqueFolio = async () => {
    let folio;
    let folioExists = true;

    while (folioExists) {
      // Genera un folio aleatorio
      folio = `FOLIO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Verifica si el folio ya existe en la base de datos
      const q = query(collection(db, 'reparaciones'), where('folio', '==', folio));
      const querySnapshot = await getDocs(q);

      folioExists = !querySnapshot.empty;
    }

    return folio;
  };

  const handleRegisterRepair = async () => {
    try {
      const folio = await generateUniqueFolio();
      await addDoc(collection(db, 'reparaciones'), {
        deviceType,
        brand,
        model,
        repairType,
        description,
        status: 'pendiente',
        fechaRegistro: new Date(), // Añadir la fecha de registro
        folio, // Añadir el folio generado
        customerName,
        contactNumber,
        technician,
        importe, // Añadir el importe dejado por el cliente
      });

      setIsSuccess(true);
      generateReceipt(); // Generar el recibo después de registrar la reparación
    } catch (error) {
      setIsSuccess(false);
      console.error('Error al registrar la reparación:', error);
    } finally {
      setShowNotification(true);
      closeModal();
    }
  };

  const generateReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Recibo de Reparación', 20, 20);

    // Detalles de la reparación
    doc.setFontSize(12);
    doc.text(`Tipo de Dispositivo: ${deviceType}`, 20, 30);
    doc.text(`Marca: ${brand}`, 20, 40);
    doc.text(`Modelo: ${model}`, 20, 50);
    doc.text(`Tipo de Reparación: ${repairType}`, 20, 60);
    doc.text(`Descripción: ${description}`, 20, 70);
    doc.text(`Nombre del Cliente: ${customerName}`, 20, 80);
    doc.text(`Número de Contacto: ${contactNumber}`, 20, 90);
    doc.text(`Técnico Asignado: ${technician}`, 20, 100);
    doc.text(`Importe: ${importe}`, 20, 110); // Mostrar el importe en el recibo

    // Generar el PDF y abrirlo en una nueva ventana para impresión
    const pdfOutput = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfOutput);

    const printWindow = window.open(pdfURL);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };


  return (
    <>

      <IonModal  isOpen={showModal} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Registrar Reparación</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent >
          <IonSelect
            className='bg-[#282828] rounded-lg mt-1'
            value={deviceType}
            placeholder="  Selecciona tipo de dispositivo"
            onIonChange={(e) => setDeviceType(e.detail.value)}
          >
            <IonSelectOption value="telefono">Teléfono</IonSelectOption>
            <IonSelectOption value="tablet">Tablet</IonSelectOption>
            <IonSelectOption value="computadora">Computadora</IonSelectOption>
          </IonSelect>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1 "
            value={brand}
            placeholder="  Marca"
            onIonChange={handleInputChange(setBrand)}
          ></IonInput>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1"
            value={model}
            placeholder="  Modelo"
            onIonChange={handleInputChange(setModel)}
          ></IonInput>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1"
            value={repairType}
            placeholder="  Reparación a realizar"
            onIonChange={handleInputChange(setRepairType)}
          ></IonInput>
          <IonTextarea
            className="bg-[#282828] text-white rounded-lg mt-1"
            value={description}
            placeholder="  Descripción detallada de la reparación"
            onIonChange={handleInputChange(setDescription)}
          ></IonTextarea>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1"
            value={customerName}
            placeholder="  Nombre del cliente"
            onIonChange={handleInputChange(setCustomerName)}
          ></IonInput>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1"
            value={contactNumber}
            placeholder="  Número de contacto"
            onIonChange={handleInputChange(setContactNumber)}
          ></IonInput>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1"
            value={technician}
            placeholder="  Técnico asignado"
            onIonChange={handleInputChange(setTechnician)}
          ></IonInput>
          <IonInput
            className="bg-[#282828] text-white rounded-lg mt-1"
           
            value={importe}
            placeholder="Importe dejado por el cliente"
            onIonChange={handleInputChange(setImporte)}
          ></IonInput>
          <Button className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg ml-9"
            onClick={handleRegisterRepair}
            style={{ width: '85%', marginBottom: '1px' }}>
            Registrar
          </Button>
          <Button className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg ml-9"
            onClick={closeModal}
            style={{ width: '85%', marginBottom: '10px' }}
          >
            Cancelar
          </Button>
        </IonContent>
      </IonModal>
      <NotificationModal
        showModal={showNotification}
        setShowModal={setShowNotification}
        success={isSuccess}
      />

    </>
  );
};

export default RegistrarReparacion;
