import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonHeader,
  IonMenu,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonMenuButton,
  IonButtons,
  IonList,
  IonItem,
  isPlatform
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { home, list, construct, addCircle } from 'ionicons/icons';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import Inicio from './pages/sistema/Inicio';
import Inventario from './pages/sistema/Inventario';
import Servicios from './pages/sistema/Servicios';
import Mas from './pages/sistema/Mas';

setupIonicReact();

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 768);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setLoggedIn(isLoggedIn);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return <IonApp>Loading...</IonApp>;
  }

  return (
    <IonApp>
      <IonReactRouter>
        {loggedIn && isLargeScreen && (
          <IonMenu contentId="main-content">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Menu Content</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                <IonItem routerLink="/inicio">
                  <IonIcon slot="start" icon={home} />
                  <IonLabel>Inicio</IonLabel>
                </IonItem>
                <IonItem routerLink="/inventario">
                  <IonIcon slot="start" icon={list} />
                  <IonLabel>Inventario</IonLabel>
                </IonItem>
                <IonItem routerLink="/servicios">
                  <IonIcon slot="start" icon={construct} />
                  <IonLabel>Servicios</IonLabel>
                </IonItem>
                <IonItem routerLink="/mas">
                  <IonIcon slot="start" icon={addCircle} />
                  <IonLabel>Mas</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </IonMenu>
        )}
        <IonPage id="main-content">
        <IonHeader className={isPlatform('desktop') ? 'print:hidden' : ''}>
        <IonToolbar>
              {loggedIn && isLargeScreen && (
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
              )}
              <IonTitle>My App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonRouterOutlet>
              <Switch>
                <Route exact path="/login">
                  {loggedIn ? <Redirect to="/" /> : <Login onLogin={() => setLoggedIn(true)} />}
                </Route>
                <Route exact path="/register" component={Register} />
                {loggedIn ? (
                  <>
                    <Route exact path="/inicio" component={Inicio} />
                    <Route exact path="/inventario" component={Inventario} />
                    <Route exact path="/servicios" component={Servicios} />
                    <Route exact path="/mas" component={Mas} />
                    <Route exact path="/">
                      <Redirect to="/inicio" />
                    </Route>
                    <IonTabs className={`block md:hidden ${isPlatform('desktop') ? 'print:hidden' : ''}`}>
                      <IonRouterOutlet>
                        <Route exact path="/inicio" component={Inicio} />
                        <Route exact path="/inventario" component={Inventario} />
                        <Route exact path="/servicios" component={Servicios} />
                        <Route exact path="/mas" component={Mas} />
                      </IonRouterOutlet>
                      <IonTabBar slot="bottom">
                        <IonTabButton tab="inicio" href="/inicio">
                          <IonIcon icon={home} />
                          <IonLabel>Inicio</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="inventario" href="/inventario">
                          <IonIcon icon={list} />
                          <IonLabel>Inventario</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="servicios" href="/servicios">
                          <IonIcon icon={construct} />
                          <IonLabel>Servicios</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="mas" href="/mas">
                          <IonIcon icon={addCircle} />
                          <IonLabel>Mas</IonLabel>
                        </IonTabButton>
                      </IonTabBar>
                    </IonTabs>
                  </>
                ) : (
                  <Redirect to="/login" />
                )}
                <Route component={NotFound} />
              </Switch>
            </IonRouterOutlet>
          </IonContent>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
