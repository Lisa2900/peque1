import React, { useState } from 'react';
import usuarioImg from '../img/usuario.png';
import { NavLink, useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../Styles/Login.css'
import { Button } from "@nextui-org/react";

import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonInput,
  IonItem,
  IonContent,
  IonSpinner
} from '@ionic/react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('loggedIn', 'true');
      onLogin(); // Llamamos a la función onLogin
      history.push("/inicio");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setErrorMessage('Error en las credenciales'); // Mostrar mensaje de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonContent>
      <IonCard style={{ maxWidth: '400px', margin: '0 auto', marginTop: '10px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <img alt="Silueta de montañas" src={usuarioImg} style={{ width: '40%', borderRadius: '10px', marginRight: '105px', marginLeft: 'auto', display: 'block' }} />
        <IonCardHeader style={{ textAlign: 'center' }}>
          <IonCardTitle style={{ fontSize: '24px', fontWeight: 'bold' }}>Iniciar Sesión</IonCardTitle>
          <IonCardSubtitle style={{ color: '#666' }}>Inicia sesión para entrar al sistema</IonCardSubtitle>
        </IonCardHeader>

        <form onSubmit={handleLogin} style={{ marginTop: '50px' }}>
          <IonList>
            <IonItem lines="none" style={{ padding: '10px 0'}}>
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
                  color: ' #212121 '
                }}
              />
            </IonItem>

            <IonItem lines="none" style={{ padding: '10px 0' }}>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
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
                }}
              />
            </IonItem>

          </IonList>
          <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px', backgroundColor: '#007bff', color: '#fff' }}>
            {loading ? <IonSpinner name="crescent" /> : 'Iniciar sesión'}
          </Button>
        </form>
        {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{errorMessage}</p>}
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          ¿No tienes una cuenta?{' '}
          <NavLink to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Regístrate</NavLink>
        </p>
      </IonCard>
    </IonContent>
  );
};

export default Login;
