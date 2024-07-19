import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonText, IonSearchbar } from '@ionic/react';
import { collection, getDocs, query, where, QuerySnapshot, DocumentData, CollectionReference } from 'firebase/firestore';
import { db } from '../firebase';
import RepairModal from './Modales/RepairModal';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";

interface Repair {
  id: string;
  title: string;
  description: string;
  date: string;
  fechaRegistro: {
    seconds: number;
    nanoseconds: number;
  };
  brand: string;
  model: string;
  deviceType: string;
  repairType: string;
  status: string;
  folio: string; // Agregamos el campo folio
}

const Repairs: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentRepair, setCurrentRepair] = useState<Repair | null>(null);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const repairCollection: CollectionReference<DocumentData> = collection(db, 'reparaciones');
        let queryRef = repairCollection;

        // Aplicamos filtro si hay texto de búsqueda
        if (searchText !== '') {
          queryRef = query(repairCollection, where('folio', '==', searchText)) as CollectionReference<DocumentData>;
        }

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(queryRef);
        const fetchedRepairs: Repair[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Repair;
          const { id, ...rest } = data; // Extraer 'id' para evitar duplicación
          fetchedRepairs.push({ id: doc.id, ...rest });
        });
        setRepairs(fetchedRepairs);
        console.log('Reparaciones obtenidas:', fetchedRepairs);
      } catch (error) {
        console.error('Error al obtener las reparaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, [searchText]);

  const handleOpenModal = (repair: Repair) => {
    setCurrentRepair(repair);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentRepair(null);
    setModalOpen(false);
  };

  const handleSearch = (e: CustomEvent) => {
    const text = e.detail.value as string;
    setSearchText(text);
  };

  return (
    <>
    
      <IonHeader >
      </IonHeader>
      <div className="p-4 bg-[#232323] rounded-2xl border border-transparent shadow-md text-white mb-4 mt" style={{ overflowY: 'auto', maxHeight: '400px' }}>
  <IonTitle>Reparaciones</IonTitle>

  <IonSearchbar value={searchText} onIonInput={handleSearch} placeholder="Buscar por folio"></IonSearchbar>
    {loading ? (
      <IonText>Cargando...</IonText>
    ) : (
      <IonList>
        {repairs.map((repair) => (
          <IonItem key={repair.id} onClick={() => handleOpenModal(repair)}>
            <IonLabel>
              <h2>{repair.title}</h2>
              <p>Estado: {repair.status}</p>
              <p>Fecha: {new Date(repair.fechaRegistro.seconds * 1000).toLocaleString()}</p>
              <p>Marca: {repair.brand}</p>
              <p>Modelo: {repair.model}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    )}
</div>

      <RepairModal isOpen={modalOpen} onClose={handleCloseModal} repair={currentRepair} />
    </>
  );
};

export default Repairs;
