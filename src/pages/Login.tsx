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
  IonToast,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para los toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger" | "warning">("success");

  const history = useHistory();

  // Función para manejar el login
  const handleLogin = () => {
    if (!email || !password) {
      setToastMessage("Por favor complete todos los campos");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    if (email === "admin" && password === "123") {
      setToastMessage("¡Inicio de sesión exitoso! Bienvenido");
      setToastColor("success");
      setShowToast(true);
    } else {
      setToastMessage("Error: Credenciales incorrectas");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  // Función para navegar al Sign Up
  const goToSignUp = () => {
    history.push("/signup");
  };

  // Función para navegar a Forgot Password
  const goToForgotPassword = () => {
    history.push("/forgot-password");
  };

  return (
    <IonPage>
      <IonContent className="login-bg" fullscreen>
        <div className="login-container">
          <h2 className="login-title">Iniciar Sesión</h2>

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
            <input
              type="checkbox"
              id="remember"
              className="custom-checkbox"
            />
            <label htmlFor="remember" className="checkbox-label">
              Recordar contraseña
            </label>
          </div>

          {/* Botón login */}
          <IonButton expand="block" className="login-button" onClick={handleLogin}>
            Iniciar Sesión
          </IonButton>

          {/* Enlaces */}
          <div className="login-links">
            <IonText color="primary" onClick={goToSignUp} className="link-text">Registrarse</IonText>
            <IonText color="medium" onClick={goToForgotPassword} className="link-text">¿Olvidaste tu contraseña?</IonText>
          </div>
        </div>

        {/* Toast para notificaciones */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="top"
          buttons={[
            {
              text: 'Aceptar',
              role: 'cancel',
              handler: () => setShowToast(false)
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
