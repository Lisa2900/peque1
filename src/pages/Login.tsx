import React, { useState } from 'react';
import usuarioImg from '../img/usuario.png';
import { NavLink, useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
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
      <IonCard style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <img alt="Silueta de montañas" src={usuarioImg}  style={{ width: '40%', borderRadius: '10px', marginRight: '105px', marginLeft: 'auto', display:'block' }} />
        <IonCardHeader style={{ textAlign: 'center' }}>
          <IonCardTitle style={{ fontSize: '24px', fontWeight: 'bold' }}>Iniciar Sesión</IonCardTitle>
          <IonCardSubtitle style={{ color: '#666' }}>Inicia sesión para entrar al sistema</IonCardSubtitle>
        </IonCardHeader>

        <form onSubmit={handleLogin} style={{ marginTop: '5px' }}>
          <IonList>
            <IonItem>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
                placeholder="Dirección de correo electrónico"
                style={{ width: '100%', padding: '10px , 10em', borderRadius: '6px', border: '1px solid ',boxSizing: 'border-box' }}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
                placeholder="Contraseña"
                style={{ width: '100%', padding: '10px, 10em', borderRadius: '6px', border: '1px solid ',boxSizing: 'border-box' }}
              />
            </IonItem>
          </IonList>
          <IonButton expand="full" type="submit" disabled={loading} style={{ width: '100%', marginTop: '20px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
            {loading ? <IonSpinner name="crescent" /> : 'Iniciar sesión'}
          </IonButton>
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
