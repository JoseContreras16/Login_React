// src/pages/Login.tsx
import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "../theme/toast.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados para los toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<
    "success" | "danger" | "warning"
  >("success");

  const history = useHistory();

  // Función para manejar el login con el backend
  const handleLogin = async () => {
    if (!email || !password) {
      setToastMessage("Por favor complete todos los campos");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    try {
      const response = await fetch(
        "https://smartloansbackend.azurewebsites.net/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            logins: [
              {
                username: email, // <- se envía lo que ingreses en email
                password: password, // <- y lo que ingreses en password
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.result && data.result.length > 0) {
        const { value, msg, error } = data.result[0];

        if (!error && value === "1") {
          setToastMessage(msg || "¡Inicio de sesión exitoso!");
          setToastColor("success");
          setShowToast(true);

          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true');

          setTimeout(() => {
            history.push("/home"); // 👈 asegúrate que tu ruta Home esté definida
          // history.push("/dashboard");
          }, 1500);

          
        } else {
          setToastMessage(error || "Error en inicio de sesión");
          setToastColor("danger");
          setShowToast(true);
        }
      } else {
        setToastMessage("Respuesta inesperada del servidor");
        setToastColor("danger");
        setShowToast(true);
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Error de conexión con el servidor");
      setToastColor("danger");
      setShowToast(true);
    }
  };

  const goToSignUp = () => {
    history.push("/signup");
  };

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
                style={{ cursor: "pointer" }}
              />
            </div>
          </IonItem>

          {/* Checkbox recordar */}
          <div className="remember-container">
            <input type="checkbox" id="remember" className="custom-checkbox" />
            <label htmlFor="remember" className="checkbox-label">
              Recordar me
            </label>
          </div>

          {/* Botón login */}
          <IonButton
            expand="block"
            className="login-button"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </IonButton>

          {/* Enlaces */}
          <div className="login-links">
            <IonText
              color="primary"
              onClick={goToSignUp}
              className="link-text"
            >
              Registrarse
            </IonText>
            <IonText
              color="medium"
              onClick={goToForgotPassword}
              className="link-text"
            >
              ¿Olvidaste tu contraseña?
            </IonText>
          </div>
        </div>

        {/* Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="bottom"
          cssClass={`custom-toast toast-${toastColor}`}
          buttons={[
            {
              text: "Aceptar",
              role: "cancel",
              handler: () => setShowToast(false),
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
