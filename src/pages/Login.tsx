import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonText,
  IonIcon,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <IonPage>
      <IonContent className="login-bg" fullscreen>
        <div className="login-container">
          <h2 className="login-title">Sign In</h2>

          {/* Campo correo */}
          <IonItem className="login-item">
            <IonLabel position="stacked">Correo</IonLabel>
            <IonInput
              type="email"
              placeholder="Ingrese correo"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              className={email ? "has-value" : ""}
            />
          </IonItem>

          {/* Campo contraseña */}
          <IonItem className="login-item">
            <IonLabel position="stacked">Contraseña</IonLabel>
            <div className="password-wrapper">
              <IonInput
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese contraseña"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                className={password ? "has-value" : ""}
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              />
            </div>
          </IonItem>

          {/* Checkbox recordar */}
          <div className="remember-container">
            <IonCheckbox />
            <IonLabel>Recordar contraseña</IonLabel>
          </div>

          {/* Botón login */}
          <IonButton expand="block" className="login-button">
            Login
          </IonButton>

          {/* Enlaces */}
          <div className="login-links">
            <IonText color="primary">Sign Up</IonText>
            <IonText color="medium">Forgot your password?</IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
