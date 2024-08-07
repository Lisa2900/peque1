import React, { useState } from 'react';
import { IonButton, IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from '@ionic/react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import Recibo from '../Recibor'; // Importa el componente Recibo

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  repair: Repair | null;
}

interface Repair {
  id: string;
  title: string;
  description: string;
  date: string;
  brand: string;
  model: string;
  deviceType: string;
  repairType: string;
  status: string;
  customerName?: string;
  contactNumber?: string;
  technician?: string;
}

const RepairModal: React.FC<RepairModalProps> = ({ isOpen, onClose, repair }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleStatusChange = async () => {
    if (!repair) return;
    setIsUpdating(true);
    try {
      // Actualizar el estado de la reparación a "entregado" en la base de datos
      await updateDoc(doc(db, 'reparaciones', repair.id), { status: 'entregado' });
      console.log('Estado cambiado a entregado');
      // Actualiza el estado localmente para reflejar el cambio inmediatamente
      repair.status = 'entregado';
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrintReceipt = () => {
    // Aquí agregarías la lógica para imprimir el recibo
    console.log('Recibo impreso');
  };

  if (!repair) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles de reparación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Estado:</IonLabel>
            <IonLabel color={repair.status === 'pendiente' ? 'primary' : 'success'}>{repair.status}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Descripción:</IonLabel>
            <IonLabel>{repair.description}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Marca:</IonLabel>
            <IonLabel>{repair.brand}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Modelo:</IonLabel>
            <IonLabel>{repair.model}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Tipo de dispositivo:</IonLabel>
            <IonLabel>{repair.deviceType}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Tipo de reparación:</IonLabel>
            <IonLabel>{repair.repairType}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Nombre del cliente:</IonLabel>
            <IonLabel>{repair.customerName}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Número de contacto:</IonLabel>
            <IonLabel>{repair.contactNumber}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Técnico asignado:</IonLabel>
            <IonLabel>{repair.technician}</IonLabel>
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={handleStatusChange} disabled={isUpdating}>
          {isUpdating ? 'Actualizando...' : 'Cambiar estado a entregado'}
        </IonButton>
        <IonButton expand="full" onClick={handlePrintReceipt}>
          Imprimir Recibo
        </IonButton>
        <IonButton expand="full" onClick={onClose}>
          Cerrar
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default RepairModal;
