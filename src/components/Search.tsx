import React, { useState } from 'react';
import { IonSearchbar } from '@ionic/react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de importar correctamente tu instancia de Firebase

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (event: CustomEvent) => {
    const value = event.detail.value as string;
    setSearchText(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const firestore = getFirestore();
      const inventoryRef = collection(firestore, 'inventario');
      // Consulta que busca por código o nombre
      const q = query(
        inventoryRef,
        where('codigo', '==', value),
        where('nombre', '==', value)
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data());
      setSearchResults(results);

      console.log("Resultados de búsqueda:", results);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  return (
    <div>
      <IonSearchbar
        value={searchText}
        onIonInput={handleSearch}
        className='rounded-b-3xl mt-2 px-4 py-4 bg-[#232323]'
        placeholder='Buscar por código o nombre...'
      />
      <div className="results">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index} className="result-item">
              <h3>{result.nombre}</h3>
              <p>Código: {result.codigo}</p>
              <p>Cantidad: {result.cantidad}</p>
              <p>Precio: {result.precio}</p>
              <p>Categoría: {result.categoria}</p>
            </div>
          ))
        ) : (
          searchText && <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
