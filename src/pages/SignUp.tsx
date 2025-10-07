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
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { eye, eyeOff, mail, key, person } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import "../theme/toast.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger" | "warning">("success");

  // 🔹 Key para forzar re-render del formulario
  const [formKey, setFormKey] = useState(0);

  const history = useHistory();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) { showWarning("Por favor ingrese su nombre de usuario"); return false; }
    if (!formData.email.trim()) { showWarning("Por favor ingrese su correo electrónico"); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) { showWarning("Ingrese un correo electrónico válido"); return false; }
    if (!formData.password.trim()) { showWarning("Por favor ingrese una contraseña"); return false; }
    if (formData.password.trim().length < 6) { showWarning("La contraseña debe tener al menos 6 caracteres"); return false; }
    if (formData.password.trim() !== formData.confirmPassword.trim()) { showWarning("Las contraseñas no coinciden"); return false; }
    return true;
  };

  const showWarning = (msg: string) => {
    setToastMessage(msg);
    setToastColor("warning");
    setShowToast(true);
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const userData = {
      users: [
        {
          user_id: "0",
          email: formData.email.trim(),
          username: formData.username.trim(),
          password: formData.password.trim(),
          action: "1",
        },
      ],
    };

    try {
      const response = await fetch("https://smartloansbackend.azurewebsites.net/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error en la conexión con el servidor");

      const data = await response.json();
      const backendMessage = data?.result?.[0]?.msg || "Respuesta desconocida del servidor";

      if (backendMessage.toLowerCase().includes("inserted")) {
        setToastColor("success");
        setToastMessage("¡Registro exitoso!");
        setShowToast(true);

        // 🔹 Limpiar el formulario forzando un re-render
        setFormData({ email: "", username: "", password: "", confirmPassword: "" });
        setFormKey(prev => prev + 1);

        setTimeout(() => history.push("/login"), 1200);
      } else {
        setToastColor("danger");
        setToastMessage(backendMessage);
        setShowToast(true);
      }
    } catch (error: any) {
      setToastColor("danger");
      setToastMessage(error.message || "Error al conectar con el servidor");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => history.push("/login");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/login" /></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="signup-bg" fullscreen>
        {/* 🔹 Key fuerza re-render del formulario */}
        <div className="signup-container" key={formKey}>
          <h2 className="signup-title">Registrarse</h2>

          <IonItem className="signup-item">
            <IonLabel position="stacked">Nombre de usuario</IonLabel>
            <IonIcon icon={person} slot="start" className="input-icon" />
            <IonInput
              type="text"
              placeholder="Ingrese su nombre de usuario"
              value={formData.username}
              onIonChange={(e) => handleInputChange("username", e.detail.value!)}
              className={formData.username ? "has-value" : ""}
            />
          </IonItem>

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
              <IonIcon icon={showPassword ? eyeOff : eye} onClick={() => setShowPassword(!showPassword)} className="password-toggle" />
            </div>
          </IonItem>

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
              <IonIcon icon={showConfirmPassword ? eyeOff : eye} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle" />
            </div>
          </IonItem>

          <IonButton expand="block" className="signup-button" onClick={handleSignUp} disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </IonButton>

          <div className="signup-links">
            <IonText color="medium">
              ¿Ya tienes una cuenta?{" "}
              <IonText color="primary" onClick={goToLogin} className="link-text">
                Iniciar Sesión
              </IonText>
            </IonText>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="bottom"
          cssClass={`custom-toast toast-${toastColor}`}
          buttons={[{ text: "Aceptar", role: "cancel", handler: () => setShowToast(false) }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
