import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonIcon,
} from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { ref, get, getDatabase, onValue } from 'firebase/database';
import { app } from '../firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { phonePortraitOutline } from 'ionicons/icons';

const Scanner: React.FC = () => {
  const db = getDatabase(app);
  const firestore = getFirestore(app);
  const [scannedData, setScannedData] = useState<string>('');
  const [productDetails, setProductDetails] = useState<any>(null);
  const [manualCode, setManualCode] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [webModalOpen, setWebModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (isPlatform('android') || isPlatform('ios')) {
        await BarcodeScanner.requestPermissions();
      }
    };
    requestPermissions();
  }, []);

  const fetchProductDetails = async (codigo: string) => {
    const q = query(collection(firestore, 'inventario'), where('codigo', '==', codigo));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const productData = querySnapshot.docs[0].data();
      setProductDetails(productData);
    } else {
      setProductDetails(null);
    }
  };

  const openScannerModal = () => {
    setIsModalOpen(true);
  };

  const handleManualCodeInput = () => {
    if (manualCode) {
      setScannedData(manualCode);
      fetchProductDetails(manualCode);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScannedData('');
    setProductDetails(null);
  };

  const closeWebModal = () => {
    setWebModalOpen(false);
  };

  const handleModalDidPresent = async () => {
    if (isPlatform('android') || isPlatform('ios')) {
      startNativeScan();
    } else {
      const databaseRef = ref(db, 'codigo/value');
      const snapshot = await get(databaseRef);
      if (snapshot.exists()) {
        const mockBarcode = snapshot.val();
        setScannedData(mockBarcode);
        fetchProductDetails(mockBarcode);
        setIsModalOpen(true);
      } else {
        setScannedData('');
        setProductDetails(null);
        setWebModalOpen(true);
      }
    }
  };

  const startNativeScan = async () => {
    try {
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode, BarcodeFormat.Code128, BarcodeFormat.Ean13],
      });
      if (barcodes.length > 0) {
        const scannedValue = barcodes[0].rawValue || 'No data found';
        setScannedData(scannedValue);
        fetchProductDetails(scannedValue);
        setIsModalOpen(true);
      } else {
        setScannedData('No barcodes found');
      }
    } catch (error) {
      console.error(error);
      setScannedData('Error scanning barcode');
    }
  };

  return (
    <>
      <IonButton expand="full" onClick={openScannerModal}>Escanear</IonButton>
      
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal} onDidPresent={handleModalDidPresent}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Escanear</IonTitle>
            <IonButton onClick={closeModal} slot="end">Cerrar</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" size-md="8" size-lg="6">
                <IonInput
                  className="ion-margin-top"
                  value={manualCode}
                  placeholder="Ingresar código manual"
                  onIonChange={e => setManualCode(e.detail.value!)}
                  clearInput
                />
                <IonButton expand="full" className="ion-margin-top" onClick={handleManualCodeInput}>
                  Buscar
                </IonButton>
              </IonCol>
            </IonRow>
            {scannedData && (
              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonCol size="12" size-md="8" size-lg="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Código escaneado</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>
                        <p>{scannedData}</p>
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            )}
            {productDetails ? (
              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonCol size="12" size-md="8" size-lg="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Detalles del Producto</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>
                        <p><strong>Nombre:</strong> {productDetails.nombre}</p>
                        <p><strong>Categoría:</strong> {productDetails.categoria}</p>
                        <p><strong>Código:</strong> {productDetails.codigo}</p>
                        <p><strong>Precio:</strong> {productDetails.precio}</p>
                        <p><strong>Cantidad:</strong> {productDetails.cantidad}</p>
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ) : (
              scannedData && (
                <IonRow className="ion-justify-content-center ion-margin-top">
                  <IonCol size="12" size-md="8" size-lg="6">
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>No se encontraron detalles del producto</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonText>
                          <p>No se encontraron detalles del producto para este código.</p>
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              )
            )}
          </IonGrid>
        </IonContent>
      </IonModal>

      <IonModal isOpen={webModalOpen} onDidDismiss={closeWebModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>No se encontró valor en Firebase</IonTitle>
            <IonButton onClick={closeWebModal} slot="end">
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonIcon icon={phonePortraitOutline} style={{ fontSize: '100px', color: 'black' }} />
          <IonText>
            <p>Por favor, escanea el código desde la aplicación móvil.</p>
          </IonText>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Scanner;
