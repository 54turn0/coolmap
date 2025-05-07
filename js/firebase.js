// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyBpFLXohFsJwh6T24anBjuZl0h_vDPGvDM",
  authDomain: "coolmap-d3df1.firebaseapp.com",
  projectId: "coolmap",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Autenticación con Google
document.getElementById('loginBtn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("Usuario logueado:", result.user.displayName);
    }).catch((error) => {
      console.error("Error de login:", error);
    });
});

// Exportar servicios
export { db, auth };
