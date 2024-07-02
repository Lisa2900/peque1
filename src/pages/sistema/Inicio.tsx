
import { IonCol, IonContent, IonGrid, IonHeader, IonRow } from '@ionic/react';
import VenderReparar from '../../components/Botones/VenderReparar';
import SalesSection from '../../components/SalesSection';
import ServiceAndRepairs from '../../components/ServiceAndRepairs';
import Header from '../../components/Header';
function Inicio() {
  return (


    <>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent>
        <IonGrid>
          <VenderReparar />
          <IonRow>
            <IonCol size="12" size-md="6">
              <SalesSection />
            </IonCol>
            <IonCol size="12" size-md="6">
              <ServiceAndRepairs />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  )
}

export default Inicio