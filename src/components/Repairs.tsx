import React, { useState, useEffect } from 'react';
import { IonButton, IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from '@ionic/react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

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
}

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  repair: Repair;
}

const RepairModal: React.FC<RepairModalProps> = ({ isOpen, onClose, repair }) => {
  const handleStatusChange = async () => {
    try {
      // Actualizar el estado de la reparación a "entregado" en la base de datos
      await updateDoc(doc(db, 'reparaciones', repair.id), { status: 'entregado' });
      console.log('Estado cambiado a entregado');
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
    }
  };

  const handlePrintReceipt = () => {
    // Aquí agregarías la lógica para imprimir el recibo
    console.log('Recibo impreso');
  };

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
          {/* Agrega más detalles de la reparación aquí */}
        </IonList>
        <IonButton expand="full" onClick={handleStatusChange}>Cambiar estado a entregado</IonButton>
        <IonButton expand="full" onClick={handlePrintReceipt}>Imprimir recibo</IonButton>
        <IonButton expand="full" onClick={onClose}>Cerrar</IonButton>
      </IonContent>
    </IonModal>
  );
};

const Repairs: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reparaciones'));
        const fetchedRepairs: Repair[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedRepairs.push({ id: doc.id, ...data });
        });
        setRepairs(fetchedRepairs);
      } catch (error) {
        console.error('Error al obtener las reparaciones:', error);
      }
    };

    fetchRepairs();
  }, []);

  const handleOpenModal = (repair: Repair) => {
    setCurrentRepair(repair);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentRepair(null);
    setModalOpen(false);
  };

  return (
    <>
    <IonHeader>
        <IonToolbar>
          <IonTitle>Reparaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
        {repairs.map((repair) => (
          <IonItem key={repair.id} onClick={() => handleOpenModal(repair)}>
            <IonLabel>
              <h2>{repair.title}</h2>
              <p>{repair.date}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      <RepairModal isOpen={modalOpen} onClose={handleCloseModal} repair={currentRepair || { id: '', title: '', description: '', date: '', brand: '', model: '', deviceType: '', repairType: '', status: '' }} />
    </>
  );
};

export default Repairs;
