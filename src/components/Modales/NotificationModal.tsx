import React from 'react';
import {
  IonModal,
  IonContent,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

interface NotificationModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  success: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ showModal, setShowModal, success }) => {
  React.useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal, setShowModal]);

  return (
    <IonModal isOpen={showModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{success ? 'Éxito' : 'Error'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <IonIcon
          icon={success ? checkmarkCircle : closeCircle}
          style={{ fontSize: '100px', color: success ? 'green' : 'red' }}
        />
      </IonContent>
    </IonModal>
  );
};

export default NotificationModal;
