import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import { collection, getDocs, query, where, doc, updateDoc, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import jsPDF from 'jspdf';
import './BuscarProducto.css';
import ScannerVender from '../ScannerVender';
import VerDetalle from './VerDetalle';
import { Button } from '@nextui-org/react';

interface BuscarProductoProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

interface Producto {
  id: string;
  cantidad: number;
  categoria: string;
  codigo: string;
  nombre: string;
  precio: number;
}

const BuscarProducto: React.FC<BuscarProductoProps> = ({ showModal, setShowModal }) => {
  const [searchValue, setSearchValue] = useState('');
  const [scan, setScan] = useState(false);
  const [resultados, setResultados] = useState<Producto[]>([]);
  const [selectedCantidad, setSelectedCantidad] = useState<number>(1);
  const [detalleProducto, setDetalleProducto] = useState<Producto | null>(null);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string>('');
  const [successAlert, setSuccessAlert] = useState<string>('');
  const [productosSeleccionados, setProductosSeleccionados] = useState<{ producto: Producto; cantidad: number }[]>([]);

  useEffect(() => {
    if (scan) {
      console.log('Escaneo activado, buscando productos con:', searchValue);
      handleSearch();
      setScan(false);
    }
  }, [scan]);

  const handleVerDetalle = (producto: Producto) => {
    setDetalleProducto(producto);
    setIsDetalleModalOpen(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setScan(false);
    setIsDetalleModalOpen(false);
  };

  const handleSearchInputChange = (e: CustomEvent) => {
    setSearchValue((e.target as HTMLIonInputElement).value as string);
  };

  const handleSearch = async () => {
    try {
      console.log('Buscando productos con:', searchValue);
      const campos = ['codigo', 'nombre'];
      const queries = campos.map(campo => queryProductos(campo, searchValue));
      const snapshots = await Promise.all(queries.map(getDocs));

      const resultado: Producto[] = [];
      snapshots.forEach(snapshot => {
        snapshot.forEach(doc => {
          resultado.push({ id: doc.id, ...doc.data() } as Producto);
        });
      });

      console.log('Resultados de la búsqueda:', resultado);
      setResultados(resultado);
      setErrorAlert(resultado.length === 0 ? 'No se encontró ningún producto con el valor ingresado' : '');
    } catch (error) {
      console.error('Error al buscar el producto:', error);
      setErrorAlert('Error al buscar el producto. Por favor, inténtelo de nuevo.');
    }
  };

  const queryProductos = (campo: string, valor: string) => {
    return query(collection(db, 'inventario'), where(campo, '==', valor));
  };

  const handleVenta = async () => {
    try {
      const ventasPromises = productosSeleccionados.map(async ({ producto, cantidad }) => {
        const productoQuery = queryProductos('codigo', producto.codigo);
        const productoSnapshot = await getDocs(productoQuery);

        if (!productoSnapshot.empty) {
          const productoDoc = productoSnapshot.docs[0];
          const productoRef = doc(db, 'inventario', productoDoc.id);

          const productoData = productoDoc.data() as Producto;
          const newCantidad = productoData.cantidad - cantidad;

          if (newCantidad >= 0) {
            await updateDoc(productoRef, { cantidad: newCantidad });

            const ventaRef = collection(db, 'ventas');
            await addDoc(ventaRef, {
              codigo: producto.codigo,
              producto: productoData.nombre,
              cantidad,
              precio: producto.precio,
              total: producto.precio * cantidad,
              timestamp: Timestamp.now()
            });

            return { success: true, message: `Venta de ${producto.nombre} realizada con éxito` };
          } else {
            return { success: false, message: `No hay suficiente cantidad en inventario para ${producto.nombre}` };
          }
        } else {
          return { success: false, message: `No se encontró ningún producto con el código ${producto.codigo}` };
        }
      });

      const results = await Promise.all(ventasPromises);

      const failedResults = results.filter(result => !result.success);
      const successfulResults = results.filter(result => result.success);

      if (failedResults.length > 0) {
        setErrorAlert(failedResults.map(result => result.message).join('\n'));
      }

      if (successfulResults.length > 0) {
        const successMessage = successfulResults.map(result => result.message).join('\n');
        setSuccessAlert(successMessage);

        generarReciboPDF();
      }

      setProductosSeleccionados([]);
    } catch (error) {
      console.error('Error al realizar la venta:', error);
      setErrorAlert('Error al realizar la venta. Por favor, inténtelo de nuevo.');
    }
  };

  const generarReciboPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Recibo de Venta', 20, 20);

    doc.setFontSize(12);
    productosSeleccionados.forEach(({ producto, cantidad }, index) => {
      const y = 40 + (index * 10);
      doc.text(`Producto: ${producto.nombre}`, 20, y);
      doc.text(`Cantidad: ${cantidad}`, 100, y);
      doc.text(`Precio: $${producto.precio}`, 150, y);
      doc.text(`Total: $${producto.precio * cantidad}`, 180, y);
    });

    const totalAmount = productosSeleccionados.reduce((acc, { producto, cantidad }) => acc + (producto.precio * cantidad), 0);
    doc.text(`Monto Total: $${totalAmount}`, 20, 80 + (productosSeleccionados.length * 10));

    const pdfOutput = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfOutput);
    const printWindow = window.open(pdfURL);

    if (printWindow) {
      printWindow.onload = () => printWindow.print();
    }
  };

  const handleCodeScanned = (code: string) => {
    console.log('Código escaneado:', code);
    setSearchValue(code);
    setScan(true);
  };

  const handleAgregarProducto = async (producto: Producto) => {
    const productoQuery = queryProductos('codigo', producto.codigo);
    const productoSnapshot = await getDocs(productoQuery);

    if (!productoSnapshot.empty) {
      const productoDoc = productoSnapshot.docs[0];
      const productoData = productoDoc.data() as Producto;

      if (productoData.cantidad >= selectedCantidad) {
        const productoExistente = productosSeleccionados.find(item => item.producto.id === producto.id);

        if (productoExistente) {
          setProductosSeleccionados(prev => prev.map(item =>
            item.producto.id === producto.id
              ? { ...item, cantidad: item.cantidad + selectedCantidad }
              : item
          ));
        } else {
          setProductosSeleccionados(prev => [...prev, { producto, cantidad: selectedCantidad }]);
        }
        setSelectedCantidad(1);
      } else {
        setErrorAlert(`No hay suficiente cantidad en inventario para agregar ${producto.nombre}`);
      }
    } else {
      setErrorAlert(`No se encontró ningún producto con el código ${producto.codigo}`);
    }
  };

  const handleEliminarProducto = (productoId: string) => {
    setProductosSeleccionados(prev => prev.filter(item => item.producto.id !== productoId));
  };

  return (
    <>
      <IonModal isOpen={showModal} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Buscar Producto</IonTitle>
            <IonButton onClick={closeModal} slot="end">Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IonInput
              value={searchValue}
              placeholder="Ingrese código del producto o nombre"
              onIonChange={handleSearchInputChange}
              style={{ width: '80%', marginBottom: '20px' }}
            ></IonInput>
            <Button
              className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg"
              onClick={handleSearch}
              style={{ width: '80%', marginBottom: '10px' }}
            >
              Buscar
            </Button>
            <ScannerVender onCodeScanned={handleCodeScanned} />
            </div>
            <IonList className='mt-[20px]'>
              {resultados.map((producto, index) => (
                <IonItem key={index} className={`producto-item ${producto.cantidad === 0 ? 'sin-inventario' : ''}`}>
                  <IonLabel>{producto.nombre}</IonLabel>
                  <IonLabel>{producto.codigo}</IonLabel>
                  <IonLabel>inventario: {producto.cantidad}</IonLabel>
                  <IonLabel>${producto.precio}</IonLabel>
                  <IonSelect value={selectedCantidad} onIonChange={(e) => setSelectedCantidad(parseInt(e.detail.value!, 10))}>
                    {[...Array(producto.cantidad).keys()].map((cantidad) => (
                      <IonSelectOption key={cantidad + 1} value={cantidad + 1}>{cantidad + 1}</IonSelectOption>
                    ))}
                  </IonSelect>
                  <IonButton onClick={() => handleAgregarProducto(producto)} disabled={producto.cantidad === 0}>
                    Agregar
                  </IonButton>
                  <IonButton onClick={() => handleVerDetalle(producto)}>Detalle</IonButton>
                </IonItem>
              ))}
            </IonList>
            {productosSeleccionados.length > 0 && (
              <IonList>
                <IonTitle>Productos Seleccionados</IonTitle>
                {productosSeleccionados.map(({ producto, cantidad }) => (
                  <IonItem key={producto.id}>
                    <IonLabel>{producto.nombre}</IonLabel>
                    <IonLabel>Cantidad: {cantidad}</IonLabel>
                    <IonButton onClick={() => handleEliminarProducto(producto.id)}>Eliminar</IonButton>
                  </IonItem>
                ))}
                <IonButton expand="full" onClick={handleVenta}>Realizar Venta</IonButton>
              </IonList>
            )}
          
        </IonContent>
      </IonModal>
      <VerDetalle producto={detalleProducto} isOpen={isDetalleModalOpen} onClose={() => setIsDetalleModalOpen(false)} />
      <IonAlert
        isOpen={!!errorAlert}
        onDidDismiss={() => setErrorAlert('')}
        header={'Error'}
        message={errorAlert}
        buttons={['OK']}
      />
      <IonAlert
        isOpen={!!successAlert}
        onDidDismiss={() => setSuccessAlert('')}
        header={'Éxito'}
        message={successAlert}
        buttons={['OK']}
      />
    </>
  );
}

export default BuscarProducto;
