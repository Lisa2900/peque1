import React, { useState, FormEvent } from 'react';
import Register1Img from '../img/nuevo.png';
import { NavLink, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from "@nextui-org/react";

import {
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonSpinner,
    IonAlert
} from '@ionic/react';

const Registro: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [contraseña, setContraseña] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const credencialUsuario = await createUserWithEmailAndPassword(auth, email, contraseña);
            const usuario = credencialUsuario.user;
            console.log(usuario);
            setShowAlert(true);
        } catch (error: any) {
            const codigoError = error.code;
            const mensajeError = error.message;
            console.log(codigoError, mensajeError);
            setErrorMessage(mensajeError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonContent>
            <IonCard style={{ maxWidth: '400px', margin: '0 auto', marginTop: '10px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <img alt="Silueta de montañas" src={Register1Img} style={{ width: '40%', borderRadius: '10px', marginRight: '105px', marginLeft: 'auto', display: 'block' }} />
                <IonCardHeader style={{ textAlign: 'center' }}>
                    <IonCardTitle style={{ fontSize: '24px', fontWeight: 'bold' }}>Registrarse</IonCardTitle>
                    <IonCardSubtitle style={{ color: '#666' }}>Registrarse para entrar al sistema</IonCardSubtitle>
                </IonCardHeader>
                <IonList>
                    <form onSubmit={onSubmit} style={{ marginTop: '5px' }}>
                        <IonList>
                            <IonItem lines="none" style={{ padding: '10px 0' }}>
                                <IonInput
                                    type="email"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value!)}
                                    required
                                    placeholder="  Email"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: 'none', // Añade un borde sólido para mayor visibilidad
                                        boxSizing: 'border-box', // Asegura que el padding no incremente el ancho total
                                        background: '#eaeaea',
                                        color: ' #212121 ' // Asegura que el padding no incremente el ancho total
                                      }}/>
                            </IonItem>
                            <IonItem lines="none" style={{ padding: '10px 0' }}>
                                <IonInput
                                    type="password"
                                    value={contraseña}
                                    onIonChange={(e) => setContraseña(e.detail.value!)}
                                    required
                                    placeholder="  Contraseña"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: 'none', // Añade un borde sólido para mayor visibilidad
                                        boxSizing: 'border-box', // Asegura que el padding no incremente el ancho total
                                        background: '#eaeaea',
                                        color: 'black' // Asegura que el padding no incremente el ancho total
                                      }} />
                            </IonItem>
                        </IonList>
                        <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px', backgroundColor: '#007bff', color: '#fff' }}>
                            {loading ? <IonSpinner /> : 'Registrarse'}
                        </Button>
                    </form>
                    {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{errorMessage}</p>}
                </IonList>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    ¿Ya tienes una cuenta?{' '}
                    <NavLink to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Iniciar sesión</NavLink>
                </p>
            </IonCard>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => {
                    setShowAlert(false);
                    history.push("/login");
                }}
                header={'Registro Exitoso'}
                message={'¡Te has registrado correctamente!'}
                buttons={['OK']}
            />
        </IonContent>
    );
};

export default Registro;
