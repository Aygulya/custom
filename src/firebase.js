// // Import the necessary Firebase SDKs
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // Import Firestore
// import { getAnalytics } from "firebase/analytics";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDKEGpnJ0r2_FEh_BHByOh21XPH30f-jtQ",
//   authDomain: "custom-d306d.firebaseapp.com",
//   projectId: "custom-d306d",
//   storageBucket: "custom-d306d.firebasestorage.app",
//   messagingSenderId: "258466102194",
//   appId: "1:258466102194:web:539efa2cf408a95c9d42ab",
//   measurementId: "G-J29FY019J4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firestore and export it
// const db = getFirestore(app);  // Add this line to initialize Firestore
// const getDoc = getFirestore(app)
// export { db,getDoc };  // Export db so you can import it in other files
// Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore"; // Импортируем Firestore и Timestamp
import { getAnalytics } from "firebase/analytics";

// Ваши настройки Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKEGpnJ0r2_FEh_BHByOh21XPH30f-jtQ",
  authDomain: "custom-d306d.firebaseapp.com",
  projectId: "custom-d306d",
  storageBucket: "custom-d306d.firebasestorage.app",
  messagingSenderId: "258466102194",
  appId: "1:258466102194:web:539efa2cf408a95c9d42ab",
  measurementId: "G-J29FY019J4",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Инициализация Firestore и экспорт
const db = getFirestore(app);
 const getDoc = getFirestore(app)
export { db,getDoc }; 
export {  Timestamp };  // Экспортируем db и Timestamp для использования в других файлах
