import React, { ReactNode, useState, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonModal } from '@ionic/react';
import swal from 'sweetalert';
import { db } from '../../firebase'; // Importa la configuración de Firebase
import { doc, updateDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firebase Firestore

interface UpdateUserProps {
  open: boolean;
  close: () => void;
  item: {
    id: string;
    nombre: string;
    codigo: string;
    cantidad: string;
    categoria: string;
    precio: string; // Agrega el campo de precio
  };
}

const UpdateUser: React.FC<UpdateUserProps> = ({ open, close, item }) => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(''); // Agrega el estado para el precio

  useEffect(() => {
    // Llena los campos del formulario con los datos del producto seleccionado
    setNombre(item.nombre);
    setCodigo(item.codigo);
    setCantidad(item.cantidad);
    setCategoria(item.categoria);
    setPrecio(item.precio); // Llena el estado del precio
  }, [item]);

  const mostrarAlerta = () => {
    swal({
      title: '¡Bien hecho!',
      text: '¡Has actualizado el producto exitosamente!',
      icon: 'success'
    });
  };

  const actualizarProducto = async () => {
    try {
      await updateDoc(doc(db, 'inventario', item.id), {
        nombre,
        codigo,
        cantidad: parseInt(cantidad),
        categoria,
        precio: parseFloat(precio) // Convierte el precio a flotante antes de actualizar
      });
      mostrarAlerta(); // Muestra la alerta de éxito
      close(); // Cierra el modal después de actualizar el producto
    } catch (error) {
      console.error('Error updating document: ', error);
      swal({
        title: 'Error!',
        text: 'Hubo un error al actualizar el producto.',
        icon: 'error'
      });
    }
  };

  return (
    <IonModal isOpen={open} onDidDismiss={close}>
      <IonContent>
        <div className="flex items-center justify-center h-full">
          <div className="bg-zinc-800 text-white p-6 max-w-sm mx-auto rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Actualizar Producto</h2>
            <form>
              <div className="mb-4">
                <IonLabel className="block text-white mb-1">Nombre del Producto *</IonLabel>
                <IonInput className="bg-zinc-900 text-white" value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} required></IonInput>
              </div>
              <div className="mb-4">
                <IonLabel className="block text-white mb-1">Código Producto *</IonLabel>
                <IonInput className="bg-zinc-900 text-white" value={codigo} onIonChange={(e) => setCodigo(e.detail.value!)} required></IonInput>
              </div>
              <div className="mb-4">
                <IonLabel className="block text-white mb-1">Cantidad *</IonLabel>
                <IonInput className="bg-zinc-900 text-white" type="number" value={cantidad} onIonChange={(e) => setCantidad(e.detail.value!)} required></IonInput>
              </div>
              <div className="mb-4">
                <IonLabel className="block text-white mb-1">Precio *</IonLabel>
                <IonInput className="bg-zinc-900 text-white" type="number" value={precio} onIonChange={(e) => setPrecio(e.detail.value!)} required></IonInput>
              </div>
              <div className="mb-4">
                <IonLabel className="block text-white mb-1">Categoría *</IonLabel>
                <IonSelect className="bg-zinc-900 text-white" value={categoria} onIonChange={(e) => setCategoria(e.detail.value)}>
                  <IonSelectOption value="">Seleccione una categoría</IonSelectOption>
                  <IonSelectOption value="celulares">Celulares</IonSelectOption>
                  <IonSelectOption value="audifonos">Audífonos</IonSelectOption>
                  <IonSelectOption value="fundas">Fundas</IonSelectOption>
                  <IonSelectOption value="cargadores">Cargadores</IonSelectOption>
                </IonSelect>
              </div>
              <div className="flex justify-end space-x-4">
                <IonButton onClick={close} className=" text-white px-4 py-2 rounded">Cancelar</IonButton>
                <IonButton onClick={actualizarProducto} className=" text-white px-4 py-2 rounded">Actualizar</IonButton>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default UpdateUser;
