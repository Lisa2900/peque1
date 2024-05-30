import React, { useEffect, useState, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
  IonModal,
} from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Scanner: React.FC = () => {
  const [scannedData, setScannedData] = useState<string>('');
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const webScannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      if (isPlatform('android') || isPlatform('ios')) {
        await BarcodeScanner.requestPermissions();
      }
    };
    requestPermissions();
  }, []);

  const scanBarcodeNative = async () => {
    try {
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode, BarcodeFormat.Code128, BarcodeFormat.Ean13],
      });
      if (barcodes.length > 0) {
        setScannedData(barcodes[0].rawValue || 'No data found');
        setIsModalOpen(true);
      } else {
        setScannedData('No barcodes found');
      }
      setScannerActive(false);
    } catch (error) {
      console.error(error);
      setScannedData('Error scanning barcode');
      setScannerActive(false);
    }
  };

  const scanBarcodeWeb = () => {
    webScannerRef.current = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 500 }, false);
    webScannerRef.current.render(
      (decodedText) => {
        setScannedData(decodedText);
        webScannerRef.current?.clear();
        setScannerActive(false);
        setIsModalOpen(true);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const scanBarcode = () => {
    setScannerActive(true);
    if (isPlatform('android') || isPlatform('ios')) {
      scanBarcodeNative();
    } else {
      scanBarcodeWeb();
    }
  };

  const cancelScan = () => {
    if (webScannerRef.current) {
      webScannerRef.current.clear();
    }
    setScannerActive(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setScannedData('');
  };

  return (
    <>
      <IonButton onClick={scanBarcode} disabled={scannerActive}>Scan Barcode</IonButton>
      {scannerActive && (
        <IonButton onClick={cancelScan}>Cancel</IonButton>
      )}
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Scanned Data</IonTitle>
            <IonButton onClick={closeModal}>Close</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>
            <p>{scannedData}</p>
          </IonText>
        </IonContent>
      </IonModal>
      <div id="reader" style={{ display: scannerActive ? 'block' : 'none' }}></div>
    </>
  );
};

export default Scanner;
