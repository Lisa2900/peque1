import React from 'react'
import Camera from '../../components/Scanner'
import Search from '../../components/Search'
import Table from '../../components/Table'
import { IonButton, IonContent, IonHeader, IonRouterLink } from '@ionic/react'

function Inventario() {
  return (
    <>
      <IonHeader>
        <Search />
      </IonHeader>
      <IonContent>
        <Camera />
        <Table />
      </IonContent>
    </>
  )
}

export default Inventario