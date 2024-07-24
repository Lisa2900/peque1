import React, { useState, useEffect } from 'react';
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
import { Button } from "@nextui-org/react";
import { Card } from "@nextui-org/react";

const Scanner: React.FC = () => {
  const db = getDatabase(app);
  const firestore = getFirestore(app);
  const [scannedData, setScannedData] = useState<string>('');
  const [productDetails, setProductDetails] = useState<any>(null);
  const [manualCode, setManualCode] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [webModalOpen, setWebModalOpen] = useState<boolean>(false);
  const [shouldOpenScannerModal, setShouldOpenScannerModal] = useState<boolean>(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (isPlatform('android') || isPlatform('ios')) {
        await BarcodeScanner.requestPermissions();
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    const databaseRef = ref(db, 'codigo/value');
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      if (snapshot.exists()) {
        const scannedValue = snapshot.val();
        setScannedData(scannedValue);
        fetchProductDetails(scannedValue);
        if (shouldOpenScannerModal) {
          setIsModalOpen(true);
          setShouldOpenScannerModal(false);
        }
      } else {
        setScannedData('');
        setProductDetails(null);
        setIsModalOpen(false);
        if (!isPlatform('android') && !isPlatform('ios')) {
          setWebModalOpen(true);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [db, shouldOpenScannerModal]);

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
    setShouldOpenScannerModal(true);
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
        setIsModalOpen(false);
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
      <Button  
       className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg"
      onClick={openScannerModal}
      style={{ width: '100%', marginBottom: '10px' }}
      >Escanear</Button>
      
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal} onDidPresent={handleModalDidPresent}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Escanear</IonTitle>
            <Button onClick={closeModal} slot="end" className="bg-red-500 text-white px-2 py-4">  X</Button>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow className="flex items-center justify-center">
              <IonCol size="12" size-md="8" size-lg="6">
                <div className="flex flex-col items-center">
                  <IonInput
                    className="ion-margin-top w-full max-w-md"
                    value={manualCode}
                    placeholder="Ingresar código manual"
                    onIonChange={e => setManualCode(e.detail.value!)}
                    clearInput
                  />
                  <Button color="primary" variant="solid" className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg" onClick={handleManualCodeInput}>
                    Buscar
                  </Button>
                </div>
              </IonCol>
            </IonRow>
            {scannedData && (
              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonCol size="12" size-md="8" size-lg="6">
                  <Card className='bg-black'>
                    <IonCardHeader>
                      <IonCardTitle>Código escaneado</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText style={{color:'white'}}>
                        <p>{scannedData}</p>
                      </IonText>
                    </IonCardContent>
                  </Card>
                </IonCol>
              </IonRow>
            )}
            {productDetails ? (
              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonCol size="12" size-md="8" size-lg="6">
                  <Card className='bg-black'>
                    <IonCardHeader>
                      <IonCardTitle>Detalles del Producto</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText style={{color:'white'}}>
                        <p><strong>Nombre:</strong> {productDetails.nombre}</p>
                        <p><strong>Categoría:</strong> {productDetails.categoria}</p>
                        <p><strong>Código:</strong> {productDetails.codigo}</p>
                        <p><strong>Precio:</strong> {productDetails.precio}</p>
                        <p><strong>Cantidad:</strong> {productDetails.cantidad}</p>
                      </IonText>
                    </IonCardContent>
                  </Card>
                </IonCol>
              </IonRow>
            ) : (
              scannedData && (
                <IonRow className="ion-justify-content-center ion-margin-top">
                  <IonCol size="12" size-md="8" size-lg="6">
                    <Card className='bg-black'>
                      <IonCardHeader>
                        <IonCardTitle>No se encontraron detalles del producto</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonText style={{color:"white"}}>
                          <p>No se encontraron detalles del producto para este código.</p>
                        </IonText>
                      </IonCardContent>
                    </Card>
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
            <IonTitle>Información</IonTitle>
            <Button onClick={closeWebModal} slot="end" className="bg-red-500 text-white px-2 py-4"> X </Button>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>
            <p>No se encontró ningún valor en Firebase. Intenta con otro código o verifica tu conexión.</p>
          </IonText>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Scanner;
