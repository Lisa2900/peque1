import React from 'react';
import { IonHeader, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';

function Search() {
    const Buscar = () => {
        console.log("vuscar presionado")
    }
    return (
       
          <IonSearchbar className='rounded-b-3xl mt-2 px-4 py-4 bg-[#232323]'></IonSearchbar>
       
    )
}

export default Search