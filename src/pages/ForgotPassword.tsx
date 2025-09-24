import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonIcon,
  IonToast,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { mail, checkmarkCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.css";
import "../theme/toast.css"; // <<< estilos del toast

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Estados para los toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger" | "warning">("success");

  const history = useHistory();

  // Función para validar el email
  const validateEmail = () => {
    if (!email.trim()) {
      setToastMessage("Por favor ingrese su correo electrónico");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage("Por favor ingrese un correo electrónico válido");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    return true;
  };

  // Función para enviar email de recuperación
  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // Simular envío de email
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular envío exitoso
      setIsEmailSent(true);
      setToastMessage("¡Email de recuperación enviado! Revisa tu bandeja de entrada");
      setToastColor("success");
      setShowToast(true);

    } catch (error) {
      setToastMessage("Error al enviar el email. Intente nuevamente");
      setToastColor("danger");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para navegar al login
  const goToLogin = () => {
    history.push("/login");
  };

  // Función para enviar otro email
  const sendAnotherEmail = () => {
    setIsEmailSent(false);
    setEmail("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="forgot-bg" fullscreen>
        <div className="forgot-container">
          <h2 className="forgot-title">Recuperar Contraseña</h2>

          {!isEmailSent ? (
            <>
              <div className="forgot-description">
                <IonText color="medium">
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </IonText>
              </div>

              {/* Campo correo */}
              <IonItem className="forgot-item">
                <IonLabel position="stacked">Correo electrónico</IonLabel>
                <IonIcon icon={mail} slot="start" className="input-icon" />
                <IonInput
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  className={email ? "has-value" : ""}
                />
              </IonItem>

              {/* Botón enviar */}
              <IonButton
                expand="block"
                className="forgot-button"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar Email de Recuperación"}
              </IonButton>
            </>
          ) : (
            <>
              <div className="success-container">
                <IonIcon icon={checkmarkCircle} className="success-icon" />
                <h3 className="success-title">¡Email Enviado!</h3>
                <div className="success-description">
                  <IonText color="medium">
                    Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                    Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                  </IonText>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="success-actions">
                <IonButton
                  expand="block"
                  className="primary-button"
                  onClick={goToLogin}
                >
                  Ir al Login
                </IonButton>

                <IonButton
                  expand="block"
                  fill="outline"
                  className="secondary-button"
                  onClick={sendAnotherEmail}
                >
                  Enviar Otro Email
                </IonButton>
              </div>
            </>
          )}

          {/* Enlace para ir al login */}
          <div className="forgot-links">
            <IonText color="medium">
              ¿Recordaste tu contraseña?{" "}
              <IonText color="primary" onClick={goToLogin} className="link-text">
                Iniciar Sesión
              </IonText>
            </IonText>
          </div>
        </div>

        {/* Toast para notificaciones - ABAJO */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={4000}
          color={toastColor}
          position="bottom"
          cssClass={`custom-toast toast-${toastColor}`}
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

export default ForgotPassword;
