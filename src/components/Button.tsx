import { IonButton } from '@ionic/react';
import React from 'react';

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <IonButton>{title}</IonButton>
  );
}

export default Button;
