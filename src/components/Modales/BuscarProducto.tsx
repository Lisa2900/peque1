import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { collection, getDocs, query, where, doc, updateDoc, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import VerDetalle from './VerDetalle';
import {Button} from "@nextui-org/react";


interface BuscarProductoProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

interface Producto {
  cantidad: number;
  categoria: string;
  codigo: string;
  nombre: string;
  precio: number; // Agrega el campo precio
}

const BuscarProducto: React.FC<BuscarProductoProps> = ({ showModal, setShowModal }) => {
  const [searchValue, setSearchValue] = useState('');
  const [scan, setScan] = useState(false);
  const [resultados, setResultados] = useState<Producto[]>([]);
  const [selectedCantidad, setSelectedCantidad] = useState<number>(1);
  const [detalleProducto, setDetalleProducto] = useState<Producto | null>(null);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);

  const handleVerDetalle = (producto: Producto) => {
    setDetalleProducto(producto);
    console.log('Detalle del producto:', producto);
    setIsDetalleModalOpen(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setScan(false);
  };

  const handleSearchInputChange = (e: CustomEvent) => {
    const inputElement = e.target as HTMLIonInputElement;
    setSearchValue(inputElement.value as string);
  };

  const handleSearch = async () => {
    try {
      const codigoQuery = queryProductos('codigo', searchValue);
      const nombreQuery = queryProductos('nombre', searchValue);
      
      const [codigoSnapshot, nombreSnapshot] = await Promise.all([getDocs(codigoQuery), getDocs(nombreQuery)]);
      
      const resultado: Producto[] = [];

      if (!codigoSnapshot.empty) {
        codigoSnapshot.forEach((doc) => {
          resultado.push(doc.data() as Producto);
        });
      }

      if (!nombreSnapshot.empty) {
        nombreSnapshot.forEach((doc) => {
          resultado.push(doc.data() as Producto);
        });
      }

      if (resultado.length > 0) {
        setResultados(resultado);
      } else {
        console.log('No se encontró ningún producto con el valor ingresado');
      }
    } catch (error) {
      console.error('Error al buscar el producto:', error);
    }
  };

  const queryProductos = (campo: string, valor: string) => {
    return query(collection(db, 'inventario'), where(campo, '==', valor));
  };

  const handleVenta = async (codigo: string, selectedCantidad: number, precio: number) => {
    try {
      // Realizar la consulta para encontrar el producto por código
      const productoQuery = queryProductos('codigo', codigo);
      const productoSnapshot = await getDocs(productoQuery);
  
      if (!productoSnapshot.empty) {
        // Si se encontró el producto, obtener su ID y actualizar la cantidad
        const productoDoc = productoSnapshot.docs[0];
        const productoRef = doc(db, 'inventario', productoDoc.id);
  
        // Calcular la nueva cantidad
        const productoData = productoDoc.data() as Producto;
        const newCantidad = productoData.cantidad - selectedCantidad;
  
        if (newCantidad >= 0) {
          // Actualizar el documento con la nueva cantidad
          await updateDoc(productoRef, { cantidad: newCantidad });
  
          // Registrar la venta con el precio
          const ventaRef = collection(db, 'ventas');
          await addDoc(ventaRef, {
            producto: productoData.nombre,
            cantidad: selectedCantidad,
            precio: precio, // Agrega el precio
            total: precio * selectedCantidad, // Calcula el total
            timestamp: Timestamp.now()
          });
  
          console.log('Venta realizada con éxito');
        } else {
          console.log('No hay suficiente cantidad en inventario');
        }
      } else {
        console.log('No se encontró ningún producto con el código especificado');
      }
    } catch (error) {
      console.error('Error al realizar la venta:', error);
    }
  };
  
  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <IonModal isOpen={showModal} onDidDismiss={closeModal}>
      <IonHeader >
        <IonToolbar >
          <IonTitle>Buscar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <IonInput
      value={searchValue}
      placeholder="Ingrese código del producto o nombre"
      onIonChange={handleSearchInputChange}
      style={{ width: '80%', marginBottom: '20px ' }}
    ></IonInput>
    <Button
      expand="full"
      className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg"
      onClick={handleSearch}
      style={{ width: '80%', marginBottom: '10px' }}
    >
      Buscar
    </Button>
    <Button
      expand="full"
      className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg"
      onClick={() => setScan(true)}
      style={{ width: '80%', marginTop: '20px' }}
    >
      Escanear
    </Button>
  </div>
  {scan && (
    // Componente de escaneo QR
    <div>Escaneo QR</div>
  )}
  <IonList className='mt-[20px]'>
    {resultados.map((producto, index) => (
      <IonItem key={index}>
        <IonLabel>{producto.nombre}</IonLabel>
        <IonLabel>{producto.codigo}</IonLabel>
        <IonLabel>{producto.cantidad} en inventario</IonLabel>
        <IonLabel>Precio: ${producto.precio}</IonLabel> {/* Muestra el precio */}
        <IonSelect
          value={selectedCantidad}
          onIonChange={(e) => setSelectedCantidad(parseInt(e.detail.value!, 10))}
        >
          {[...Array(producto.cantidad).keys()].map((cantidad) => (
            <IonSelectOption key={cantidad + 1} value={cantidad + 1}>
              {cantidad + 1}
            </IonSelectOption>
          ))}
        </IonSelect>
        <IonButton onClick={() => handleVenta(producto.codigo, selectedCantidad, producto.precio)}>Vender</IonButton>
        <IonButton onClick={() => handleVerDetalle(producto)}>Ver Detalle</IonButton> {/* Agrega botón para ver detalle */}
      </IonItem>
    ))}
  </IonList>
</IonContent>

    </IonModal>
  );
  
};

export default BuscarProducto;
