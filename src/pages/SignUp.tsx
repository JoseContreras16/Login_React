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
import { eye, eyeOff, mail, key } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para los toasts
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger" | "warning">("success");

  const history = useHistory();

  // Función para actualizar los campos del formulario
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para validar el formulario
  const validateForm = () => {
    if (!formData.email.trim()) {
      setToastMessage("Por favor ingrese su correo electrónico");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToastMessage("Por favor ingrese un correo electrónico válido");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    if (!formData.password) {
      setToastMessage("Por favor ingrese una contraseña");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    if (formData.password.length < 6) {
      setToastMessage("La contraseña debe tener al menos 6 caracteres");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setToastMessage("Las contraseñas no coinciden");
      setToastColor("warning");
      setShowToast(true);
      return false;
    }

    return true;
  };

  // Función para manejar el registro
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular registro exitoso
      setToastMessage("¡Registro exitoso! Bienvenido a la aplicación");
      setToastColor("success");
      setShowToast(true);

      // Redirigir inmediatamente al login
      history.push("/login");

    } catch (error) {
      setToastMessage("Error al crear la cuenta. Intente nuevamente");
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="signup-bg" fullscreen>
        <div className="signup-container">
          <h2 className="signup-title">Registrarse</h2>

          {/* Campo correo */}
          <IonItem className="signup-item">
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonIcon icon={mail} slot="start" className="input-icon" />
            <IonInput
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={formData.email}
              onIonChange={(e) => handleInputChange("email", e.detail.value!)}
              className={formData.email ? "has-value" : ""}
            />
          </IonItem>

          {/* Campo contraseña */}
          <IonItem className="signup-item">
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonIcon icon={key} slot="start" className="input-icon" />
            <div className="password-wrapper">
              <IonInput
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={formData.password}
                onIonChange={(e) => handleInputChange("password", e.detail.value!)}
                className={formData.password ? "has-value" : ""}
              />
              <IonIcon
                icon={showPassword ? eyeOff : eye}
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              />
            </div>
          </IonItem>

          {/* Campo confirmar contraseña */}
          <IonItem className="signup-item">
            <IonLabel position="stacked">Confirmar contraseña</IonLabel>
            <IonIcon icon={key} slot="start" className="input-icon" />
            <div className="password-wrapper">
              <IonInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme su contraseña"
                value={formData.confirmPassword}
                onIonChange={(e) => handleInputChange("confirmPassword", e.detail.value!)}
                className={formData.confirmPassword ? "has-value" : ""}
              />
              <IonIcon
                icon={showConfirmPassword ? eyeOff : eye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              />
            </div>
          </IonItem>

          {/* Botón registrarse */}
          <IonButton
            expand="block"
            className="signup-button"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </IonButton>

          {/* Enlace para ir al login */}
          <div className="signup-links">
            <IonText color="medium">
              ¿Ya tienes una cuenta?{" "}
              <IonText color="primary" onClick={goToLogin} className="link-text">
                Iniciar Sesión
              </IonText>
            </IonText>
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

export default SignUp;
