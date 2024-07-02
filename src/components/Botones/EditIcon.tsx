import React from "react";
import { Button } from "@nextui-org/react";
import { MdEdit } from "react-icons/md";
import IconButton from '@mui/material/IconButton';
import { IonButton } from '@ionic/react';
export default function App() {
  return (
    <IonButton color="tertiary">
       <MdEdit /> Editar
    </IonButton>
  )
}


