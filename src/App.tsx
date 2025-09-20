import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";

/* Ionic CSS básico */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Variables globales */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
