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

interface RegistrarReparacionProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const RegistrarReparacion: React.FC<RegistrarReparacionProps> = ({ showModal, setShowModal }) => {
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [repairType, setRepairType] = useState('');
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [technician, setTechnician] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setDeviceType('');
    setBrand('');
    setModel('');
    setRepairType('');
    setDescription('');
    setCustomerName('');
    setContactNumber('');
    setTechnician('');
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: CustomEvent
  ) => {
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
      });
      setIsSuccess(true);
      console.log('Reparación registrada con éxito');
    } catch (error) {
      setIsSuccess(false);
      console.error('Error al registrar la reparación:', error);
    } finally {
      setShowNotification(true);
      closeModal();
    }
  };

  return (
    <>
      <IonModal isOpen={showModal} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Registrar Reparación</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSelect
            value={deviceType}
            placeholder="Selecciona tipo de dispositivo"
            onIonChange={(e) => setDeviceType(e.detail.value)}
          >
            <IonSelectOption value="telefono">Teléfono</IonSelectOption>
            <IonSelectOption value="tablet">Tablet</IonSelectOption>
            <IonSelectOption value="computadora">Computadora</IonSelectOption>
          </IonSelect>
          <IonInput
            value={brand}
            placeholder="Marca"
            onIonChange={handleInputChange(setBrand)}
          ></IonInput>
          <IonInput
            value={model}
            placeholder="Modelo"
            onIonChange={handleInputChange(setModel)}
          ></IonInput>
          <IonInput
            value={repairType}
            placeholder="Reparación a realizar"
            onIonChange={handleInputChange(setRepairType)}
          ></IonInput>
          <IonTextarea
            value={description}
            placeholder="Descripción detallada de la reparación"
            onIonChange={handleInputChange(setDescription)}
          ></IonTextarea>
          <IonInput
            value={customerName}
            placeholder="Nombre del cliente"
            onIonChange={handleInputChange(setCustomerName)}
          ></IonInput>
          <IonInput
            value={contactNumber}
            placeholder="Número de contacto"
            onIonChange={handleInputChange(setContactNumber)}
          ></IonInput>
          <IonInput
            value={technician}
            placeholder="Técnico asignado"
            onIonChange={handleInputChange(setTechnician)}
          ></IonInput>
          <IonButton expand="full" onClick={handleRegisterRepair}>
            Registrar
          </IonButton>
          <IonButton expand="full" onClick={closeModal}>
            Cancelar
          </IonButton>
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
