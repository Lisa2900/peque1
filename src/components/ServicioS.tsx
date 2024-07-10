import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import CFE from '../img/CFE.png';
import Esta from '../img/Esta.png';
import Telcel from '../img/Telcel_Logo.png';
import Att from '../img/at&t_Logo.png';
import Movista from '../img/Movista_Logo.png';

const ServicioS = () => {
  return (
    <IonContent fullscreen className="flex items-center justify-center">
      <div className="w-full p-5">
        <h1 className="text-xl font-bold mb-4 text-center">SERVICIOS</h1>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6" size-lg="4" className="mb-4">
              <IonCard className="h-80 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden">
                <a href="https://www.cfe.mx">
                  <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-600">
                    <img src={CFE} alt="CFE" className="max-w-full max-h-full object-contain" />
                  </div>
                  <IonCardHeader className="bg-transparent">
                    <IonCardTitle className="text-center">CFE</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="bg-transparent">
                    <p className="text-center">CFE</p>
                  </IonCardContent>
                </a>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="6" size-lg="4" className="mb-4">
              <IonCard className="h-80 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden">
                <a href="https://www.gob.mx/curp/">
                  <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-600">
                    <img src={Esta} alt="CURP" className="max-w-full max-h-full object-contain" />
                  </div>
                  <IonCardHeader className="bg-transparent">
                    <IonCardTitle className="text-center">CURP</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="bg-transparent">
                    <p className="text-center">CURP</p>
                  </IonCardContent>
                </a>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="6" size-lg="4" className="mb-4">
              <IonCard className="h-80 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden">
                <a href="https://www.telcel.com/personas/amigo/paquetes/paquetes-amigo-sin-limite?utm_source=google&utm_medium=sem&utm_campaign=12024_google_RECARGASAON2024_ventas_prepago_amigokitsinlimite_sem&utm_content=google_recarga500_nacional___na&utm_id=%7B%7Bcampaign.id%7D%7D&&&&&&campaignid=21354646025&network=g&device=c&gad_source=1&gclid=CjwKCAjw34qzBhBmEiwAOUQcFyl1Sb8D5hcdq46fYX41_t6xOF98WFV8FmPae7IXQrIuNeBzxHUDiRoC6IkQAvD_BwE&gclsrc=aw.ds">
                  <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-600">
                    <img src={Telcel} alt="Telcel" className="max-w-full max-h-full object-contain" />
                  </div>
                  <IonCardHeader className="bg-transparent">
                    <IonCardTitle className="text-center">Telcel</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="bg-transparent">
                    <p className="text-center">Telcel</p>
                  </IonCardContent>
                </a>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="6" size-lg="4" className="mb-4">
              <IonCard className="h-80 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden">
                <a href="https://tienda.movistar.com.mx/recarga-en-linea">
                  <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-600">
                    <img src={Movista} alt="Movistar" className="max-w-full max-h-full object-contain" />
                  </div>
                  <IonCardHeader className="bg-transparent">
                    <IonCardTitle className="text-center">Movistar</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="bg-transparent">
                    <p className="text-center">Movistar</p>
                  </IonCardContent>
                </a>
              </IonCard>
            </IonCol>
            <IonCol size="12" size-md="6" size-lg="4" className="mb-4">
              <IonCard className="h-80 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden">
                <a href="https://www.att.com.mx/att-mas.html?gad_source=1&gclid=CjwKCAjw34qzBhBmEiwAOUQcF0H_lZeEz4sKXjOB3thqJwtTZVg4w4gyrP7HvB-Rpq-RoD7X4hO06xoC8p8QAvD_BwE&gclsrc=aw.ds">
                  <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-600">
                    <img src={Att} alt="AT&T" className="max-w-full max-h-full object-contain" />
                  </div>
                  <IonCardHeader className="bg-transparent">
                    <IonCardTitle className="text-center">AT&T</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="bg-transparent">
                    <p className="text-center">AT&T</p>
                  </IonCardContent>
                </a>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </IonContent>
  );
}

export default ServicioS;
