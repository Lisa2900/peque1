import React, { useEffect, useState } from 'react';
import { IonButton } from '@ionic/react';
import { isPlatform } from '@ionic/react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase';
import { Button } from '@nextui-org/react';

interface ScannerVenderProps {
  onCodeScanned: (code: string) => void;
}

const ScannerVender: React.FC<ScannerVenderProps> = ({ onCodeScanned }) => {
  const db = getDatabase(app);

  useEffect(() => {
    const requestPermissions = async () => {
      if (isPlatform('android') || isPlatform('ios')) {
        await BarcodeScanner.requestPermissions();
      }
    };
    requestPermissions();
  }, []);

  const handleScanButtonClick = async () => {
    if (isPlatform('android') || isPlatform('ios')) {
      startNativeScan();
    } else {
      const databaseRef = ref(db, 'codigo/value');
      const snapshot = await get(databaseRef);
      if (snapshot.exists()) {
        const mockBarcode = snapshot.val();
        onCodeScanned(mockBarcode);
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
        onCodeScanned(scannedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
    className="ion-margin-top bg-blue-500 hover:bg-red-700 text-white px-8 py-4 text-lg"
    style={{ width: '80%', marginBottom: '10px' }}
    onClick={handleScanButtonClick}
  >
    Escanear
  </Button>
  );
};

export default ScannerVender;
