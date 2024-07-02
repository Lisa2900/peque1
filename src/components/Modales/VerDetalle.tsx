import React from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';

interface VerDetalleProps {
  producto: Producto;
  isOpen: boolean;
  onClose: () => void;
}

interface Producto {
  cantidad: number;
  categoria: string;
  codigo: string;
  nombre: string;
  precio: number; // Agrega el campo precio a la interfaz Producto
}

const VerDetalle: React.FC<VerDetalleProps> = ({ producto, isOpen, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Nombre: {producto.nombre}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Código: {producto.codigo}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Cantidad en Inventario: {producto.cantidad}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Categoría: {producto.categoria}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Precio: ${producto.precio}</IonLabel>
          </IonItem>
        </IonList>
        <IonButton onClick={onClose}>Cerrar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default VerDetalle;
